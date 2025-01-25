// ==UserScript==
// @name         B站直播P2P屏蔽脚本
// @namespace    https://github.com/sikuai2333
// @version      1.0
// @description  屏蔽B站直播的P2P上传功能，减少设备资源占用
// @author       sikuai
// @match        *://live.bilibili.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 删除P2P相关接口
    delete window.RTCPeerConnection;
    delete window.mozRTCPeerConnection;
    delete window.webkitRTCPeerConnection;

    console.log('B站直播P2P屏蔽脚本已运行，P2P相关接口已删除');
})();
