var snowflake = require('snowflake-sdk')

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

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
      sqlText: 'select PRODUCT_SUBGROUP,  sum(order_quantity) as summ  from DEV_EDW_JUNCTION.JUNCTION_2020.WEBSHOP_DATA group by  PRODUCT_SUBGROUP order by summ desc',
      complete: function(err, stmt, rows) {
        if (err) {
          console.error('Failed to execute statement due to the following error: ' + err.message);
        } else {
          console.log('Successfully executed statement: ' + stmt.getSqlText());
        }
      }
    });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});