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
    },
    svg_sprite: {
      basic: {
          // Target basics 
        expand: true,
        src: ['client/svg/*.svg'],
        dest: 'client/sass/svg',
        // Target options
        options: {
          mode: {
            css: {   // Activate the «css» mode 
              render: {
                scss : true  // Activate CSS output (with default options) 
              }
            },
            symbol: true
          }
        }
      }
    }
  });
  


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-svg-sprite');

  grunt.registerTask('default', ['sass', 'watch:sass']);

};