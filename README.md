# db-csv-s3
[![npm version](http://img.shields.io/npm/v/db-csv-s3.svg)](https://npmjs.org/package/db-csv-s3)
[![npm downloads](https://img.shields.io/npm/dm/db-csv-s3.svg)](https://npmjs.org/package/db-csv-s3)


A simple way to export the database and convert db data to CSV and then upload it to S3 at your specified bucket. An alternative for your data backup.

## Installation
#### Node.js
```js
npm install db-csv-s3
```
## Use
```js
const dbcsv = require('db-csv-s3')

  await dbcsv({
    S3, bucketname: "yourbucketname", s3Prefix: 'db_backup',
    Knex,
    tables, rows=50000
  })

```
## Parameters
- **S3**-  An S3 service object, including the `accessKeyId`, `secretAccessKey`, `region`, `apiVersion`.<br>
ex:
```js
const S3 = new AWS.S3({
  accessKeyId: yourawsAccessId,
  secretAccessKey: yourawsSecretKey,
  region: yourregion,
  apiVersion: '2006-03-01',
});
```
- **bucketname** - The name of the Amazon S3 bucket where you wish to save all your csv files

- **s3Prefix** - The name of the folder inside which there will be subfolders based on date and time

- **Knex** - This would be an Knex Object. We are using knex to build queries. Hence, the supported databases are `Postgres`, `MSSQL`, `MySQL`, `MariaDB`, `SQLite3`, `Oracle`, and `Amazon Redshift`, for more information please read the [official specification](http://knexjs.org/)

- **tables** - An array of objects where you would be specifying the table name, where clause and orderby clause as stated in the example below.
  - Each object will contain the following attributes:-
    - **table** - The name of table.
    - **where** - This must contain an object specfying multiple parameters for your where clause as stated in the example below.
    - **orderby** - Adds an order by clause to the query. You can specify the column name and the order in which you want the data to be stored.

- **rows** - This limits the maximum number of data/rows per csv file. For ex: If you want a backup of table `user` which consists of `1,20,000` rows and you've specified the `rows` value as `50,000`. Then, 3 CSV files would be generated in S3 as a backup of table `user` named `user_1.csv`, `user_2.csv`, `user_3.csv` with `50,000` , `50,000` and `20,000` rows in the respective files. 
---
**NOTE**

Both `where` and `orderby` attributes are optional, if you want to you can ignore them while creating the `tables` array objects.<br>
By default the value given to the `rows` attribute is `50,000`.

---

The heirarchy in which the data would be stored in S3 is,
```
s3Prefix
│   
└───datetime1
│   │   file011.csv
│   │   file012.csv
│   │   ...
│
|___datetime2
│   │   file011.csv
│   │   file012.csv
│   │   ...
...
```
In case if you've not specified the s3Prefix then the hierarchy would be based on date time.
```
datetime1
│   file01.csv   
|   file02.csv
|   ...

datetime2
│   file01.csv   
|   file02.csv
|   ...

```


## Example `tables` array
```js
const tables = [
  {
    table: 'user',
    where: {location: 'mumbai', firm: 'firm1'},
    orderby: {column: 'age', order: 'desc'}
  }
]

```