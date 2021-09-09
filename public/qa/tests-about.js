const { assert } = require( "chai" )

suite( '"About" page Tests', () => {
    test( 'page should contain link to contact page', () => {
        assert( $( 'a[href="/contact"]' ).length );
    } );
} );