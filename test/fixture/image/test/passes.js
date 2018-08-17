/*global describe, it, window, document, assert */
'use strict';

describe('test', function () {

  it('image', function () {
    var img = window.createElement('img');

    document.body.appendChild(img);
    img.setAttribute('src', 'http://www.example.com/image.jpg');

    assert.ok(true);
  });

});
