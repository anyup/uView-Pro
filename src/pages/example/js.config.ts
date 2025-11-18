export default [
    {
        groupName: '网络',
        groupName_en: 'Network',
        icon: 'network',
        list: [
            {
                path: 'http',
                icon: 'http',
                title: 'Http 请求',
                title_en: 'Http',
                desc: '统一封装的网络请求，支持拦截器和全局配置',
                desc_en: 'Unified network request wrapper supporting interceptors and global configuration'
            }
        ]
    },
    {
        groupName: '工具库',
        groupName_en: 'Tool library',
        icon: 'tools',
        list: [
            {
                path: 'debounce',
                icon: 'throttle',
                title: 'Throttle | Debounce 节流防抖',
                title_en: 'Throttle | Debounce',
                desc: '高频事件优化，防止重复触发',
                desc_en: 'Optimizes high-frequency events to prevent repeated triggers'
            },
            {
                path: 'deepMerge',
                icon: 'merge',
                title: 'DeepMerge 对象深度合并',
                title_en: 'DeepMerge',
                desc: '对象深度合并，常用于配置和主题',
                desc_en: 'Deep merge objects, commonly used for configuration and themes'
            },
            {
                path: 'deepClone',
                icon: 'clone',
                title: 'DeepClone 对象深度克隆',
                title_en: 'DeepClone',
                desc: '对象/数组深度克隆，避免引用混乱',
                desc_en: 'Deep clone objects/arrays to avoid reference issues'
            },
            {
                path: 'timeFormat',
                icon: 'time',
                title: 'TimeFormat 时间格式化',
                title_en: 'TimeFormat',
                desc: '时间格式化，支持多种格式',
                desc_en: 'Time formatting, supports multiple formats'
            },
            {
                path: 'timeFrom',
                icon: 'from',
                title: 'TimeFrom 多久之前',
                title_en: 'TimeFrom',
                desc: '多久之前，友好时间显示',
                desc_en: "Friendly 'time ago' display"
            },
            {
                path: 'guid',
                icon: 'id',
                title: 'Guid 全局唯一id',
                title_en: 'Guid',
                desc: '全局唯一 id 生成',
                desc_en: 'Generate globally unique IDs'
            },
            {
                path: 'route',
                icon: 'route',
                title: 'Route 路由跳转',
                title_en: 'Route',
                desc: '页面路由跳转，参数传递',
                desc_en: 'Page navigation and parameter passing'
            },
            {
                path: 'randomArray',
                icon: 'array',
                title: 'RandomArray 数组乱序',
                title_en: 'RandomArray',
                desc: '数组乱序，抽奖/洗牌',
                desc_en: 'Shuffle arrays, useful for lotteries/shuffling'
            },
            {
                path: 'colorSwitch',
                icon: 'switch',
                title: 'ColorSwitch 颜色转换',
                title_en: 'ColorSwitch',
                desc: '颜色值格式转换 HEX/RGB/HSL',
                desc_en: 'Color value format conversion between HEX/RGB/HSL'
            },
            {
                path: 'color',
                icon: 'color',
                title: 'Color 颜色值',
                title_en: 'Color',
                desc: '主题色、辅助色获取',
                desc_en: 'Retrieve theme and auxiliary colors'
            },
            {
                path: 'queryParams',
                icon: 'params',
                title: 'QueryParams 对象转URL参数',
                title_en: 'QueryParams',
                desc: '对象转 URL 参数字符串',
                desc_en: 'Convert objects to URL query strings'
            },
            {
                path: 'test',
                icon: 'test',
                title: 'Test 规则校验',
                title_en: 'Test',
                desc: '表单/数据规则校验',
                desc_en: 'Form/data validation rules'
            },
            {
                path: 'md5',
                icon: 'md5',
                title: 'Md5 md5加密',
                title_en: 'Md5',
                desc: 'md5 加密/签名',
                desc_en: 'MD5 hashing/signing'
            },
            {
                path: 'random',
                icon: 'random',
                title: 'Random 随机数值',
                title_en: 'Random',
                desc: '生成随机数',
                desc_en: 'Generate random numbers'
            },
            {
                path: 'trim',
                icon: 'trim',
                title: 'Trim 去除空格',
                title_en: 'Trim',
                desc: '去除字符串空格',
                desc_en: 'Trim whitespace from strings'
            },
            {
                path: 'getRect',
                icon: 'rect',
                title: 'GetRect 节点信息',
                title_en: 'GetRect',
                desc: '获取节点尺寸/位置信息',
                desc_en: 'Get node size and position information'
            },
            {
                path: 'mpShare',
                icon: 'share',
                title: 'MpShare 小程序分享',
                title_en: 'MpShare',
                desc: '小程序分享能力',
                desc_en: 'Mini Program sharing capability'
            }
        ]
    }
];
