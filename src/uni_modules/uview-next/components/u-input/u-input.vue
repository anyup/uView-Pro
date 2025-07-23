<template>
  <view
    class="u-input"
    :class="{
      'u-input--border': border,
      'u-input--error': validateState
    }"
    :style="{
      padding: `0 ${border ? 20 : 0}rpx`,
      borderColor: borderColor,
      textAlign: inputAlign
    }"
    @tap.stop="inputClick"
  >
    <textarea
      v-if="type == 'textarea'"
      class="u-input__input u-input__textarea"
      :style="getStyle"
      :value="defaultValue"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :disabled="disabled"
      :maxlength="inputMaxlength"
      :fixed="fixed"
      :focus="focus"
      :autoHeight="autoHeight"
      :selection-end="uSelectionEnd"
      :selection-start="uSelectionStart"
      :cursor-spacing="getCursorSpacing"
      :show-confirm-bar="showConfirmbar"
      :adjust-position="adjustPosition"
      @input="handleInput"
      @blur="handleBlur"
      @focus="onFocus"
      @confirm="onConfirm"
    />
    <input
      v-else
      class="u-input__input"
      :type="type == 'password' ? 'text' : type"
      :style="getStyle"
      :value="defaultValue"
      :password="type == 'password' && !showPassword"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :disabled="disabled || type === 'select'"
      :maxlength="inputMaxlength"
      :focus="focus"
      :confirmType="confirmType"
      :cursor-spacing="getCursorSpacing"
      :selection-end="uSelectionEnd"
      :selection-start="uSelectionStart"
      :show-confirm-bar="showConfirmbar"
      :adjust-position="adjustPosition"
      @focus="onFocus"
      @blur="handleBlur"
      @input="handleInput"
      @confirm="onConfirm"
    />
    <view class="u-input__right-icon u-flex">
      <view
        class="u-input__right-icon__clear u-input__right-icon__item"
        @tap="onClear"
        v-if="clearable && modelValue != '' && focused"
      >
        <u-icon size="32" name="close-circle-fill" color="#c0c4cc" />
      </view>
      <view class="u-input__right-icon__clear u-input__right-icon__item" v-if="passwordIcon && type == 'password'">
        <u-icon
          size="32"
          :name="!showPassword ? 'eye' : 'eye-fill'"
          color="#c0c4cc"
          @click="showPassword = !showPassword"
        />
      </view>
      <view
        class="u-input__right-icon--select u-input__right-icon__item"
        v-if="type == 'select'"
        :class="{
          'u-input__right-icon--select--reverse': selectOpen
        }"
      >
        <u-icon name="arrow-down-fill" size="26" color="#c0c4cc"></u-icon>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits, getCurrentInstance } from 'vue'
import { $u } from '../..'
import { dispatch } from '../../libs/util/emitter'

/**
 * input 输入框
 * @description 此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件u-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。
 * @tutorial http://uviewui.com/components/input.html
 * @property {String} type 模式选择，见官网说明
 * @property {Boolean} clearable 是否显示右侧的清除图标(默认true)
 * @property {} v-model 用于双向绑定输入框的值
 * @property {String} input-align 输入框文字的对齐方式(默认left)
 * @property {String} placeholder placeholder显示值(默认 '请输入内容')
 * @property {Boolean} disabled 是否禁用输入框(默认false)
 * @property {String Number} maxlength 输入框的最大可输入长度(默认140)
 * @property {String Number} selection-start 光标起始位置，自动聚焦时有效，需与selection-end搭配使用（默认-1）
 * @property {String Number} maxlength 光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认-1）
 * @property {String Number} cursor-spacing 指定光标与键盘的距离，单位px(默认0)
 * @property {String} placeholderStyle placeholder的样式，字符串形式，如"color: red;"(默认 "color: #c0c4cc;")
 * @property {String} confirm-type 设置键盘右下角按钮的文字，仅在type为text时生效(默认done)
 * @property {Object} custom-style 自定义输入框的样式，对象形式
 * @property {Boolean} focus 是否自动获得焦点(默认false)
 * @property {Boolean} fixed 如果type为textarea，且在一个"position:fixed"的区域，需要指明为true(默认false)
 * @property {Boolean} password-icon type为password时，是否显示右侧的密码查看图标(默认true)
 * @property {Boolean} border 是否显示边框(默认false)
 * @property {String} border-color 输入框的边框颜色(默认#dcdfe6)
 * @property {Boolean} auto-height 是否自动增高输入区域，type为textarea时有效(默认true)
 * @property {String Number} height 高度，单位rpx(text类型时为70，textarea时为100)
 * @example <u-input v-model="value" :type="type" :border="border" />
 */

const props = defineProps({
  /**
   * 用于双向绑定输入框的值
   */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /**
   * 输入框的类型，textarea，text，number
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * 输入框文字的对齐方式(默认left)
   */
  inputAlign: {
    type: String,
    default: 'left'
  },
  /**
   * placeholder显示值(默认 '请输入内容')
   */
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  /**
   * 是否禁用输入框(默认false)
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 输入框的最大可输入长度(默认140)
   */
  maxlength: {
    type: [Number, String],
    default: 140
  },
  /**
   * placeholder的样式，字符串形式，如"color: red;"(默认 "color: #c0c4cc;")
   */
  placeholderStyle: {
    type: String,
    default: 'color: #c0c4cc;'
  },
  /**
   * 设置键盘右下角按钮的文字，仅在type为text时生效(默认done)
   */
  confirmType: {
    type: String,
    default: 'done'
  },
  /**
   * 自定义输入框的样式，对象形式
   */
  customStyle: {
    type: Object,
    default: () => ({})
  },
  /**
   * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   */
  fixed: {
    type: Boolean,
    default: false
  },
  /**
   * 是否自动获得焦点(默认false)
   */
  focus: {
    type: Boolean,
    default: false
  },
  /**
   * 密码类型时，是否显示右侧的密码图标(默认true)
   */
  passwordIcon: {
    type: Boolean,
    default: true
  },
  /**
   * input|textarea是否显示边框(默认false)
   */
  border: {
    type: Boolean,
    default: false
  },
  /**
   * 输入框的边框颜色(默认#dcdfe6)
   */
  borderColor: {
    type: String,
    default: '#dcdfe6'
  },
  /**
   * 是否自动增高输入区域，type为textarea时有效(默认true)
   */
  autoHeight: {
    type: Boolean,
    default: true
  },
  /**
   * type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
   * open-打开，close-关闭
   */
  selectOpen: {
    type: Boolean,
    default: false
  },
  /**
   * 高度，单位rpx
   */
  height: {
    type: [Number, String],
    default: ''
  },
  /**
   * 是否可清空(默认true)
   */
  clearable: {
    type: Boolean,
    default: true
  },
  /**
   * 指定光标与键盘的距离，单位 px(默认0)
   */
  cursorSpacing: {
    type: [Number, String],
    default: 0
  },
  /**
   * 光标起始位置，自动聚焦时有效，需与selection-end搭配使用（默认-1）
   */
  selectionStart: {
    type: [Number, String],
    default: -1
  },
  /**
   * 光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认-1）
   */
  selectionEnd: {
    type: [Number, String],
    default: -1
  },
  /**
   * 是否自动去除两端的空格(默认true)
   */
  trim: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示键盘上方带有”完成“按钮那一栏(默认true)
   */
  showConfirmbar: {
    type: Boolean,
    default: true
  },
  /**
   * 弹出键盘时是否自动调节高度，uni-app默认值是true
   */
  adjustPosition: {
    type: Boolean,
    default: true
  },
  /**
   * 输入框的验证状态，用于错误时，边框是否改为红色
   */
  validateState: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'confirm', 'click'])

const defaultValue = ref(props.modelValue)
const inputHeight = 70 // input的高度
const textareaHeight = 100 // textarea的高度
const validateState = ref(props.validateState) // 当前input的验证状态，用于错误时，边框是否改为红色
const focused = ref(false) // 当前是否处于获得焦点的状态
const showPassword = ref(false) // 是否预览密码
const lastValue = ref('') // 用于头条小程序，判断@input中，前后的值是否发生了变化

// 监听 value 变化
watch(
  () => props.modelValue,
  (nVal, oVal) => {
    defaultValue.value = nVal
    // 当值发生变化，且为select类型时(此时input被设置为disabled，不会触发@input事件)，模拟触发@input事件
    if (nVal != oVal && props.type == 'select') handleInput({ detail: { value: nVal } })
  }
)

// 监听 validateState 变化
watch(
  () => props.validateState,
  val => {
    validateState.value = val
  }
)

// 计算属性
const inputMaxlength = computed(() => Number(props.maxlength))

const getStyle = computed(() => {
  let style: Record<string, any> = {}
  // 如果没有自定义高度，就根据type为input还是textarea来分配一个默认的高度
  style.minHeight = props.height
    ? props.height + 'rpx'
    : props.type == 'textarea'
    ? `${textareaHeight}rpx`
    : `${inputHeight}rpx`
  style = Object.assign(style, props.customStyle)
  return style
})
const getCursorSpacing = computed(() => Number(props.cursorSpacing))
// 光标起始位置
const uSelectionStart = computed(() => String(props.selectionStart))
// 光标结束位置
const uSelectionEnd = computed(() => String(props.selectionEnd))

// 事件派发工具
const instance = getCurrentInstance()

// 监听u-form-item发出的错误事件，将输入框边框变红色，失效了
// uni.$on('on-form-item-error', onFormItemError);
/**
 * change 事件
 * @param event
 */
function handleInput(event: any) {
  let value = event.detail.value
  // 判断是否去除空格
  if (props.trim) value = $u.trim(value)
  // vue 原生的方法 return 出去
  emit('update:modelValue', value)
  // 当前model 赋值
  defaultValue.value = value
  // 过一个生命周期再发送事件给u-form-item，否则this.$emit('update:modelValue')更新了父组件的值，但是微信小程序上
  // 尚未更新到u-form-item，导致获取的值为空，从而校验混论
  // 这里不能延时时间太短，或者使用this.$nextTick，否则在头条上，会造成混乱
  setTimeout(() => {
    // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
    // #ifdef MP-TOUTIAO
    if ($u.trim(value) == lastValue.value) return
    lastValue.value = value
    // #endif
    // 通过 emitter 派发事件
    dispatch(instance, 'u-form-item', 'on-form-change', value)
  }, 40)
}

/**
 * blur 事件
 * @param event
 */
function handleBlur(event: any) {
  // 最开始使用的是监听图标@touchstart事件，自从hx2.8.4后，此方法在微信小程序出错
  // 这里改为监听点击事件，手点击清除图标时，同时也发生了@blur事件，导致图标消失而无法点击，这里做一个延时
  let value = event.detail.value
  setTimeout(() => {
    focused.value = false
  }, 100)
  // vue 原生的方法 return 出去
  emit('blur', value)
  setTimeout(() => {
    // 头条小程序由于自身bug，导致中文下，每按下一个键(尚未完成输入)，都会触发一次@input，导致错误，这里进行判断处理
    // #ifdef MP-TOUTIAO
    if ($u.trim(value) == lastValue.value) return
    lastValue.value = value
    // #endif
    dispatch(instance, 'u-form-item', 'on-form-blur', value)
  }, 40)
}

function onFormItemError(status: boolean) {
  console.log('onFormItemError', status)
	validateState.value = status;
}

function onFocus(event: any) {
  focused.value = true
  emit('focus')
}

function onConfirm(e: any) {
  emit('confirm', e.detail.value)
}

function onClear(event: any) {
  emit('update:modelValue', '')
}

function inputClick() {
  emit('click')
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/style.components.scss';

.u-input {
  position: relative;
  flex: 1;
  @include vue-flex;

  &__input {
    //height: $u-form-item-height;
    font-size: 28rpx;
    color: $u-main-color;
    flex: 1;
  }

  &__textarea {
    width: auto;
    font-size: 28rpx;
    color: $u-main-color;
    padding: 10rpx 0;
    line-height: normal;
    flex: 1;
  }

  &--border {
    border-radius: 6rpx;
    border-radius: 4px;
    border: 1px solid $u-form-item-border-color;
  }

  &--error {
    border-color: $u-type-error !important;
  }

  &__right-icon {
    &__item {
      margin-left: 10rpx;
    }
    &--select {
      transition: transform 0.4s;
      &--reverse {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>
