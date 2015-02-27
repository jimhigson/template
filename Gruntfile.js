'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        ,

        watch: {
            sourceChanges: {
                files: [
                    'src/client-side/js/*.js',
                    'src/client-side/sass/*.scss',
                    'src/server-side/**.js'
                ],
                tasks: ['build', 'develop:devServer'],
                options: {nospawn: true}
            }
        }
        ,
        env: {
            variables: {}
        }
        ,
        develop: {
            devServer: {
                file: 'src/server-side/index.js',
                nodeArgs: ['--harmony'],
                env: {
                    NODE_ENV: 'development'
                }
            }
        },

        shell: {},

        sass: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/client-side/sass',
                        src: ['*.scss'],
                        dest: 'build/client-side/css',
                        ext: '.css',
                        extDot: 'first'
                    }
                ]
            }
        },

        browserify: {
            dev: {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                src: './src/client-side/js/main.js',
                dest: './build/client-side/js/all.js'
            }
        },

        uglify: {
        },

        cssmin: {
            minifyCss: {
                files: {
                    'build/client-side/css-min/all.css': 'build/client-side/css/*.css'
                }
            }
        }

    });

    // load all grunt tasks
    grunt.loadNpmTasks('grunt-develop');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['browserify:dev', 'sass:all', 'cssmin:minifyCss']);

    // start in DEV mode
    grunt.registerTask('start-dev', [
        'build',
        'env:variables',
        'develop:devServer',
        'watch:sourceChanges'
    ]);

    grunt.registerTask('default', 'start-dev');
};
