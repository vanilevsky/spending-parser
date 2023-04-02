const fs = require('fs');
const path = require('path');
const { FOLDER_PATH, OUTPUT_FILE_PATH } = require('./config');
const extractExpenses = require('./extractExpenses');
const { writeCsv } = require('./csvUtils');

const processFiles = async(htmlFiles) => {
    let allExpenses = [];

    for (const htmlFile of htmlFiles) {
        const htmlFilePath = path.join(FOLDER_PATH, htmlFile);

        console.log(`Processing ${htmlFilePath} and accumulating expenses`);

        const expenses = await extractExpenses(htmlFilePath);
        expenses.forEach(expense => {
            expense.source_file = htmlFile;
        });

        allExpenses = allExpenses.concat(expenses);
    }

    console.log(`Writing combined expenses to ${OUTPUT_FILE_PATH}`);
    const headers = ['source_file', 'row_type', 'category', 'current_period_cost_rub', 'current_period_cost_idr'];
    writeCsv(allExpenses, OUTPUT_FILE_PATH, headers);
};

fs.readdir(FOLDER_PATH, async(err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html').sort();

    processFiles(htmlFiles);
});