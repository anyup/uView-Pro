export type ThemeType = 'primary' | 'info' | 'error' | 'warning' | 'success';

export type ImgMode = 'aspectFit' | 'aspectFill' | 'widthFix' | 'top' | 'bottom' | 'center' | 'scaleToFill';

export type Direction = 'horizontal' | 'vertical';

export type Sex = 'man' | 'woman';

export type Shape = 'circle' | 'square';
export type Effect = 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';

export type TextAlign = 'left' | 'center' | 'right';
export type JustifyType = 'start' | 'end' | 'center' | 'around' | 'between';
export type AlignType = 'top' | 'center' | 'bottom';
export type ScrollDirection = 'row' | 'column';
export type PlayState = 'play' | 'paused';
export type OptionType = { label: string; value: any };

// action-sheet 操作项类型
export type ActionSheetItem = {
    text: string;
    subText?: string;
    color?: string;
    fontSize?: string;
    disabled?: boolean;
};

// action-sheet 底部提示类型
export type ActionSheetTips = {
    text: string;
    color?: string;
    fontSize?: string;
};

// avatar-cropper 裁剪矩形框的样式
export type AvatarCropperBoundStyle = {
    lineWidth: number;
    borderColor: string;
    mask: string;
};
// badge 角标类型
export type BadgeSize = 'default' | 'mini';
// button 按钮类型
export type ButtonType = 'primary' | 'info' | 'error' | 'warning' | 'success' | 'default';
// button 按钮尺寸
export type ButtonSize = 'default' | 'medium' | 'mini';
// button 按钮 form-type
export type ButtonFormType = '' | 'submit' | 'reset';
// button 按钮 scope
export type ButtonScope = 'phoneNumber' | 'userInfo';
// button 按钮open-type
export type ButtonOpenType =
    | 'feedback'
    | 'share'
    | 'getUserInfo'
    | 'contact'
    | 'getPhoneNumber'
    | 'launchApp'
    | 'openSetting'
    | 'chooseAvatar'
    | 'getAuthorize'
    | 'lifestyle'
    | 'contactShare'
    | 'openGroupProfile'
    | 'openGuildProfile'
    | 'openPublicProfile'
    | 'shareMessageToFriend'
    | 'addFriend'
    | 'addColorSign'
    | 'addGroupApp'
    | 'addToFavorites'
    | 'chooseAddress'
    | 'chooseInvoiceTitle'
    | 'login'
    | 'subscribe'
    | 'favorite'
    | 'watchLater'
    | 'openProfile'
    | 'agreePrivacyAuthorization';

// calendar 组件 mode
export type CalendarMode = 'date' | 'range';
// CellItem 右侧箭头方向，可选值：right|up|down，默认为right
export type CellItemArrowDirection = 'right' | 'up' | 'down';

export type FormRuleItem = {
    required?: boolean;
    message?: string;
    trigger?: string | string[];
    min?: number;
    max?: number;
    pattern?: RegExp;
    type?: string;
    validator?: (rule: any, value: any, callback: any) => boolean;
    asyncValidator?: (rule: any, value: any, callback: any) => void;
};
export type FormRules = Record<string, FormRuleItem | FormRuleItem[]>;

export type InputType = 'text' | 'number' | 'idcard' | 'digit' | 'password' | 'textarea' | 'phone' | 'url' | 'email' | 'safe-password' | 'name' | 'bank-card' | 'tel' | 'select';

export type InputAlign = 'left' | 'center' | 'right';

export type InputConfirmType = 'send' | 'search' | 'next' | 'go' | 'done';

export type InputLabelPosition = 'left' | 'top';

export type FormErrorType = 'message' | 'border' | 'border-bottom' | 'none' | 'toast';

export type IconLabelPosition = 'left' | 'top' | 'right' | 'bottom';

export type LineDirection = 'row' | 'column';

export type LineBorderStyle = 'solid' | 'dashed' | 'dotted';

export type LoadmoreText = {
    loadmore: string;
    loading: string;
    nomore: string;
};

export type LoadmoreStatus = 'loadmore' | 'loading' | 'nomore';

export type LoadmoreIconType = 'circle' | 'flower';

export type MessageInputMode = 'box' | 'bottomLine' | 'middleLine';

export type NumberKeyboardMode = 'number' | 'card';

/**
 * PickerMode 选择器模式类型
 * 模式选择，region-地区类型，time-时间类型，selector-单列模式，multiSelector-多列模
 */
export type PickerMode = 'region' | 'time' | 'selector' | 'multiSelector';

/**
 * PickerParams 选择器参数类型
 */
export type PickerParams = {
    year?: boolean;
    month?: boolean;
    day?: boolean;
    hour?: boolean;
    minute?: boolean;
    second?: boolean;
    province?: boolean;
    city?: boolean;
    area?: boolean;
    timestamp?: boolean;
};

export type PopupMode = 'left' | 'right' | 'top' | 'bottom' | 'center';
export type PopupCloseIconPos = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// Row水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
export type RowJustify = 'start' | 'flex-start' | 'end' | 'flex-end' | 'center' | 'around' | 'space-around' | 'between' | 'space-between';
// Row垂直对齐方式，可选值为top、center、bottom
export type RowAlign = 'top' | 'center' | 'bottom';
// search 组件形状
export type SearchShape = 'round' | 'square';
// select 组件 mode single-column-单列，mutil-column-多列，mutil-column-auto-多列联动
export type SelectMode = 'single-column' | 'mutil-column' | 'mutil-column-auto';
// select 组件 list item
export type SelectListItem = {
    label: string;
    value: string | number;
    children?: SelectListItem[];
    extra?: any;
    [key: string]: any;
};
// Step 组件 mode
export type StepsListItem = {
    name: string;
    [key: string]: any;
};
// Step 组件 mode
export type StepMode = 'dot' | 'number';
// Step 组件 direction
export type StepDirection = 'row' | 'column';
// Subsection 组件 list item
export type SubsectionListItem = {
    name: string;
    width?: number;
    [key: string]: any;
};
// Subsection 组件 mode
export type SubsectionMode = 'button' | 'subsection';
// swipeAction 操作项类型
export type SwipeActionOption = {
    /** 按钮显示的文字 */
    text: string;
    /** 按钮自定义样式 */
    style?: Record<string, any>;
};
// swiper 组件 mode
export type SwiperMode = 'round' | 'dot' | 'rect' | 'number' | 'none';
// swiper 组件 indicatorPos
export type SwiperIndicatorPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
// tabs 组件 props
export type TabsItem = {
    [key: string]: any;
    name?: string | number;
    count?: string | number;
};
// tabs-swiper 组件 list item
export type TabsSwiperListItem = {
    [key: string]: any;
    name?: string | number;
    count?: string | number;
};
// tabs-swiper 组件 autoCenterMode
export type TabsSwiperAutoCenterMode = 'window';
// tag 组件 mode
export type TagMode = 'light' | 'dark' | 'plain';
// tag 组件 shape
export type TagShape = 'square' | 'circle' | 'circleLeft' | 'circleRight';
// tag 组件 size
export type TagSize = 'default' | 'mini' | 'medium';
// toast 组件 position
export type ToastPosition = 'top' | 'center' | 'bottom';
export type UploadSizeType = 'original' | 'compressed';
export type UploadSourceType = 'album' | 'camera';
// 自定义主题色
export type ThemeColor = Partial<{
    primary: string;
    primaryDark: string;
    primaryDisabled: string;
    primaryLight: string;
    bgColor: string;
    info: string;
    infoDark: string;
    infoDisabled: string;
    infoLight: string;
    warning: string;
    warningDark: string;
    warningDisabled: string;
    warningLight: string;
    error: string;
    errorDark: string;
    errorDisabled: string;
    errorLight: string;
    success: string;
    successDark: string;
    successDisabled: string;
    successLight: string;
    mainColor: string;
    contentColor: string;
    tipsColor: string;
    lightColor: string;
    borderColor: string;
}>;

export interface UViewProOptions {
    theme?: ThemeColor;
    // 可扩展更多配置项
}
