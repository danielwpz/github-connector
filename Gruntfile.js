'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    env: {
      development: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      },
      production: {
        NODE_ENV: 'production'
      }
    },
    watch: {
      express: {
        files: ['lib/**/*.js'],
        tasks: ['express:development'],
        options: {
          spawn: false
        }
      }
    },
    express: {
      options: {
        script: 'app.js'
      },
      development: {},
      test: {},
      production: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('run', function (target) {
    if (!target) {
      target = 'development';
    }

    grunt.task.run([
      'env:' + target,
      'express:' + target,
      'watch'
    ]);
  });
};