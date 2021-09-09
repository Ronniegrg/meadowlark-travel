module.exports = function ( grunt ) {
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach( ( task ) => {
        grunt.loadNpmTasks( task );
    } );

    // configure plugins
    grunt.initConfig( {
        cafemocha: {
            all: { src: 'qa/test-*.js', options: { ui: 'tdd' }, }
        },
        jshint: {
            app: [ 'meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js' ],
            qa: [ 'Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js' ],
        },
        exec: {
            linkchecker:
                { cmd: 'linkchecker http://localhost:3000' }
        },
    } );

    // reguster r=tasjs
    grunt.registerTask( 'defult', [ 'cafemocha', 'jshint', 'exec' ] );
};