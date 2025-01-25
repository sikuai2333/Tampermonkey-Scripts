// ==UserScript==
// @name         Bilibili页面精简
// @namespace    https://github.com/sikuai2333/
// @version      2.2
// @description  修改Bilibili视频页面和首页的样式，移除广告，精简页面内容
// @author       sikuai
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 通用隐藏元素函数
    const hideElements = (selectors) => {
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none'; // 隐藏元素
            });
        });
    };

    // 修改视频页面的样式
    const modifyVideoPage = () => {
        // 隐藏视频页面特定元素
        const videoPageSelectors = [
            '.header-channel',
            '.bili-header__channel',
            '.bili-header__banner',
            '.adblock-tips',
            '.palette-button-wrap',
            '.rec-list'
        ];
        hideElements(videoPageSelectors);

        // 修改video-pod__body的高度和最大高度
        const videoPodBody = document.querySelector('.video-pod__body');
        if (videoPodBody) {
            videoPodBody.style.height = '500px';
            videoPodBody.style.maxHeight = '500px'; // 设置最大高度
        }

        // 修改rcmd-tab的高度
        const rcmdTab = document.querySelector('.rcmd-tab');
        if (rcmdTab) {
            rcmdTab.style.height = '500px';
        }

        // 修改video-pod video-pod的高度
        const videoPod = document.querySelector('.video-pod.video-pod');
        if (videoPod) {
            videoPod.style.height = '590px';
        }
    };

    // 精简首页内容
    const simplifyHomePage = () => {
        // 隐藏首页特定元素
        const homePageSelectors = [
            '.header-channel',
            '.bili-header__channel',
            '.bili-header__banner',
            '.adblock-tips',
            '.palette-button-wrap',
            '.left-entry', // 首页隐藏.left-entry
            'main.bili-feed4-layout'
        ];
        hideElements(homePageSelectors);

        // 修改首页特定元素的样式
        const centerSearchContainer = document.querySelector('.center-search-container');
        if (centerSearchContainer) {
            centerSearchContainer.style.position = 'absolute';
            centerSearchContainer.style.left = '50%'; // 横向居中
            centerSearchContainer.style.transform = 'translateX(-50%)'; // 精确横向居中
            centerSearchContainer.style.marginTop = '20vh'; // 纵向位置：距离顶部40%视口高度
        }

        const rightEntry = document.querySelector('.right-entry');
        if (rightEntry) {
            rightEntry.style.position = 'absolute';
            rightEntry.style.left = '50%'; // 横向居中
            rightEntry.style.transform = 'translateX(-50%)'; // 精确横向居中
            rightEntry.style.marginTop = '60vh'; // 纵向位置：距离顶部70%视口高度
        }
    };

    // 修改全局样式
    const modifyGlobalStyles = () => {
        // 修改bili-header的背景颜色
        const biliHeader = document.querySelector('.bili-header.large-header');
        if (biliHeader) {
            biliHeader.style.backgroundColor = '#121212'; // 设置为深色护眼色
        }

        // 修改gray类的背景颜色
        const grayElements = document.querySelectorAll('.gray');
        grayElements.forEach(el => {
            el.style.backgroundColor = '#121212'; // 设置为深色护眼色
        });
    };

    // 监听页面动态加载内容，确保新加载的元素也能被隐藏
    const observeDynamicElements = () => {
        const observer = new MutationObserver(() => {
            if (window.location.pathname.startsWith('/video/')) {
                modifyVideoPage();
            } else if (window.location.pathname === '/') {
                simplifyHomePage();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    };

    // 根据当前页面类型执行相应逻辑
    if (window.location.pathname.startsWith('/video/')) {
        modifyVideoPage(); // 视频页面逻辑
    } else if (window.location.pathname === '/') {
        simplifyHomePage(); // 首页逻辑
    }

    // 修改全局样式
    modifyGlobalStyles();

    // 监听动态加载的元素
    observeDynamicElements();
})();
