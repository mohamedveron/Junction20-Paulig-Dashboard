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

    var statement = connection.execute({
      sqlText: "select PRODUCT_name,  sum(order_quantity) as summ  from DEV_EDW_JUNCTION.JUNCTION_2020.WEBSHOP_DATA where PRODUCT_name not in (select PRODUCT_name from DEV_EDW_JUNCTION.JUNCTION_2020.WEBSHOP_DATA where customername = 'Mtgmvccf Afslgu')  group by  PRODUCT_name order by summ desc limit 5",
      complete: function(err, stmt, rows) {
        if (err) {
          console.error('Failed to execute statement due to the following error: ' + err.message);
        } else {
          console.log('Number of rows produced: ' + JSON.stringify(rows));
        }
      }
    });

    app.get('/api', function(req, res){
      // do something
      res.render('index');
    });

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});