'use strict';

module.exports = function (grunt) {

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')
      ,

      watch:{
         sourceChanges:{
            files:[
               'src/client-side/js/*.js', 
               'src/client-side/sass/*.scss', 
               'src/server-side/**.js'
            ],
            tasks:['build', 'develop:devServer'],
            options: { nospawn: true }
         }
      }
      ,
      env: {
         variables: {
         }
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

      shell: {
      },

      sass: {
         all:{
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

      uglify: {

         clientSideJs:{
            options:{
               wrap:'enclose'
            },

            files:{
               'build/client-side/js/all.js': require('./src/client-side/js/sourceList.js')
            }
         }
      },

      cssmin:{
         minifyCss:{
            files:{
               'build/client-side/css-min/all.css':'build/client-side/css/*.css'
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

   grunt.registerTask('build', ['sass:all', 'uglify:clientSideJs', 'cssmin:minifyCss']);
   
   // start in DEV mode
   grunt.registerTask('start-dev', [
      'build',
      'env:variables',
      'develop:devServer',
      'watch:sourceChanges'
   ]);

   grunt.registerTask('default', 'start-dev');
};
