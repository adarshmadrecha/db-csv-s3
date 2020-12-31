const { unparse } = require('papaparse');

async function getDataFromDb({ Knex, tablename, rows, pageno, where, orderby }) {

  // Get Data from DB & return
  const sql = Knex(tablename)
    .select()
    .limit(rows)
    .offset((pageno - 1) * rows);

  if (where) {
    sql.where(where)
  }

  if (orderby && orderby.column) {
    sql.orderBy(orderby.column, orderby.order || 'asc')
  }

  return await sql;
}

function json2CSV(data) {
  // covert and return
  return unparse(JSON.stringify(data))
}

module.exports = { getDataFromDb, json2CSV }
