var snowflake = require('snowflake-sdk')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


const hostname = '127.0.0.1';
const port = 3000;

// sets ejs views folder
app.set('views', path.join(__dirname, 'views'));

// sets view engine
app.set('view engine', 'ejs'); 

app.use(express.static(__dirname + '/views'));

// Create a Connection object that we can use later to connect.
var connection = snowflake.createConnection( {
    account: 'paulig.west-europe.azure',
    username: 'dev_edw_junction_team_05',
    password: 'pnimAo2Dd3swMaq2dVJNBa5qJx7LJUhr',
    database: 'DEV_EDW_JUNCTION'
    }
    );

    // Try to connect to Snowflake, and check whether the connection was successful.
connection.connect( 
    function(err, conn) {
        if (err) {
            console.error('Unable to connect: ' + err.message);
            } 
        else {
            console.log('Successfully connected to Snowflake.');
            // Optional: store the connection ID.
            connection_ID = conn.getId();
            }
        }
    );


    app.get('/', function(req, res){
      // do something
      res.render('index.ejs')
      
    });

    app.get('/paulig', function(req, res){
      // do something
      res.render('paulig.ejs')
      
    });

    app.get('/mostpurchased', function(req, res){
      // do something
      connection.execute({
        sqlText: "select product_subgroup,  sum(order_quantity) as summ  from DEV_EDW_JUNCTION.JUNCTION_2020.WEBSHOP_DATA where zip_code = 100 and product_subgroup != 'Samples' group by  product_subgroup order by summ desc limit 10",
        complete: function(err, stmt, rows) {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
          } else {
            //console.log('Number of rows produced: ' + JSON.stringify(rows));
            res.send(JSON.stringify(rows));
          }
        }
      });
      
    });

    app.get('/mostunpurchased', function(req, res){
      // do something
      connection.execute({
        sqlText: "select PRODUCT_name,  sum(order_quantity) as summ  from DEV_EDW_JUNCTION.JUNCTION_2020.WEBSHOP_DATA where PRODUCT_name not in (select PRODUCT_name from DEV_EDW_JUNCTION.JUNCTION_2020.WEBSHOP_DATA where customername = 'Uawgam Cwono')  group by  PRODUCT_name order by summ desc limit 5",
        complete: function(err, stmt, rows) {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
          } else {
            //console.log('Number of rows produced: ' + JSON.stringify(rows));
            res.send(JSON.stringify(rows));
          }
        }
      });
      
    });

    app.get('/hourlypurchased', function(req, res){
      // do something
      connection.execute({
        sqlText: 'SELECT COUNT(DISTINCT "HEADER_ID") AS "PURCHASE_COUNT", DATE_PART(HOUR,"HEADER_JOURNALTIME") AS "HOUR_OF_PURCHASE" FROM "DEV_EDW_JUNCTION"."JUNCTION_2020"."CAFE_POS_DATA" GROUP BY DATE_PART(HOUR,"HEADER_JOURNALTIME") ORDER BY DATE_PART(HOUR,"HEADER_JOURNALTIME") ',
        complete: function(err, stmt, rows) {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
          } else {
            //console.log('Number of rows produced: ' + JSON.stringify(rows));
            res.send(JSON.stringify(rows));
          }
        }
      });
      
    });

    app.get('/covid', function(req, res){
      // do something
      connection.execute({
        sqlText: 'SELECT SUM("HEADER_TOTAL") AS "SALES", "HEADER_BOOKINGDATE" AS "DATE", "TOTAL_CASES" AS "COVID19_TOTAL_CASE" FROM "DEV_EDW_JUNCTION"."JUNCTION_2020"."CAFE_POS_DATA" INNER JOIN "DEV_EDW_JUNCTION"."TEAM_05"."COVID19" ON "HEADER_BOOKINGDATE" = "DATE" GROUP BY "HEADER_BOOKINGDATE", "TOTAL_CASES" ORDER BY "HEADER_BOOKINGDATE" ',
        complete: function(err, stmt, rows) {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
          } else {
            //console.log('Number of rows produced: ' + JSON.stringify(rows));
            res.send(JSON.stringify(rows));
          }
        }
      });
      
    });

    app.get('/purchases', function(req, res){
      // do something
      connection.execute({
        sqlText: ' SELECT COUNT("POS"."ITEM_CODE") AS "ITEM_COUNT", "POS"."ITEM_CODE" AS "ITEM_NAME" FROM "DEV_EDW_JUNCTION"."JUNCTION_2020"."CAFE_POS_DATA" AS "POS" GROUP BY "POS"."ITEM_CODE" order by "ITEM_COUNT" desc limit 10 ',
        complete: function(err, stmt, rows) {
          if (err) {
            console.error('Failed to execute statement due to the following error: ' + err.message);
          } else {
            //console.log('Number of rows produced: ' + JSON.stringify(rows));
            res.send(JSON.stringify(rows));
          }
        }
      });
      
    });

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});