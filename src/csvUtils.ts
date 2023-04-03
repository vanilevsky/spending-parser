import fs from 'fs';
import { Expense } from './types';

const arrayToCsv = (arr: Expense[]): string => {
    const headers = Object.keys(arr[0]);
    const csv = arr.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(headers.join(','));
    return csv.join('\r\n');
};

const writeCsv = (expenses: Expense[], filePath: string): void => {
    const csv = arrayToCsv(expenses);
    fs.writeFileSync(filePath, csv, 'utf8');
};

export { writeCsv };
