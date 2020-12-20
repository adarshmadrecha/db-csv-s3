const { getDataFromDb } = './db'

async function db_csv_s3({
  S3, bucketname, s3Prefix = '',
  Knex, tables = [],
  rows = 50000,
}) {
  // Throw error if params not correct

  // Loop tables
  tables.forEach(t => {
    // Call DB function
    await getDataFromDb({ Knex, tablename: t.table, rows, where: t.where, orderby: t.orderby, S3, bucketname, s3Prefix = '' })
  });
}

module.export = { db_csv_s3 }