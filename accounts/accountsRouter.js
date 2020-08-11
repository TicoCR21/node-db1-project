const express = require( "express" );

const db = require( "../data/dbConfig" );

const router = express.Router();

router.get( "/", ( req, res ) =>
{ 
    db( "accounts" )
      .then( response => res.status( 200 ).json( { data : req.query.limit ? response.limit( req.query.limit ) : response } ) )
      .catch( error => res.status( 500 ).json( { message: error.message } ) );
} );

router.get( "/:id", ( req, res ) =>
{
  db( "accounts" )
    .where( "id", req.params.id )
    .first()
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( error => res.status( 500 ).json( { message: error.message } ) );
} );

router.post( "/", ( req, res ) =>
{
  db( "accounts" )
    .insert( req.body )
    .then( ids =>
      {
        db.select( "*" )
          .from( "accounts" )
          .where( { id : ids[ 0 ] }, "id" )
          .first()
          .then( account => { res.status( 200 ).json( { data : account } ) } )
      } )
    .catch( error => res.status( 500 ).json( { message: error.message } ) );
} );

router.put( "/:id", ( req, res ) =>
{
  db( "accounts" )
    .where( "id" , req.params.id )
    .update( req.body )
    .then( response => { response > 0 ? res.status( 200 ).json( { data : response } ) : res.status( 404 ).json( { message : "Record Not Found!!!" } ) } )
    .catch( error => res.status( 500 ).json( { message: error.message } ) );
} )

router.delete( "/:id", ( req, res ) =>
{
  db( "accounts" )
    .where( "id", req.params.id )
    .del()
    .then( response => { response > 0 ? res.status( 200 ).json( { data : response } ) : res.status( 404 ).json( { message : "Record Not Found!!!" } ) } )
    .catch( error => res.status( 500 ).json( { message: error.message } ) );
} );

module.exports = router;