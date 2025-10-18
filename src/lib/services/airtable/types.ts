export type AirtableRecord<TFields> = {
  id: string;
  createdTime: string;
  fields: TFields;
};

export type AirtableResponse<T> = {
  records: AirtableRecord<T>[];
};

export type AirtableRequestOptions<T> = {
  where?: Partial<{
    [K in keyof T]?: T[K];
  }>;
  maxRecords?: number;
  fetchAll?: boolean;
  pageSize?: number;
};

export enum Base {
  WHITELIST = 'WHITELIST',
  CONTACT = 'CONTACT',
}

export enum WhitelistTables {
  WHITELIST = 'Whitelist',
}

export enum ContactTables {
  CONTACT = 'Contact',
}

export type BaseTableMap = {
  [Base.WHITELIST]: WhitelistTables;
  [Base.CONTACT]: ContactTables;
};

type TableFieldsMap = {
  [WhitelistTables.WHITELIST]: {
    'Instagram Handle': string;
  };
  [ContactTables.CONTACT]: {
    'email': string;
    'message': string;
  };
};

export type FieldsForTable<T extends AirtableTable> = T extends keyof TableFieldsMap
  ? TableFieldsMap[T]
  : never;

export type AirtableTable = WhitelistTables | ContactTables;
