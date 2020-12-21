const { getDataFromDb } = './db'
import dayjs from 'dayjs';
import { uploadFileToS3 } from './s3';
import { json2CSV } from './db';

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
  tables.forEach(t => {
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
      const fileName = `${s3Prefix}${todayDate}/${tablename}_${page}.csv`
      // Call s3 fucntion
      await uploadFileToS3({ S3, bucketname, fileName, csvData })

      pageno += 1;

    }
  });
}

module.export = { db_csv_s3 }