'use server';

import { AirtableBaseClient } from '@/lib/services/airtable/airtable-service';
import { Base, ContactTables } from '@/lib/services/airtable/types';

export interface SubmitContactFormResult {
  success: boolean;
  error?: string;
  recordId?: string;
}

export interface ContactFormData {
  email: string;
  message: string;
}

const airtableClient = new AirtableBaseClient(Base.CONTACT);

export async function submitContactForm(
  data: ContactFormData
): Promise<SubmitContactFormResult> {
  try {
    // Validate input
    if (!data.email || typeof data.email !== 'string') {
      return {
        success: false,
        error: 'Email is required',
      };
    }

    if (!data.message || typeof data.message !== 'string') {
      return {
        success: false,
        error: 'Message is required',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return {
        success: false,
        error: 'Invalid email format',
      };
    }

    // Validate message length
    if (data.message.trim().length < 3) {
      return {
        success: false,
        error: 'Message must be at least 3 characters',
      };
    }

    const sanitizedEmail = data.email.trim().toLowerCase();
    const sanitizedMessage = data.message.trim();

    // Create record in Airtable
    const record = await airtableClient.create(ContactTables.CONTACT, {
      'email': sanitizedEmail,
      'message': sanitizedMessage,
    });

    return {
      success: true,
      recordId: record.id,
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);

    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        return {
          success: false,
          error: 'Request timed out. Please try again.',
        };
      }

      if (error.message.includes('API error')) {
        return {
          success: false,
          error: 'Failed to submit. Please check your connection.',
        };
      }
    }

    return {
      success: false,
      error: 'Failed to submit contact form. Please try again later.',
    };
  }
}

