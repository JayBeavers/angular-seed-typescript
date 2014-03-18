module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    typescript: {
      base: {
        src: ['app/js/**/*.ts'],
        options: {
          module: 'commonjs',
          target: 'es5',
          comments: true,
          sourceMap: true
        }
      }
    },

    jshint: {
      files: ['app/js/**/*.js'],
      options: {
        globalstrict: true,
        globals: {
          console: true,
          module: true,
          angular: true
        }
      }
    },

    watch: {
      files: ['<%= typescript.base.src %>'],
      tasks: ['typescript', 'jshint']
    },

    karma: {
      continuous: {

      options : {
        files : [
            'app/lib/angular/angular.js',
            'app/lib/angular/angular-*.js',
            'test/lib/angular/angular-mocks.js',
            'app/js/**/*.js',
            'test/unit/**/*.js'
          ],

          exclude : [
            'app/lib/angular/angular-loader.js',
            'app/lib/angular/*.min.js',
            'app/lib/angular/angular-scenario.js'
          ]
        },

        frameworks: ['jasmine'],
        browsers : ['PhantomJS'],
        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine'
            ],

        junitReporter : {
          outputFile: 'test_out/unit.xml',
          suite: 'unit'
        },

        singleRun: true
      }
    }    
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['typescript', 'jshint', 'karma:continuous']);

};