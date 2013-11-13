'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'handlebars'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            compass: {
                files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/**/*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
                    '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp}'
                ]
            },
            browserify: {
                files: ['{.tmp,<%= yeoman.app %>}/**/*.{js,jsx}'],
                tasks: ['browserify']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            jasmine: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test/jasmine'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            casperjs: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test/casperjs'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://0.0.0.0:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp',
            casperjs:['.tmp','test/casperjs/screenshots/*']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/**/*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/jasmine/spec/**/*.js'
            ]
        },
        jasmine:
        {
            all: {
        		src:'.tmp/scripts/combined-scripts.js',
                options: {
                    run: true,
                    keepRunner:true,
        		    vendor:[
                        'test/jasmine/vendors/di-lite/di-lite.js',
            			'test/jasmine/bower_components/jquery/jquery.js',
                        'test/jasmine/bower_components/react/react.js',
            			'test/jasmine/bower_components/lodash/dist/lodash.js',
            			'test/jasmine/bower_components/backbone/backbone.js',
                        'test/jasmine/bower_components/backbone.localStorage/backbone.localStorage.js',
            			'test/jasmine/bower_components/jasmine-jquery/lib/jasmine-jquery.js'

        		    ],
        		    styles: '.tmp/styles/main.css',
                    specs: 'test/jasmine/spec/**/*.js',
            	    helpers: './test/jasmine/helper/**/*.js',
                    template:"test/jasmine/AppRunner.tmpl",
                    outfile:'test/jasmine/index.html'
                    }
                }
        },
        casperjs: {
            options: {
              // Task-specific options go here.
            },
            files: ['test/casperjs/**/*.js']
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>',
                cssDir: '.tmp',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/**/*.html'],
            css: ['<%= yeoman.dist %>/styles/**/*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/**/*.css',
                        '<%= yeoman.app %>/styles/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}'
                    ]
                }]
            }
        },
//        react: {
//            app: {
//                options: {
//                    extension:    'jsx',  // Default,
//                    ignoreMTime:  false // Default
//                },
//                files: {
//                    '<%= yeoman.app %>': '<%= yeoman.app %>'
//                }
//            }
//        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/**/*.js',
                        '<%= yeoman.dist %>/styles/**/*.css',
                        '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        browserify: {
            app: {
                files: {
                    '.tmp/scripts/combined-scripts.js': ['<%= yeoman.app %>/scripts/app.js']
                },
                options: {
                    transform:[require('grunt-react').browserify,"debowerify"]

                }

            }
        }



    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
//            'react',
            'browserify:app',
            'compass:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test-jasmine', [
        'clean:server',
        'createDefaultTemplate',
//        'react',
        'browserify:app',
        'compass',
        'connect:jasmine',
        'jasmine'
    ]);

    grunt.registerTask('test-casperjs', [
        'clean:casperjs',
        'createDefaultTemplate',
//        'react',
        'browserify:app',
        'compass',
        'connect:casperjs',
        'casperjs'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
//        'react',
        'compass:dist',
        'useminPrepare',
        'browserify:app',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
