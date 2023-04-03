import fs from 'fs';
import parseHtml from './parseHtml';
import { Expense } from './types';

const extractExpenses = async (htmlFilePath: string): Promise<Expense[]> => {
    try {
        const html = fs.readFileSync(htmlFilePath, 'utf8');
        return parseHtml(html);
    } catch (error) {
        console.error('Error reading HTML file:', error);
    }
    return [];
};

export default extractExpenses;
