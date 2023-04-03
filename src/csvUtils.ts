import fs from 'fs';
import { Expense } from './types';
import { CSV_HEADERS } from './config';

const arrayToCsv = (arr: Expense[]): string => {
    const csv = arr.map(row =>
        CSV_HEADERS.map(fieldName => {
            const value = row[fieldName as keyof Expense];
            if (typeof value === 'number') {
                return value.toFixed(2).replace('.', ',');
            } else {
                return JSON.stringify(value);
            }
        }).join(';')
    );
    csv.unshift(CSV_HEADERS.join(';'));
    return csv.join('\r\n');
};

const writeCsv = (expenses: Expense[], filePath: string): void => {
    const csv = arrayToCsv(expenses);
    fs.writeFileSync(filePath, csv, 'utf8');
};

export { writeCsv };
