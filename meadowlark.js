const fortune = require('./lib/fortune');
const express = require('express');
const app = express();
// set up handlebars view engine
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({extname: "handlebars", defaultLayout: false, layoutsDir: "views/layouts"}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.set( 'port', process.env.PORT || 3000 );

app.use( ( req, res, next ) => {
    res.locals.showTests = app.get( 'env' ) !== 'production' && req.query.test === '1';
    next();
} );

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js'});
});


app.get( '/tours/hood-river', ( req, res ) => {
    res.render( 'tours/hood-river' );
} );

app.get( '/tours/request-group-rate', ( req, res ) => {
    res.render( 'tours/request-group-rate' );
} );

// custom 404 page
app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});