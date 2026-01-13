function getCurrentPageUrl() {
    const pages = getCurrentPages();
    // 页面栈中的最后一个即为项为当前页面，route属性为页面路径
    const pageUrl = pages[pages.length - 1].route as string;
    return `/${pageUrl}`;
}

export default {
    // 发送给朋友
    onShareAppMessage(res) {
        return {
            title: 'uView Pro',
            desc: '多平台快速开发 UI 组件库',
            path: getCurrentPageUrl()
        };
    },
    //分享到朋友圈
    onShareTimeline(res) {
        return {
            title: 'uView Pro',
            desc: '多平台快速开发 UI 组件库',
            path: getCurrentPageUrl()
        };
    }
};
