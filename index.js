const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const FOLDER_PATH = 'spendings';
const OUTPUT_FILE_PATH = path.join(FOLDER_PATH, 'combined.csv');

const rubToIdr = (rub) => rub * 175;

const parseHtml = (html) => {
    const $ = cheerio.load(html);
    const rows = $('tr.report-row');
    const expenses = [];

    rows.each((i, row) => {
        const paddingLeft = $(row).find('td.single.line.five.wide').css('padding-left');
        let rowType;
        if (paddingLeft === '6rem') {
            rowType = 'Inner';
        } else if (paddingLeft === '4rem') {
            rowType = 'Regular';
        } else {
            rowType = 'Parent';
        }

        if (true) {
            // if (rowType !== 'Parent') {
            const category = $(row).find('.category-name').text().trim();
            const currentPeriodRub = parseFloat($(row).find('td:nth-child(2) span').text().replace(/[^0-9.-]+/g, ""));
            const currentPeriodIdr = rubToIdr(currentPeriodRub);

            expenses.push({
                row_type: rowType,
                category: category,
                current_period_cost_rub: currentPeriodRub,
                current_period_cost_idr: currentPeriodIdr,
            });
        }
    });

    return expenses;
};

const extractExpenses = async(htmlFilePath) => {
    try {
        const html = fs.readFileSync(htmlFilePath, 'utf8');
        const expenses = parseHtml(html);
        return expenses;
    } catch (error) {
        console.error('Error reading HTML file:', error);
    }
};

const arrayToCsv = (arr, headers) => {
    const csv = arr.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(headers.join(','));
    return csv.join('\r\n');
};

const writeCsv = (expenses, filePath) => {
    const headers = ['source_file', 'row_type', 'category', 'current_period_cost_rub', 'current_period_cost_idr'];
    const csv = arrayToCsv(expenses, headers);
    fs.writeFileSync(filePath, csv, 'utf8');
};

fs.readdir(FOLDER_PATH, async(err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const htmlFiles = files.filter(file => path.extname(file).toLowerCase() === '.html').sort();
    let allExpenses = [];

    for (const htmlFile of htmlFiles) {
        const htmlFilePath = path.join(FOLDER_PATH, htmlFile);
        const csvFile = htmlFile.replace(/\.html$/, '.csv');
        const csvFilePath = path.join(FOLDER_PATH, csvFile);

        console.log(`Processing ${htmlFilePath} and accumulating expenses`);

        const expenses = await extractExpenses(htmlFilePath);
        expenses.forEach(expense => {
            expense.source_file = htmlFile;
        });

        allExpenses = allExpenses.concat(expenses);
    }

    console.log(`Writing combined expenses to ${OUTPUT_FILE_PATH}`);
    writeCsv(allExpenses, OUTPUT_FILE_PATH);
});