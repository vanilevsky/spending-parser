import fs from 'fs';
import path from 'path';
import {COMBINED_CSV, FOLDER_PATH, OUTPUT_FOLDER} from './config';
import extractExpenses from './extractExpenses';
import { writeCsv } from './csvUtils';
import { Expense } from './types';

const processFiles = async (htmlFiles: string[]): Promise<void> => {
    let allExpenses: Expense[] = [];

    for (const htmlFile of htmlFiles) {
        const htmlFilePath = path.join(FOLDER_PATH, htmlFile);

        console.log(`Processing ${htmlFilePath} and accumulating expenses`);

        const expenses = await extractExpenses(htmlFilePath);
        expenses.forEach(expense => {
            expense.source_file = removeExtensionFromFileName(htmlFile);
        });

        allExpenses = allExpenses.concat(expenses);
        writeCsv(expenses, `${OUTPUT_FOLDER}/${removeExtensionFromFileName(htmlFile)}.csv`);
    }

    const outputFilePath = `${OUTPUT_FOLDER}/${COMBINED_CSV}`;
    console.log(`Writing combined expenses to ${outputFilePath}`);
    writeCsv(allExpenses, outputFilePath);
};

const removeExtensionFromFileName = (fileName: string): string => {
    return fileName.replace(/\.[^/.]+$/, "");
}

fs.readdir(FOLDER_PATH, async (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html').sort();

    processFiles(htmlFiles);
});
