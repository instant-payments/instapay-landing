import { Base, WhitelistTables, ContactTables } from './types';

export const airtableConfig = {
  apiKey: process.env['AIRTABLE_TOKEN']!,
  bases: {
    [Base.WHITELIST]: {
      id: process.env['AIRTABLE_WHITELIST_BASE_ID']!,
      tables: {
        [WhitelistTables.WHITELIST]: WhitelistTables.WHITELIST,
      },
    },
    [Base.CONTACT]: {
      id: process.env['AIRTABLE_CONTACT_BASE_ID']!,
      tables: {
        [ContactTables.CONTACT]: ContactTables.CONTACT,
      },
    },
  },
} as const;
