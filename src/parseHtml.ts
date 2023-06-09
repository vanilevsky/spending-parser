import cheerio from 'cheerio';
import { RUB_TO_IDR_RATE } from './config';
import { Expense } from './types';

const rubToIdr = (rub: number): number => rub * RUB_TO_IDR_RATE;

const parseHtml = (html: string): Expense[] => {
    const basicParentCategory = 'Root';
    const $: cheerio.Root = cheerio.load(html);
    const rows = $('tr.report-row');
    const expenses: Expense[] = [];

    let parentCategory = basicParentCategory;

    rows.each((i: number, row: cheerio.Element) => {
        const paddingLeft = $(row).find('td.single.line.five.wide').css('padding-left');

        const category = $(row).find('.category-name').text().trim();
        const currentPeriodRub = parseFloat($(row).find('td:nth-child(2) span').text().replace(/[^0-9.-]+/g, ""));
        const currentPeriodIdr = rubToIdr(currentPeriodRub);

        let rowType;
        if (paddingLeft === '6rem') {
            rowType = 'Inner';
        } else if (paddingLeft === '4rem') {
            rowType = 'Regular';
        } else {
            rowType = 'Parent';
            parentCategory = category;
        }

        expenses.push({
            row_type: rowType,
            parent_category: (rowType === 'Parent' ? basicParentCategory : parentCategory),
            category: category,
            current_period_cost_rub: currentPeriodRub,
            current_period_cost_idr: currentPeriodIdr,
            source_file: 'default',
        });
    });

    return expenses;
};

export default parseHtml;
