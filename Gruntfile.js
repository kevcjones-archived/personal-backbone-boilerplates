'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var scriptExtractor = require('script-extractor');

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
        dist: 'cordova_app/www'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
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
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            },
            jasmine: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'test/jasmine'),
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            },
            casperjs: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'test/casperjs'),
                            mountFolder(connect, yeomanConfig.dist)
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
            casperjs:['.tmp','<%= yeoman.dist %>/*','test/casperjs/screenshots/*']
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
                cssDir: '<%= yeoman.dist %>',
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
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt,xml}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        'bower_components/**/*.{css,js,png,gif,jpg}',
                        'index.html'
                    ]
                }]
            }
        },

        browserify: {
            app: {
                files: {
                    '<%= yeoman.dist %>/scripts/combined-scripts.js': ['<%= yeoman.app %>/scripts/app.js']
                },
                options: {
                    transform:[require('grunt-react').browserify,"debowerify"]

                }

            }
        },

        cordovacli: {
            options: {
                path: 'cordova_app'
            },
            create: {
                options: {
                    command: 'create',
                    id: 'nucleuscentral.enterprise.example',
                    name: 'Example'
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios', 'android']
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'battery-status',
                        'camera',
                        'console',
                        'contacts',
                        'device',
                        'device-motion',
                        'device-orientation',
                        'dialogs',
                        'file',
                        'geolocation',
                        'globalization',
                        'inappbrowser',
                        'media',
                        'media-capture',
                        'network-information',
                        'splashscreen',
                        'vibration'
                    ]
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    platforms: ['ios'],
                    args: ['--verbose']
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android'],
                    args: ['--verbose']
                }
            },
            emulate_android: {
                options: {
                    command: 'emulate',
                    platforms: ['android'],
                    args: ['--target','Nexus5']
                }
            },
            emulate_ios: {
                options: {
                    command: 'emulate',
                    platforms: ['ios'],
                    args: ['--verbose']

                }
            }
        },
        processhtml: {
            options: {
                data: {
                    message: 'Hello world!'
                }
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/_index.html': ['<%= yeoman.app %>/index.html']
                }
            }
        },
        concat: (function(){
            var sections = scriptExtractor('app/index.html','app/');
            var concatStep = {};
            sections.forEach(function(section) {
                console.log(section);
                concatStep[section.output] = {
                    src:section.srcs,
                    dest:'cordova_app/www/'+section.output
                }
            })
            return concatStep;
        })()

    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:dist',
            'browserify:app',
            'compass:server',            
            'copy',
            'processhtml',
            'concat',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('cordova', function (platform) {
        
        platform = platform || 'ios';

        grunt.task.run([
            'clean:dist',
            'browserify:app',
            'compass:server',
            'copy',
            'processhtml',
            'cordovacli:emulate_'+platform
        ]);
    });
    

    grunt.registerTask('test-jasmine', [
        'clean:jasmine',
        'browserify:app',
        'compass',
        'connect:jasmine',
        'jasmine'
    ]);

    grunt.registerTask('test-casperjs', [
        'clean:dist',
        'browserify:app',
        'compass',
        'copy',
        'processhtml',
        'connect:casperjs',
        'casperjs'
    ]);

    grunt.registerTask('default', [
    ]);
};
