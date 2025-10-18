'use server';

import { AirtableBaseClient } from '@/lib/services/airtable/airtable-service';
import { Base, WhitelistTables } from '@/lib/services/airtable/types';

export interface AddToWhitelistResult {
  success: boolean;
  error?: string;
  recordId?: string;
}

const airtableClient = new AirtableBaseClient(Base.WHITELIST);

export async function addToWhitelist(instagramHandle: string): Promise<AddToWhitelistResult> {
  try {
    if (!instagramHandle || typeof instagramHandle !== 'string') {
      return {
        success: false,
        error: 'Instagram handle is required',
      };
    }

    const sanitizedHandle = instagramHandle.replace('@', '').trim();
    const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
    if (!instagramRegex.test(sanitizedHandle) || sanitizedHandle.length === 0) {
      return {
        success: false,
        error: 'Invalid Instagram handle format',
      };
    }

    const _instagramHandle = `@${sanitizedHandle}`;

    const records = await airtableClient.fetch(WhitelistTables.WHITELIST, {
      where: {
        'Instagram Handle': _instagramHandle,
      },
    });

    if (!records.length) {
      await airtableClient.create(WhitelistTables.WHITELIST, {
        'Instagram Handle': _instagramHandle,
      });
    } else {
      console.warn({
        tag: 'addToWhitelist:warn',
        message: 'skipped record creation',
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error adding to whitelist:', error);

    if (error instanceof Error) {
      if (error.message.includes('duplicate')) {
        return {
          success: false,
          error: 'This Instagram handle is already on the whitelist',
        };
      }

      if (error.message.includes('timeout')) {
        return {
          success: false,
          error: 'Request timed out. Please try again.',
        };
      }
    }

    return {
      success: false,
      error: 'Failed to add to whitelist. Please try again later.',
    };
  }
}
