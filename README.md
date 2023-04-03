# Spending Parser

Spending Parser is a simple tool to parse and combine multiple HTML files containing expense data from the BudgetBucker Wallet web app into a single CSV file. This program is written in TypeScript and uses Cheerio for parsing the HTML files.

## Data Source

To obtain the necessary HTML files, follow these steps:

1. Log in to the BudgetBucker Wallet web app.
2. Go to the Analytics page.
3. Choose the "Incomes & Expenses Report" option.
4. Save the generated report as an HTML file.

Repeat these steps for each desired report, saving each one as an HTML file.

## Prerequisites

-   Node.js (v14 or later)
-   npm (v6 or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/spending-parser.git
   ```

2. Change to the project directory:

   ```
   cd spending-parser
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Compile the TypeScript code:

   ```
   npx tsc
   ```

## Usage

1. Place the HTML files containing the expense data in the `data` folder.

2. Run the program:

   ```
   node dist/index.js
   ```

   As a result, the program will create separated CSV files for each input HTML file and one combined CSV file named `combined.csv`. All CSV files will be stored in the `data` folder.

## Customization

You can customize the following settings in the `config.ts` file:

-  `FOLDER_PATH`: The folder path where the input HTML files are located.
-  `OUTPUT_FILE_PATH`: The path of the output CSV file.
-  `RUB_TO_IDR_RATE`: The currency conversion rate from RUB to IDR.
