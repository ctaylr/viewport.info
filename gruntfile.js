module.exports = function(grunt) {

  grunt.initConfig({
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
        'css/main.css': 'scss/main.scss',       // 'destination': 'source'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/viewport.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! Viewport.info <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'js/viewport.min.js': 'js/viewport.js'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>','scss/main.scss'],
      tasks: ['sass','jshint','uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['sass','jshint','uglify']);

};