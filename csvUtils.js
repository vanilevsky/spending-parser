const fs = require('fs');

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

module.exports = {
    writeCsv,
};