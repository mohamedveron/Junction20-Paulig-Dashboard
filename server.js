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

    console.log(connection)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});