// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  // let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // console.log("type of" + typeof tabs)
    // console.log("tabs " + tabs)
    // console.log(tabs[0]);
    // chrome.tabs.remove(tabs);
    function onRemoved() {
      console.log(`Removed`);
    }
    
    function onError(error) {
      console.log(`Error: ${error}`);
    }
    
    var removing = chrome.tabs.remove(2);
    removing.then(onRemoved, onError);
  });
};
