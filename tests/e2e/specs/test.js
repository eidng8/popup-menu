/*
 * GPLv3 https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Author: eidng8
 */

// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#click-me')
      .moveToElement('#click-me', 10, 10)
      .mouseButtonClick('right')
      .waitForElementVisible('.g8-menu')
      .assert.containsText('#open', 'open')
      .click('.g8-menu__checker')
      .assert.containsText('#clicked', 'item 0')
      .assert.containsText('#checker', 'item 0')
      .assert.containsText('#checker', 'true')
      .click('.g8-menu__checker')
      .assert.containsText('#checker', 'false')
      .click('.g8-menu__item--has-child')
      .assert.containsText('#clicked', 'item 1')
      .assert.containsText('.g8-menu--can__go-back', 'item 1')
      .click('li')
      .assert.containsText('#clicked', 'item 1.0')
      .assert.containsText('#selected', 'item 1.0')
      .assert.containsText('#open', 'close')
      .assert.not.visible('.g8-menu')
      .end();
  },
  'clicking backdrop closes menu': browser => {
    browser
      .init()
      .waitForElementVisible('#click-me')
      .moveToElement('#click-me', 10, 10)
      .mouseButtonClick('right')
      .waitForElementVisible('.g8-menu')
      .click('.g8-menu')
      .assert.not.visible('.g8-menu')
      .end();
  },
  'clicking `close` button closes menu': browser => {
    browser
      .init()
      .waitForElementVisible('#click-me')
      .moveToElement('#click-me', 10, 10)
      .mouseButtonClick('right')
      .waitForElementVisible('.g8-menu')
      .click('.g8-menu__close')
      .assert.not.visible('.g8-menu')
      .end();
  },
  '`back` button goes up': browser => {
    browser
      .init()
      .waitForElementVisible('#click-me')
      .moveToElement('#click-me', 10, 10)
      .mouseButtonClick('right')
      .waitForElementVisible('.g8-menu')
      .click('.g8-menu__item--has-child')
      .assert.containsText('#clicked', 'item 1')
      .assert.containsText('.g8-menu--can__go-back', 'item 1')
      .click('.g8-menu--can__go-back')
      .assert.elementNotPresent('.g8-menu--can__go-back')
      .assert.containsText('.g8-menu__item--has-child', 'item 1')
      .end();
  },
};
