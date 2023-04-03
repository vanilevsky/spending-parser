const fs = require('fs');
const parseHtml = require('./parseHtml');

const extractExpenses = async(htmlFilePath) => {
    try {
        const html = fs.readFileSync(htmlFilePath, 'utf8');
        return parseHtml(html);
    } catch (error) {
        console.error('Error reading HTML file:', error);
    }
};

module.exports = extractExpenses;
