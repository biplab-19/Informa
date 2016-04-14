'use strict';

// for performance reasons we're only matching one level down:

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt, {
        pattern : ['grunt-*', 'assemble']
    });

    // Project configuration.
    grunt.initConfig({

        config: {
            src: 'src',
            dist: 'dist',
            tmp: 'tmp'
        },

        //Watch these files to do thier respective tasks on change
        watch: {
            assemble: {
                files: ['<%= config.src %>/{content,data,templates, components}/{,*/}*.{hbs,json}'],
                tasks: ['assemble:dev']
            },
            scripts: {
                files: ['<%= config.src %>/{scripts,json}/**/*'],
                tasks: ['copy:dev']
            },
            compass: {
                files: ['<%= config.src %>/sass/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            images: {
                files: [
                    '<%= config.src %>/images/**/*.*'
                ],
                tasks: ['copy:dev']
            },
            readme: {
                files: [
                    '<%= config.src %>/README.md'
                ],
                tasks: ['copy:dev']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.tmp %>/{,*/}*.html',
                    '<%= config.tmp %>/styles/**/*.css',
                    '<%= config.tmp %>/{,*/}*.js',
                    '<%= config.tmp %>/{,*/}*.json',
                    '<%= config.tmp %>/{,*/}*.{png,jpg,jpeg,gif}'
                ]
            },
        },

        connect: {
            options: {
                port: 9001,
                livereload: 35730,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '127.0.0.1'
            },
            dev: {
                options: {
                    port: 9001,
                    open: true,
                    base: [
                        '<%= config.tmp %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>'
                }
            }
        },

        //All the pages are generated here by taking in the layout and partials in the specified directory
        assemble: {
            dev: {
                options: {
                    flatten: true,
                    assets: '<%= config.tmp %>',
                    layout: 'main-layout.hbs',
                    layoutdir: '<%= config.src %>/templates/layouts',
                    data: '<%= config.src %>/data/*.{json,yml}',
                    partials: '<%= config.src %>/components/**/*.hbs'
                },
                files: {
                    '<%= config.tmp %>/': ['<%= config.src %>/templates/pages/*.hbs']
                }
            },
            prod : {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>',
                    layout: 'main-layout.hbs',
                    layoutdir: '<%= config.src %>/templates/layouts',
                    data: '<%= config.src %>/data/*.{json,yml}',
                    partials: '<%= config.src %>/components/**/*.hbs'
                },
                files: {
                    '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
                }
            }
        },

        //Takes in all sass files from source, you can add files that you want them to get added
        compass: {
            dev: {
                options: {
                    sassDir: ['<%= config.src %>/sass'],
                    cssDir: ['<%= config.tmp %>/styles'],
                    environment: 'development',
                    generatedImagesDir: '<%= config.tmp %>/images',
                    imagesDir: '<%= config.src %>/images',
                    fontsDir: '<%= config.src %>/sass/fonts',
                    importPath: 'bower_components',
                    httpImagesPath: '/images',
                    httpGeneratedImagesPath: '/images',
                    httpFontsPath: '/fonts',
                    relativeAssets: false,
                    assetCacheBuster: false
                }
            },
            prod: {
                options: {
                    sassDir: ['<%= config.src %>/sass'],
                    environment: 'production',
                    importPath: 'bower_components',
                    httpImagesPath: '/images',
                    httpGeneratedImagesPath: '/images',
                    httpFontsPath: '/fonts',
                    relativeAssets: false,
                    assetCacheBuster: false,
                    noLineComments: true,
                    outputStyle: 'compact'
                }
            }
        },

        concat: {

            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            prod: {
                files: {
                    '<%= config.tmp %>/scripts/informaui.main.js': [
                        '<%= config.src %>/scripts/informaui.main.js',
                        '<%= config.src %>/scripts/plugins/*.js',
                        '!<%= config.src %>/scripts/handlebars_helpers.js'
                    ]
                }
            }
        },

        //Edittable : You need to manually enter files that need to be copied to tmp
        //Copies all the files from various sources to respective directories
        //This is where you add all you plugin files that need to get copied from bower & other sources
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%= config.src %>/images',
                        src: ['bower_components/slick-carousel/slick/**.{gif,jpg}']
                    },
                    {
                        expand: true,
                        src: [
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/slick-carousel/slick/slick.js',
                            'bower_components/parallax/deploy/jquery.parallax.js',
							              'bower_components/picturefill/src/picturefill.js',
							              'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
                            'src/components/carousel/js/carousel.js'
                        ],
                        dest: '<%= config.tmp %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>',
                        dest: '<%= config.tmp %>',
                        src: [
                            'favicon.ico',
                            'videos/**/*',
                            'images/**/*',
                            'scripts/**/*.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/slick-carousel/slick/fonts',
                        dest: '<%= config.tmp %>/fonts',
                        src: [
                            '{,*/}*.*',
                            "!_fonts.scss"
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/sass/fonts',
                        dest: '<%= config.tmp %>/styles/fonts',
                        src: [
                            '{,*/}*.*',
                            "!_fonts.scss"
                        ]
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>',
                        dest: '<%= config.dist %>',
                        src: [
                            'favicon.ico',
                            'videos/**/*'
                        ]
                    },
                    {expand: true, cwd: '<%= config.src %>/images', src: ['**/*.*'], dest: '<%= config.dist %>/images'},
                    {expand: true, cwd: '<%= config.tmp %>/styles/fonts', src: ['**/*.*'], dest: '<%= config.dist %>/css/fonts'},
                    {expand: true, cwd: '<%= config.tmp %>/styles', src: ['**/*.*'], dest: '<%= config.dist %>/css'}
                ]
            },
            werk: {
                files: [
                ]
            },
            styles: {
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            dev : ['<%= config.tmp %>'],
            prod : ['<%= config.dist %>']
        },

        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                },
                compress: {
                    drop_console: true
                }
            },
            prod: {
                files: {
                    '<%= config.dist %>/scripts/informaui.main.js': ['<%= config.tmp %>/scripts/components/*.js','<%= config.tmp %>/scripts/informaui.main.js'],
                    '<%= config.dist %>/scripts/vendor/vendor.js': ['bower_components/jquery/jquery.js','bower_components/slick-carousel/slick/slick.js']
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.dist %>/index.html'
        },

        usemin: {
            options: {
                dirs: ['<%= config.dist %>']
            },
            html: ['<%= config.dist %>/{,*/}*.html']
        },

        imagemin: {
            prod: {
                options : {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= config.tmp %>/styles/'
                }]
            }
        },

        concurrent: {
            server: [
                'compass:dev',
                'copy:styles'
            ],
            prod: [
                'compass:prod',
                'copy:styles',
                'imagemin'
            ],
            werk: [
                'compass',
                'copy:styles'
            ]
        },

        modernizr: {
            dist: {
                'devFile' : 'bower_components/modernizr/modernizr.js',
                'outputFile' : '<%= config.dist %>/scripts/vendor/modernizr.js',
                'uglify' : true
            }
        },

       compress: {
            main: {
                options: {
                    // Name release based on creation date
                    archive: function () {
                        var d = new Date();
                        var cDay = d.getDate();
                        var cMonth = d.getMonth() + 1;
                        var cYear = d.getFullYear();
                        cMonth = (cMonth < 10)? '0' + cMonth: cMonth;
                        cDay = (cDay < 10)? '0' + cDay: cDay;
                        return 'releases/projecteeq_FED_' + cMonth + cDay + cYear + '.zip';
                    }
                },
                files: [
                    // UPDATE FOR EACH RELEASE ***********
                    {   // Files from DIST folder
                        expand: true,
                        cwd: '<%= config.dist %>',
                        src: [
                            'images/**',
                            '!images/sprites/**',
                            '!images/svg-sprites/**',
                            'scripts/**',
                            'styles/**',
                            'apple-touch-icon.png',
                            'favicon.ico',
                            '*.html'
                        ]
                    },
                    {   // FED Data files
                        expand: true,
                        cwd: '<%= config.src %>/data',
                        dest: '_DEV_Data',
                        src: ['**/*.{json,yml}']
                    },
                    {   // FED Template and Partials
                        expand: true,
                        cwd: '<%= config.src %>/templates',
                        dest: '_DEV_Templates',
                        src: ['**/*.hbs']
                    }
                ]
            }
        },

        accessibility: {
          options: {
            accessibilityLevel: 'WCAG2A'
          },
          test: {
            src: '<%= config.tmp %>/wca-error.html'
          }
        }

    });

    // All tasks are resitered pre built
    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:dev',
            'copy:dev',
            'compass:dev',
            'assemble:dev',
            'connect:dev',
            'watch',
        ]);
    });

    grunt.registerTask('build', [
        'clean:prod',
        'assemble:prod',
        'useminPrepare',
        'copy:prod',
        'concurrent:prod',
        'concat:prod',
        'uglify:prod',
        'usemin',
        'modernizr',
        'accessibility'
    ]);

    grunt.registerTask('werk', [
        'clean:prod',
        'assemble:prod',
        'useminPrepare',
        'copy:prod',
        'concurrent:werk',
        'concat:prod',
        'uglify:prod',
        'usemin',
        'modernizr',
        'accessibility'
    ]);

    grunt.registerTask('release', [
        'build',
        'compress'
    ]);
};
