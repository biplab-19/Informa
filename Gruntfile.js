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
                files: ['<%= config.src %>/{content,data,templates,components}/{,*/}*.{hbs,json}', '<%= config.src %>/components/**/*.hbs', '<%= config.src %>/components/**/data/*.json'],
                tasks: ['assemble:dev']
            },
            scripts: {
                files: ['<%= config.src %>/components/**/js/*.js'],
                tasks: ['copy:dev']
            },
            compass: {
                files: ['<%= config.src %>/sass/**/*.{scss,sass}', '<%= config.src %>/components/**/sass/*.{scss,sass}'],
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
                    '<%= config.tmp %>/css/**/*.css',
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
                    data: ['<%= config.src %>/components/**/*.{json,yml}'],
                    partials: ['<%= config.src %>/components/**/*.hbs'],
                    helpers: ['<%= config.src %>/build-scripts/handlebar-helper-grunt.js']
                },
                files: {
                    '<%= config.tmp %>/': ['<%= config.src %>/templates/pages/**/*.hbs']
                }
            }
        },

        //Takes in all sass files from source, you can add files that you want them to get added
        compass: {
            dev: {
                options: {
                    sassDir: ['<%= config.src %>/sass'],
                    cssDir: ['<%= config.tmp %>/Static/css'],
                    environment: 'development',
                    generatedImagesDir: '<%= config.tmp %>/Static/images',
                    imagesDir: '<%= config.src %>/images',
                    fontsDir: '<%= config.src %>/sass/fonts',
                    importPath: ['bower_components','<%= config.src %>/sass/global', '<%= config.src %>/components'],
                    httpImagesPath: '/images',
                    httpGeneratedImagesPath: '/images',
                    httpFontsPath: '/fonts',
                    relativeAssets: false,
                    assetCacheBuster: false
                }
            }
        },

        concat: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            prod: {
                files: {
                    '<%= config.dist %>/unminified/Static/js/main.js': ['<%= config.tmp %>/Static/js/*.js','!<%= config.tmp %>/Static/js/analytics.js', '<%= config.tmp %>/Static/js/components/*.js'],
                    '<%= config.dist %>/unminified/Static/js/vendor.js': ['bower_components/jquery/dist/jquery.min.js', 'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js', 'bower_components/slick-carousel/slick/slick.js', 'bower_components/handlebars/handlebars.js', 'bower_components/chosen/chosen.jquery.js', 'bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js', 'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js', 'bower_components/jquery-validation/dist/jquery.validate.min.js', 'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js', 'bower_components/moment/min/moment.min.js', 'bower_components/fullcalendar/dist/fullcalendar.min.js', 'bower_components/picturefill/src/picturefill.js', 'src/scripts/typed.min.js', 'bower_components/owl-carousel/lib/owl.carousel.min.js', 'bower_components/masonry-pkgd/lib/masonry.pkgd.js','bower_components/jquery-ui/jquery-ui.js'],
                    '<%= config.dist %>/unminified/Static/js/pdf.js': ['bower_components/pdf.js-viewer/pdf.js'],
                    '<%= config.dist %>/unminified/Static/js/pdf.worker.js': ['bower_components/pdf.js-viewer/pdf.worker.js'],
                    '<%= config.dist %>/unminified/Static/js/amcharts.js': ['src/scripts/amcharts/amcharts.js'],
                    '<%= config.dist %>/unminified/Static/js/animate.min.js': ['src/scripts/amcharts/animate.min.js'],
                    '<%= config.dist %>/unminified/Static/js/light.js': ['src/scripts/amcharts/light.js'],
                    '<%= config.dist %>/unminified/Static/js/pie.js': ['src/scripts/amcharts/pie.js'],
                    '<%= config.dist %>/unminified/Static/js/serial.js': ['src/scripts/amcharts/serial.js'],
                    '<%= config.dist %>/unminified/Static/js/wow.min.js': ['src/scripts/animation/wow.min.js'],
                    '<%= config.dist %>/unminified/Static/css/component.css': ['<%= config.tmp %>/Static/css/component.css'],
                    '<%= config.dist %>/unminified/Static/css/global.css': ['<%= config.tmp %>/Static/css/global.css'],
                    '<%= config.dist %>/unminified/Static/css/agri-theme.css': ['<%= config.tmp %>/Static/css/agri-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/pharma-theme.css': ['<%= config.tmp %>/Static/css/pharma-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/tech-theme.css': ['<%= config.tmp %>/Static/css/tech-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/financial-theme.css': ['<%= config.tmp %>/Static/css/financial-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/tmt-theme.css': ['<%= config.tmp %>/Static/css/tmt-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/tmt-newco-theme.css': ['<%= config.tmp %>/Static/css/tmt-newco-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/maritime-theme.css': ['<%= config.tmp %>/Static/css/maritime-theme.css', '<%= config.tmp %>/Static/css/law-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/law-theme.css': ['<%= config.tmp %>/Static/css/law-theme.css'],
                    '<%= config.dist %>/unminified/Static/css/marketing-module.css': ['src/sass/marketing-module.css'],
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
                        dest: '<%= config.tmp %>/Static/images',
                        src: ['bower_components/slick-carousel/slick/**.{gif,jpg}']
                    },
                    {
                        expand: true,
                        src: [
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/slick-carousel/slick/slick.js',
                            'bower_components/handlebars/handlebars.js',
                            'bower_components/parallax/deploy/jquery.parallax.js',
                            'bower_components/picturefill/src/picturefill.js',
                            'bower_components/chosen/chosen.jquery.js',
                            'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
                            'bower_components/bootstrap-multiselect/dist/js/bootstrap-multiselect.js',
                            'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
                            'bower_components/jquery-validation/dist/jquery.validate.min.js',
                            'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js',
                            'bower_components/moment/min/moment.min.js',
                            'bower_components/fullcalendar/dist/fullcalendar.min.js',
                            'bower_components/picturefill/src/picturefill.js',
                            'src/scripts/typed.min.js',
                            'bower_components/pdf.js-viewer/pdf.js',
                            'bower_components/pdf.js-viewer/pdf.worker.js'
                            
                          ],
                        dest: '<%= config.tmp %>'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= config.src %>/components/**/data/*.json'],
                        dest: '<%= config.tmp %>/data'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= config.src %>/components/**/js/*.js'],
                        dest: '<%= config.tmp %>/Static/js/components'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= config.src %>/scripts/**/*.js'],
                        dest: '<%= config.tmp %>/Static/js'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/scripts/analytics',
                        src: ['{,*/}*.*'],
                        dest: '<%= config.tmp %>/Static/js/analytics'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>',
                        dest: '<%= config.tmp %>',
                        src: [
                            'favicon.ico',
                            'videos/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/cms-images',
                        src: ['{,*/}*.*'],
                        dest: '<%= config.tmp %>/cms-images'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/Static/images',
                        src: ['{,*/}*.*'],
                        dest: '<%= config.tmp %>/Static/images'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/slick-carousel/slick/fonts',
                        dest: '<%= config.tmp %>/Static/fonts',
                        src: [
                            '{,*/}*.*',
                            "!_fonts.scss"
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass-official/assets/fonts',
                        dest: '<%= config.tmp %>/Static/fonts',
                        src: [
                            '{,*/}*.*',
                            "!_fonts.scss"
                        ]
                    },


                    {
                        expand: true,
                        cwd: '<%= config.src %>/fonts',
                        dest: '<%= config.tmp %>/Static/fonts',
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
                        src: ['favicon.ico','videos/**/*']
                    },
                    {expand: true, cwd: '<%= config.src %>/Static/images', src: ['**/*.*'], dest: '<%= config.dist %>/unminified/Static/images'},
                    {expand: true, cwd: '<%= config.tmp %>/Static/fonts', src: ['**/*.*'], dest: '<%= config.dist %>/unminified/Static/fonts'},
                    {expand: true, cwd: '<%= config.src %>/scripts/analytics', src: ['**/*.*'], dest: '<%= config.dist %>/env-specific'}
                ]
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
                        return 'releases/informaui' + cMonth + cDay + cYear + '.zip';
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
                            'css/**',
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
        },
        eslint: {
            target: ['<%= config.src %>/components/**/js/*.js']
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
        'useminPrepare',
        'copy:prod',
        'concat:prod',
        'usemin',
        'concat'
        //'modernizr'
        //'eslint',
        // 'accessibility'
    ]);

    grunt.registerTask('release', [
        'build',
        'compress'
    ]);
};
