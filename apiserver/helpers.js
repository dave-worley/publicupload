const crypto = require('crypto');
module.exports = {
  uniqid: () => {
    return crypto.randomBytes(16).toString('hex');
  },
  consolepop: (msg) => {
    console.log('\x1b[5m%s\x1b[0m', msg);
  },
  pprint: (msg, color) => {
    const colors = {
      'red': '\x1b[31m',
      'green': '\x1b[32m',
      'yellow': '\x1b[33m',
      'blue': '\x1b[34m',
      'magenta': '\x1b[35m',
      'cyan': '\x1b[36m',
      'white': '\x1b[37m'
    };
    console.log(colors[color] + '%s\x1b[0m', msg);
  }
};
