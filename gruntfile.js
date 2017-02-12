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
        dest: 'client/svg-sprite',
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
    },
    svginjector: {
      example: {
        options: {
          container: '#svg-icons',
          mode: 'prepend'
        },
        files: {
          'client/icons.js': 'client/svg-sprite/symbol/svg/sprite.symbol.svg'
        }
      }
    },
    copy: {
      build: {
        expand: true,
        src: ['server/**/*', 'views/**/*', 'client/**/*', 'server.js', 'package.json'],
        dest: 'build/',
      },
    },
    clean: {
      build: ['build']
    },
    processhtml: {
      dist: {
        files: {
          'build/client/index.html': ['views/index.hbs']
        }
      }
    },
    useref: {
        // specify which files contain the build blocks 
        html: 'build/views/index.hbs',
        // explicitly specify the temp directory you are working in 
        // this is the the base of your links ( "/" ) 
        temp: 'build'
    }
  });
  


  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-useref');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-svginjector');

  grunt.registerTask('default', ['sass', 'watch:sass']);
  grunt.registerTask('svg-icons', ['svg_sprite', 'svginjector']);

  grunt.registerTask('build', ['clean:build', 'copy:build', 'useref',  'concat']);

};