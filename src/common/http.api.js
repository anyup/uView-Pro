// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let hotSearchUrl = '/ebapi/store_api/hot_search';
let indexUrl = '/ebapi/public_api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewpro.cn/zh/tools/http.html
const install = (Vue, vm) => {
    // 此处没有使用传入的params参数
    let getSearch = (params = {}) =>
        vm.$u.get(hotSearchUrl, {
            id: 2
        });

    // 此处使用了传入的params参数，一切自定义即可
    let getInfo = (params = {}) => vm.$u.post(indexUrl, params);

    // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
    vm.$u.api = { getSearch, getInfo };
};

export default {
    install
};
