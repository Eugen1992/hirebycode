const domains = {
  'production': 'https://www.hirebycode.me',
  'test': 'http://test.hirebycode.me',
  'dev': 'http://dev.hirebycode.me',
};

module.exports = domains[process.env.ENV];
