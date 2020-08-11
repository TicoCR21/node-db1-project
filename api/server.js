const express = require( "express" );
const accounts = require( "../accounts/accountsRouter" );
const server = express();

server.use( express.json() );

server.use( "/api/accounts", accounts );

server.get( "/", ( req, res ) =>
{
  res.status( 200 ).json( "Running..." );
} );

module.exports = server;