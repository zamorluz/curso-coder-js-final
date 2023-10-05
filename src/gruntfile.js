module.exports = function(grunt) {
    var tasks = [
      // 'csslint', 
      // 'scsslint', 
      'jshint', 
      'concat', 
      'uglify', 
      'sass', 
      'cssmin', 
      ];
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      esversion: 6,
      jshint: {
        // define the files to lint
        files: [
          'Gruntfile.js', 
          'assets/js/*.js',
        ],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
          esversion: 6,
          // more options here if you want to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
          },
          jshintrc: true
        }
      },
      concat: {
        options: {
          // define a string to put between each file in the concatenated output
          separator: ';\n'
        },
        public: {
          // the files to concatenate
          src: [
            'assets/js/core.js',
            'assets/js/core/**/*.js',
            'assets/js/feature/**/*.js',
            'assets/js/app.js',
            
          ],
          // the location of the resulting JS file
          dest: 'js/<%= pkg.name %>.js'
        },
      },
      uglify: {
        options: {
          // the banner is inserted at the top of the output
          banner: '/*! <%= pkg.name %>: version <%= pkg.version %> -  <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
          preserveComments: false
        },
        dist: {
          files: {
            'js/<%= pkg.name %>.min.js': ['<%= concat.public.dest %>'],
          }
        }
      },
      csslint: {
        strict: {
          options: {
            import: 1
          },
          src: [
            'assets/css/**/*.css',
            // '<%= pkg.name %>.css', // DO NOT CHECK THIS BECAUSE OF BOOTSTRAP
            // '<%= pkg.name %>.min.css', // DO NOT CHECK THIS BECAUSE OF BOOTSTRAP
          ]
         }
      },
      scsslint: {
        allFiles: [
          'assets/scss/**/*.scss',
        ],
        options: {
          // bundleExec: true,
          // configFile: '.scss-lint.yml',
          failOnWarning: false,
          // reporterOutput: 'scss-lint-report.xml',
          colorizeOutput: true
        },
      },
      sass: { 
        dist: { 
          options: {
            style: 'expanded',
            cacheLocation: '/tmp/.sass-cache',
            preserveComments: false
          },
          files: { 
            'css/<%= pkg.name %>.css': 'assets/scss/app.scss' // 'destination': 'source'
          }
        }
      }, 
      cssmin: {
        options: {
          keepSpecialComments: 0,
          specialComments: 0,
          sourceMap: true
        },
        target: {
          files: {
            'css/<%= pkg.name %>.min.css': 'css/<%= pkg.name %>.css' 
          }
        }
      },
      watch: {
        files: [
          'gruntfile.js',
          'assets/scss/**/*.scss',
          'assets/js/**/*.js'
        ],
        tasks: tasks
      }
    }); 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass'); 
    grunt.loadNpmTasks('grunt-contrib-cssmin');
  
    grunt.registerTask('default', tasks);
  };