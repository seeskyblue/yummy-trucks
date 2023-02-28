console.log(`
*******************************************
**                                       **
**      Yummy Trucks Data Generator      **
**                                       **
**                v 1.0                  **
**                                       **
*******************************************
`);

const fs = require('fs');
const path = require('path');

const rimraf = require('rimraf');
const XLSX = require('xlsx');
const chalk = require('chalk');
const iconv = require('iconv-lite');
const camelcase = require('camelcase');

const filename = 'trucks.csv';
const csvPath = path.resolve(__dirname, filename);
const outputFilename = 'data.json';
const outputPath = path.resolve(__dirname, '..', outputFilename);

require('console-stamp')(console, 'HH:MM:ss.l');

console.log(`Trying to read csv file from: ${chalk.cyan(csvPath)}...`);

let buffer;
try {
  buffer = fs.readFileSync(csvPath, { encoding: 'binary' });
  buffer = Buffer.from(buffer, 'binary');
  // fix utf8 decode messy code exception
  buffer = iconv.decode(buffer, 'utf8');
} catch {
  console.error(`Failed to read csv file from: ${chalk.cyan(csvPath)}, please check if it exists`);
  process.exit(1);
}

console.log(`Got it!!! Loading...`);
const workbook = XLSX.read(buffer, { type: 'string' });
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// const data = XLSX.utils.sheet_to_json(worksheet);
const [[...headers], ...data] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
console.log(
  `Found ${chalk.magenta(headers.length)} column(s): ${chalk.green(headers.join(', '))}.`,
);
console.log(`Found ${chalk.magenta(data.length)} row(s).`);

console.log('Making output data...');
const keys = headers.map((header) => camelcase(header));
const output = data.map((cells) =>
  cells.reduce((item, value, idx) => {
    item[keys[idx]] = value;
    return item;
  }, {}),
);

const isProd = process.env.NODE_ENV === 'production';
console.log(
  `Generating output file in ${chalk.yellow(isProd ? 'Production' : 'Development')} version...`,
);

if (fs.existsSync(outputPath)) {
  console.log('Removing existing output file...');
  rimraf.sync(outputPath);
  console.log('Removed!!!');
}

fs.writeFileSync(outputPath, JSON.stringify(output, null, isProd ? undefined : 2), 'utf8');
console.log(`Created ${chalk.cyan(outputFilename)}.`);
console.log(`Build success!!! See: ${chalk.cyan(outputPath)}`);
