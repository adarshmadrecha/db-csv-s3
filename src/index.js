async function db_csv_s3({
  S3, bucketname, s3Prefix = '',
  Knex, tables = [],
  rows = 50000,
}) {
  // Throw error if params not correct

  // Loop tables
  // Call DB function
  // Call json2csv funtion
  // Call s3 fucntion
}

module.export = { db_csv_s3 }