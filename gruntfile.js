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
    }
    
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['typescript', 'jshint']);

};