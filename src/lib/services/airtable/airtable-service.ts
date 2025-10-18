import { airtableConfig } from './config';
import {
  AirtableRequestOptions,
  AirtableResponse,
  BaseTableMap,
  Base,
  FieldsForTable,
  AirtableRecord,
} from './types';

export class AirtableBaseClient<TBase extends Base> {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(private readonly base: TBase) {
    const apiKey = process.env['AIRTABLE_TOKEN'];
    const baseId = airtableConfig.bases[this.base].id;

    if (!baseId || !apiKey) {
      throw new Error(
        `Missing required environment variables for base: ${this.base}. ` +
        `Need AIRTABLE_TOKEN and AIRTABLE_${this.base}_BASE_ID`
      );
    }

    this.baseUrl = `https://api.airtable.com/v0/${baseId}`;
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Fetch records from a table with optional filtering and pagination
   */
  public async fetch<TTable extends BaseTableMap[TBase]>(
    table: TTable,
    options?: AirtableRequestOptions<FieldsForTable<TTable>>
  ): Promise<AirtableRecord<FieldsForTable<TTable>>[]> {
    const tableName = this.getTableName(table);
    const fetchAll = options?.fetchAll ?? true;
    const maxRecords = options?.maxRecords;

    const allRecords: AirtableRecord<FieldsForTable<TTable>>[] = [];
    let offset: string | undefined;

    do {
      const url = this.buildUrl(tableName, options, offset);
      const data = await this.makeRequest<
        AirtableResponse<FieldsForTable<TTable>> & { offset?: string }
      >(url);

      allRecords.push(...data.records);
      offset = data.offset;

      // Stop if: no more pages, only want first page, or reached max records
      if (!offset || !fetchAll || (maxRecords && allRecords.length >= maxRecords)) {
        break;
      }

      // Rate limiting: wait between requests
      await this.delay(100);
    } while (true);

    // Trim to maxRecords if specified
    return maxRecords ? allRecords.slice(0, maxRecords) : allRecords;
  }

  /**
   * Create a new record in a table
   */
  public async create<TTable extends BaseTableMap[TBase]>(
    table: TTable,
    fields: Partial<FieldsForTable<TTable>>
  ): Promise<AirtableRecord<FieldsForTable<TTable>>> {
    const tableName = this.getTableName(table);
    const url = `${this.baseUrl}/${tableName}`;

    return this.makeRequest(url, 'POST', { fields });
  }

  /**
   * Create multiple records in a single request (batch create)
   */
  public async createBatch<TTable extends BaseTableMap[TBase]>(
    table: TTable,
    records: Array<Partial<FieldsForTable<TTable>>>
  ): Promise<AirtableRecord<FieldsForTable<TTable>>[]> {
    const tableName = this.getTableName(table);
    const url = `${this.baseUrl}/${tableName}`;

    const recordsPayload = records.map(fields => ({ fields }));
    const response = await this.makeRequest<{ records: AirtableRecord<FieldsForTable<TTable>>[] }>(
      url,
      'POST',
      { records: recordsPayload }
    );

    return response.records;
  }

  /**
   * Delete a record by ID
   */
  public async delete<TTable extends BaseTableMap[TBase]>(
    table: TTable,
    recordId: string
  ): Promise<void> {
    const tableName = this.getTableName(table);
    const url = `${this.baseUrl}/${tableName}/${recordId}`;

    await this.makeRequest(url, 'DELETE');
  }

  private async makeRequest<T = any>(
    url: string,
    method: 'GET' | 'POST' | 'DELETE' = 'GET',
    body?: any,
    timeoutMs: number = 15000
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Airtable API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeoutMs}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private getTableName<TTable extends BaseTableMap[TBase]>(table: TTable): string {
    const baseConfig = airtableConfig.bases[this.base];
    const tableName = baseConfig.tables[table as keyof typeof baseConfig.tables];

    if (!tableName) {
      throw new Error(`Table "${String(table)}" not found in base "${this.base}"`);
    }

    return tableName;
  }

  private buildUrl<T>(
    tableName: string,
    options?: AirtableRequestOptions<T>,
    offset?: string
  ): string {
    const url = new URL(`${this.baseUrl}/${tableName}`);

    if (options?.where) {
      const filterFormula = this.buildFilterFormula(options.where);
      if (filterFormula) {
        url.searchParams.append('filterByFormula', filterFormula);
      }
    }

    if (options?.pageSize) {
      url.searchParams.append('pageSize', String(options.pageSize));
    }

    if (offset) {
      url.searchParams.append('offset', offset);
    }

    return url.toString();
  }

  private buildFilterFormula<T>(where: Partial<Record<keyof T, any>>): string {
    const conditions = Object.entries(where)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([field, value]) => {
        if (typeof value === 'string') {
          return `{${field}}='${value.replace(/'/g, "\\'")}'`; // Escape quotes
        }
        if (typeof value === 'number') {
          return `{${field}}=${value}`;
        }
        if (typeof value === 'boolean') {
          return `{${field}}=${value ? 1 : 0}`;
        }
        return `{${field}}='${value}'`;
      });

    if (conditions.length === 0) return '';
    if (conditions.length === 1) return conditions[0];

    return `AND(${conditions.join(',')})`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
