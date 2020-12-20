import { unparse } from 'papaparse';
import dayjs from 'dayjs';
import { uploadFileToS3 } from './s3';

async function getDataFromDb({ Knex, tablename, rows, where, orderby, S3, bucketname, s3Prefix = '' }) {
  try {
    // Get Data from DB & return
    const tableData = await Knex(tablename)
      .select()
      .where(where)
      .orderBy(orderby)

    let i = 0;
    let page = 1
    // Divide the tableData into chunks
    while (i < tableData.length) {
      const data = arr.slice(i, i += rows)
      // Call json2csv funtion
      const csvData = json2CSV(data)
      // Get Current Date time
      const todayDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
      // Generate file name
      const fileName = s3Prefix ? `${s3Prefix}/${tablename}_${todayDate}_${page}.csv` : `${tablename}_${todayDate}_${page}.csv`
      // Call s3 fucntion
      await uploadFileToS3({ S3, bucketname, fileName, csvData })
      // Increment Page no
      page += 1;
    }
  } catch (error) {

  }

}

function json2CSV(data) {
  // covert and return
  return unparse(JSON.stringify(data))
}

module.export = { getDataFromDb }
