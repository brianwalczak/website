import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export function extractText(body: any): string {
    try {
        const data: SerializedEditorState = body;
        return convertLexicalToPlaintext({ data });
    } catch {
        return '';
    }
}

export function formatDate(str: string): string {
    const date = new Date(str);

    // this should give us a format like Jan 17, 2026
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

export function calcReadTime(text: string): string {
    if (!text) return '1 min read';

    const words = (text.match(/\b\w+\b/g) || []).length; // word count
    return `${Math.max(1, Math.ceil(words / 238))} min read`;
}