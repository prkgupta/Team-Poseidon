var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Poseidon': function(browser) {
    browser
      .url('http://localhost:4000')
      .waitForElementVisible('body', 5000)
      .saveScreenshot('localhost')
      .end();
  }
};

// module.exports = {
//   'Login test': function (client) {
//     client
//       .url('http://localhost:5300')
//       .setValue('input[name="email"]', 'abc@gmail.com')
//       .setValue('input[name="password]', 'abcabc')
//       .click('button[type="submit"]')
//       .assert.containsText('main', 'News feed')
//       .end();
//   }
// };