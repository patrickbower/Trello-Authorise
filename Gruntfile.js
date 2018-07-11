module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          './build/<%= pkg.name %>.js': './src/js/main.js'
        },
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            transform: [
              ['babelify', { presets: ['es2015'] }]
          ]
        }
      }
    },
    sass: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                './build/<%= pkg.name %>.css': './src/css/main.scss'
            }
        }
    },
    includes: {
      files: {
        src: [
          './src/html/*.html'
        ],
        dest: './build',
        flatten: true,
        cwd: '.',
        options: {
          silent: true
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: './src',
        src: ['fonts', 'favicon.ico', 'js/lib/*.js'],
        dest: './build'
      }
    },
    imagemin:{
      target: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['imgs/*.{png,jpg,jpeg,gif}'],
          dest: 'build/'
        }]
      }
    },
    watch: {
      scripts: {
        files: ['./src/js/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ['./src/css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
      html: {
        files: ['./src/html/**/*.html', './src/html/*.html'],
        tasks: ['includes'],
        options: {
          spawn: false,
        },
      }
    },
    uglify: {
      my_target: {
        files: {
          'build/<%= pkg.name %>.js': 'build/<%= pkg.name %>.js'
        }
      }
    }
  });

  grunt.registerTask('default',
    [
      'sass',
      'browserify',
      'includes',
      'copy',
      'imagemin',
      'uglify'
    ]
  );

};
