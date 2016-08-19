module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      options: {
          sourceMap: true
      },
      dist: {
          files: {
              'client/application.css': 'client/sass/application.scss'
          }
      }
    },
    watch: {
      sass: {
        files: ['client/sass/*.scss'],
        tasks: ['sass']
      }
    },
    nodemon: {
      dev: {
          script: 'server.js'
        }
    }
  });
  


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['sass', 'watch:sass']);

};