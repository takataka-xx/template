/*
 *
 * fastcoding helper.css生成のためのgruntfile
 *
 */

'use strict';

module.exports = function(grunt) {

  //var FILES_PAIR_FOR_UGLIFY = grunt.util._.object(FILES_PROCESSED, FILES_PROCESSED);

  /*
   * common statement
   */
  var RE_USE_STRICT_STATEMENT = /(^|\n)[ \t]*('use strict'|"use strict");?\s*/g;
  var RE_CONSOLE_METHODS = /console.[\w]+\(.*?(\w*\(.*\))*\);/g;

  //var BUILD_ORDERED_LIST_LIB = [
  //  'dev/javascript/libs/jquery/dist/jquery.js',
  //  'dev/javascript/libs/jquery-glide/dist/jquery.glide.js',
  //  'dev/javascript/libs/jquery-cookie/jquery.cookie.js',
  //  'dev/javascript/libs/lodash/dist/lodash.underscore.js',
  //  'dev/javascript/libs/handlebars/handlebars.runtime.js'
  //];

  var COMPASS_CONFIG = {};
  var COMPASS_TASKS = [];


  var CSS_BUILD_TASKS = [
    'compass',
    'autoprefixer',
    'cssmin'
  ];

  grunt.util._.flatten(CSS_BUILD_TASKS.splice(2, 0, COMPASS_TASKS));
  CSS_BUILD_TASKS = grunt.util._.flatten(CSS_BUILD_TASKS);
  grunt.log.debug(CSS_BUILD_TASKS);
  ;

  /*
   * Project Configuration.
   */
  var GRUNT_INIT_CONFIG = {
    pkg: grunt.file.readJSON('package.json'),

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      target: [
        'compass',
        'cssmin',
        'assemble',
        'prettify',
        'copy:image'
      ],
      fast: [
        'compass',
        'cssmin',
        'assemble',
        'prettify'
      ]
    },

    watch: {
      //jsbuild: {
      //  files: [BUILD_ORDERED_LIST_LIB],
      //  tasks: ['concat:libs', 'uglify']
      //},
      cssbuild: {
        files: ['dev/stylesheet/**/*.scss'],
        tasks: ['compass','autoprefixer', 'cssmin']
        // TODO: sprite task
        //tasks: ['compass', 'image', 'cssmin']
      },
    },

    compass: {
      options: {
        raw: 'Encoding.default_external = \'utf-8\'\n',
      },
      fast: {
        options : {
          httpPath: '/build',
          sassDir: 'dev/stylesheet',
          cssDir: 'build/css',
          specify: 'dev/stylesheet/main.scss',
          force: true
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/',
        ext: '.min.css'
      }
    },

    csso: {
      files: {
        src: ['build/css/main.css'],
        dest: 'build/css/main.min.css'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['ios >= 6', 'android >= 2.3']
      },
      multipul_files: {
        expand: true,
        flatten: true,
        cwd: 'build/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css/'
      }
    },

    //concat: {
    //  options: {
    //    stripBanners: true,
    //    banner: [BANNER_TEMPLATE_STRING, '(function(window) {', '', "'use strict';", '', ''].join('\n'),
    //    footer: ['', '})(this);'].join('\n')
    //  },
    //  libs: {
    //    src: BUILD_ORDERED_LIST_LIB,
    //    dest: 'build/js/libs.js',
    //    options: {
    //      stripBanners: true,
    //      banner: '',
    //      footer: ''
    //    }
    //  }
    //}

    //uglify: {
    //  options: {
    //    report: 'min',
    //    preserveComments: 'some'
    //  },
    //  libs: {
    //    files: {
    //      'build/js/libs.min.js': ['build/js/libs.js']
    //    }
    //  }
    //}

  };


  /*
   * Grunt
   */
  grunt.initConfig(GRUNT_INIT_CONFIG);

  /*
   * load NPM tasks
   */
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-license-collection');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  //grunt.loadNpmTasks('grunt-image');


  /*
   * Default tasks
   */
  grunt.registerTask('default', ['build']);

  /*
   * Javascript & CSS build
   */
  grunt.registerTask('build', CSS_BUILD_TASKS);
    //[
    //  'jsbuild',
    //  'cssbuild',
    //  'cssmin'
    //]);

  /*
   * Javascript build
   */
  //grunt.registerTask('jsbuild', [
  //  'concat:libs',
  //  'uglify:libs'
  //]);

  /*
   * CSS build
   */
  grunt.registerTask('cssbuild', CSS_BUILD_TASKS);

};
