export interface Expense {
    row_type: string;
    parent_category: string;
    category: string;
    current_period_cost_rub: number;
    current_period_cost_idr: number;
    source_file?: string;
    [key: string]: string | number | undefined;
}
