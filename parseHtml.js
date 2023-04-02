const cheerio = require('cheerio');
const { RUB_TO_IDR_RATE } = require('./config');

const rubToIdr = (rub) => rub * RUB_TO_IDR_RATE;

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

        const category = $(row).find('.category-name').text().trim();
        const currentPeriodRub = parseFloat($(row).find('td:nth-child(2) span').text().replace(/[^0-9.-]+/g, ""));
        const currentPeriodIdr = rubToIdr(currentPeriodRub);

        expenses.push({
            row_type: rowType,
            category: category,
            current_period_cost_rub: currentPeriodRub,
            current_period_cost_idr: currentPeriodIdr,
        });
    });

    return expenses;
};

module.exports = parseHtml;