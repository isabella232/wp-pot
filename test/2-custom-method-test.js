/* eslint-env node, mocha */
/* global before, after, describe, it */
'use strict';

const assert = require('assert');
const wpPot = require('../');
const testHelper = require('./test-helper');

describe('Custom method tests', () => {
  it('Test custom method from this', () => {
    const fixturePath = 'test/fixtures/custom-method.php';

    const potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      gettextFunctions: [
        { name: '$this->trans' }
      ]
    });

    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':2', 'Hello', false, false));
    assert(!testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':3', 'World', false, false));
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':10', 'Custom translate function in method call', false, false));
  });

  it('Test custom method from custom class', () => {
    const fixturePath = 'test/fixtures/custom-method.php';

    const potContents = wpPot({
      src: fixturePath,
      writeFile: false,
      gettextFunctions: [
        { name: '$that->trans' }
      ]
    });

    assert(!testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':2', 'Hello', false, false));
    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':3', 'World', false, false));
  });

  it('Test function calls in other methods', () => {
    const fixturePath = 'test/fixtures/custom-method.php';

    const potContents = wpPot({
      src: fixturePath,
      writeFile: false
    });

    assert(testHelper.verifyLanguageBlock(potContents, false, fixturePath + ':7', 'Translate function in method call', false, false));
  });
});
