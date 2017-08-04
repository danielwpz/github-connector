const config = {
  logger: {
    options: {
      level: 'notice',
      handle_exceptions: false,
      colorize: true,
      silent: false,
      timestamp: true,
      pretty_print: true,
      label: '',
      levels: {
        debug: 0,
        info: 1,
        notice: 2,
        warning: 3,
        error: 4,
        crit: 5,
        alert: 6,
        emerg: 7
      },
      colors: {
        debug: 'white',
        info: 'grey',
        notice: 'green',
        warning: 'yellow',
        error: 'red',
        crit: 'blue',
        alert: 'magenta',
        emerg: 'cyan'
      },
      syslog: {
        /* jshint -W106 */
        enabled:  true,
        protocol: 'udp4',
        path:     '/dev/log',
        app_name: 'authentication-server',
        facility: 'local0'
      }
    }
  },
  express: {
    port: 8080
  }
};

module.exports = function () {
  return config;
};