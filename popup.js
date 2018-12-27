// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


const changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', (data) => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = (element) => {
  const color = element.target.value;
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tabObj) => {
      chrome.tabs.remove(tabObj.id);
      console.log(hi);
    });
  });
};
