const dayjs = require('dayjs');

const { getDataFromDb } = require('./db');
const { uploadFileToS3 } = require('./s3');
const { json2CSV } = require('./db');

async function db_csv_s3({
  S3, bucketname, s3Prefix = '',
  Knex, tables = [],
  rows = 50000,
}) {
  // Throw error if params not correct
  if (!S3 || !Knex || !bucketname) {
    throw Error('Params are missing')
  }

  // Get Current Date time
  const todayDate = dayjs().format('YYYY-MM-DD HH:mm')
  s3Prefix = s3Prefix ? `${s3Prefix}/` : ''
  // Loop tables
  for (const t of tables) {
    let pageno = 1
    while (pageno < 10000) {
      // Call DB function
      const data = await getDataFromDb({ Knex, tablename: t.table, rows, pageno, where: t.where, orderby: t.orderby })
      if (data.length == 0) {
        break;
      }
      // convert json to CSV
      const csvData = json2CSV(data)
      // Generate file name
      const filename = `${s3Prefix}${todayDate}/${t.table}_${pageno}.csv`
      // Call s3 fucntion
      await uploadFileToS3({ S3, bucketname, filename, csvData })

      pageno += 1;

    }
  }
  // tables.forEach(async (t) => {

  // });
}

module.exports = { db_csv_s3 }