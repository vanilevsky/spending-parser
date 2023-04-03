const FOLDER_PATH = 'data';
const OUTPUT_FILE_PATH = 'data/combined.csv';
const RUB_TO_IDR_RATE = 175;
const CSV_HEADERS: string[] = [
    'source_file',
    'row_type',
    'parent_category',
    'category',
    'current_period_cost_rub',
    'current_period_cost_idr',
];

export { FOLDER_PATH, OUTPUT_FILE_PATH, RUB_TO_IDR_RATE, CSV_HEADERS };
