const fs = require('fs');

const arrayToCsv = (arr) => {
    const headers = Object.keys(arr[0]);
    const csv = arr.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(headers.join(','));
    return csv.join('\r\n');
};

const writeCsv = (expenses, filePath) => {
    const csv = arrayToCsv(expenses);
    fs.writeFileSync(filePath, csv, 'utf8');
};

module.exports = {
    writeCsv,
};
