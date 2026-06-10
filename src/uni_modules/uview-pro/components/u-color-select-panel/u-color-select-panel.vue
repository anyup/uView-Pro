<template>
    <view class="u-color-select-panel" :class="[customClass]" :style="$u.toStyle(customStyle)">
        <!-- Tabs -->
        <view v-if="colorMode === 'both'" class="u-color-select-panel__tabs">
            <view
                class="u-color-select-panel__tab-item"
                :class="{ 'u-color-select-panel__tab-item--active': colorType === 'solid' }"
                @tap="colorType = 'solid'"
            >
                {{ t('uColorSelectPanel.solid') }}
            </view>
            <view
                class="u-color-select-panel__tab-item"
                :class="{ 'u-color-select-panel__tab-item--active': colorType === 'gradient' }"
                @tap="colorType = 'gradient'"
            >
                {{ t('uColorSelectPanel.gradient') }}
            </view>
        </view>

        <!-- Gradient Bar (Only in Gradient Mode) -->
        <view v-if="colorType === 'gradient'" class="u-color-select-panel__gradient-bar-wrapper">
            <view class="u-color-select-panel__gradient-bg" />
            <view
                id="u-color-select-panel__gradient-bar"
                class="u-color-select-panel__gradient-bar"
                :style="{ background: gradientString }"
                @touchstart.stop.prevent="onGradientTouchStart"
                @touchmove.stop.prevent="onGradientTouchMove"
            >
                <view
                    v-for="(stop, index) in gradientStops"
                    :key="index"
                    class="u-color-select-panel__gradient-stop"
                    :style="{ left: `${stop.offset * 100}%`, backgroundColor: stop.color }"
                    :class="{ 'u-color-select-panel__gradient-stop--active': activeGradientIndex === index }"
                    @tap.stop="selectGradientStop(index)"
                />
            </view>
        </view>

        <!-- SV Box -->
        <view
            id="u-color-select-panel__sv-box"
            class="u-color-select-panel__sv-box"
            :style="{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }"
            @touchstart.stop.prevent="onSvTouchStart"
            @touchmove.stop.prevent="onSvTouchMove"
        >
            <view class="u-color-select-panel__sv-white" />
            <view class="u-color-select-panel__sv-black" />
            <view
                class="u-color-select-panel__sv-cursor"
                :style="{
                    top: `${(1 - hsv.v) * 100}%`,
                    left: `${hsv.s * 100}%`
                }"
            />
        </view>

        <!-- Middle Row -->
        <view class="u-color-select-panel__middle-row">
            <!-- Sliders -->
            <view class="u-color-select-panel__sliders-col">
                <view id="u-color-select-panel__hue-slider" class="u-color-select-panel__slider-wrapper">
                    <view
                        class="u-color-select-panel__hue-bar"
                        @touchstart.stop.prevent="onHueTouchStart"
                        @touchmove.stop.prevent="onHueTouchMove"
                    >
                        <view class="u-color-select-panel__slider-thumb" :style="{ left: `${(hsv.h / 360) * 100}%` }" />
                    </view>
                </view>
                <view
                    v-if="showAlpha"
                    id="u-color-select-panel__alpha-slider"
                    class="u-color-select-panel__slider-wrapper"
                >
                    <view class="u-color-select-panel__alpha-bg" />
                    <view
                        class="u-color-select-panel__alpha-bar"
                        :style="{
                            background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b},0), rgba(${rgb.r},${rgb.g},${rgb.b},1))`
                        }"
                        @touchstart.stop.prevent="onAlphaTouchStart"
                        @touchmove.stop.prevent="onAlphaTouchMove"
                    >
                        <view class="u-color-select-panel__slider-thumb" :style="{ left: `${hsv.a * 100}%` }" />
                    </view>
                </view>
            </view>
            <!-- Preview Block -->
            <view class="u-color-select-panel__preview-block" :style="{ background: previewColor }" />
        </view>

        <!-- Input Row -->
        <view class="u-color-select-panel__input-row">
            <!-- Format Dropdown -->
            <view class="u-color-select-panel__format-selector">
                <view class="u-color-select-panel__format-current" @tap.stop="showFormatDropdown = !showFormatDropdown">
                    <text>{{ colorFormat }}</text>
                    <u-icon
                        name="arrow-down"
                        size="24"
                        color="var(--u-main-color)"
                        :custom-style="{
                            marginLeft: '4rpx',
                            transform: showFormatDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s'
                        }"
                    />
                </view>
                <view v-if="showFormatDropdown" class="u-color-select-panel__format-dropdown">
                    <view
                        v-for="fmt in ['HEX', 'RGB']"
                        :key="fmt"
                        class="u-color-select-panel__format-option"
                        :class="{ 'u-color-select-panel__format-option--active': colorFormat === fmt }"
                        @tap="selectFormat(fmt as 'HEX' | 'RGB')"
                    >
                        {{ fmt }}
                    </view>
                </view>
            </view>

            <!-- Color Input -->
            <view class="u-color-select-panel__input-container">
                <text v-if="colorFormat === 'HEX'" class="u-color-select-panel__input-prefix"> # </text>
                <input
                    v-model="displayColorValue"
                    class="u-color-select-panel__hex-input"
                    @blur="onColorInputBlur"
                    @confirm="onColorInputBlur"
                />
            </view>

            <!-- Alpha Input -->
            <view v-if="showAlpha" class="u-color-select-panel__alpha-control">
                <view class="u-color-select-panel__alpha-btn" @tap="adjustAlpha(-5)">
                    <u-icon name="minus" size="20" color="var(--u-main-color)" />
                </view>
                <view class="u-color-select-panel__alpha-input-wrapper">
                    <input
                        v-model="alphaInputValue"
                        class="u-color-select-panel__alpha-input"
                        type="number"
                        :maxlength="3"
                        @blur="onAlphaInputBlur"
                        @confirm="onAlphaInputBlur"
                    />
                    <text class="u-color-select-panel__alpha-percent"> % </text>
                </view>
                <view class="u-color-select-panel__alpha-btn" @tap="adjustAlpha(5)">
                    <u-icon name="plus" size="20" color="var(--u-main-color)" />
                </view>
            </view>

            <!-- EyeDropper -->
            <view
                v-if="showEyeDropper && isEyeDropperSupported"
                class="u-color-select-panel__eyedropper-btn"
                @tap="openEyeDropper"
            >
                <u-icon name="edit-pen" size="36" color="var(--u-main-color)" />
            </view>
        </view>

        <!-- Recent Colors -->
        <view v-if="showHistory && recentColors.length" class="u-color-select-panel__presets">
            <text class="u-color-select-panel__section-title"> {{ t('uColorSelectPanel.recentColors') }} </text>
            <view class="u-color-select-panel__swatches-grid">
                <view
                    v-for="(color, index) in recentColors"
                    :key="`recent-${index}`"
                    class="u-color-select-panel__swatch"
                    :style="{ background: color }"
                    @tap="selectSwatch(color)"
                />
            </view>
        </view>

        <!-- System Presets -->
        <view v-if="showPresets && presets && presets.length" class="u-color-select-panel__presets">
            <text class="u-color-select-panel__section-title"> {{ t('uColorSelectPanel.systemPresets') }} </text>
            <view class="u-color-select-panel__swatches-grid">
                <view
                    v-for="(color, index) in presets"
                    :key="index"
                    class="u-color-select-panel__swatch"
                    :style="{ backgroundColor: color }"
                    @tap="selectSwatch(color)"
                />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
export default {
    name: 'u-color-select-panel',
    options: {
        addGlobalClass: true,
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif
        styleIsolation: 'shared'
    }
};
</script>

<script setup lang="ts">
import type { ColorObject } from './types';
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { $u, useLocale } from '../..';
import { ColorSelectPanelProps } from './types';

/**
 * color-select-panel 颜色选择面板
 * @description 颜色选择面板组件，支持单色和渐变色选择、透明度调节、吸管取色、历史记录和预设颜色
 * @tutorial https://uviewpro.cn/zh/components/color-select-panel.html
 * @property {String} modelValue 绑定的颜色值（默认#000000）
 * @property {'solid' | 'gradient' | 'both'} colorMode 颜色模式（默认both）
 * @property {Boolean} showAlpha 是否显示透明度（默认true）
 * @property {Boolean} showEyeDropper 是否显示吸管（默认true）
 * @property {Boolean} showHistory 是否显示历史记录（默认true）
 * @property {Boolean} showPresets 是否显示预设颜色（默认true）
 * @property {Array} presets 预设颜色列表
 * @property {'HEX' | 'RGB'} format 颜色格式（默认HEX）
 * @property {Boolean} disabled 是否禁用
 * @event update:modelValue 颜色值变化时触发
 * @event change 颜色变化时触发
 * @event color-update 颜色更新时触发
 * @example <u-color-select-panel v-model="color" />
 */
const { t } = useLocale();
const props = defineProps(ColorSelectPanelProps);
const emit = defineEmits(['update:modelValue', 'change', 'color-update']);
const instance = getCurrentInstance();

// --- State ---
const colorType = ref<'solid' | 'gradient'>('solid');
const colorFormat = ref<'HEX' | 'RGB'>(props.format || 'HEX');
const showFormatDropdown = ref(false);
const tempColor = ref(props.modelValue || '#000000');
const hsv = reactive({ h: 0, s: 0, v: 0, a: 1 });
const rgb = reactive({ r: 0, g: 0, b: 0 });
const isEyeDropperSupported = ref(false);
const recentColors = ref<string[]>([]);
const STORAGE_KEY = 'u-color-picker-recent';

// Gradient State
const gradientStops = ref<{ offset: number; color: string }[]>([
    { offset: 0, color: '#ffffff' },
    { offset: 1, color: '#000000' }
]);
const activeGradientIndex = ref(0);
const gradientRect = ref({ left: 0, top: 0, width: 0, height: 0 });

// Rect info
const svRect = ref({ left: 0, top: 0, width: 0, height: 0 });
const hueRect = ref({ left: 0, top: 0, width: 0, height: 0 });
const alphaRect = ref({ left: 0, top: 0, width: 0, height: 0 });

// --- Computed ---
const gradientString = computed(() => {
    const stops = [...gradientStops.value].sort((a, b) => a.offset - b.offset);
    const stopsStr = stops.map(s => `${s.color} ${Math.round(s.offset * 100)}%`).join(', ');
    return `linear-gradient(90deg, ${stopsStr})`;
});

const previewColor = computed(() => {
    return colorType.value === 'solid' ? tempColor.value : gradientString.value;
});

const displayColorValue = ref('');
const alphaInputValue = ref('100');

// --- Logic ---

// Hex to RGB
function hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    return result
        ? {
              r: Number.parseInt(result[1], 16),
              g: Number.parseInt(result[2], 16),
              b: Number.parseInt(result[3], 16),
              a: result[4] ? Number.parseFloat((Number.parseInt(result[4], 16) / 255).toFixed(2)) : 1
          }
        : { r: 0, g: 0, b: 0, a: 1 };
}

// RGB to Hex
function rgbToHex(r: number, g: number, b: number, a: number = 1) {
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    if (a < 1) {
        const alpha = Math.round(a * 255)
            .toString(16)
            .padStart(2, '0');
        return hex + alpha;
    }
    return hex;
}

// RGB to HSV
function rgbToHsv(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s;
    const v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h * 360, s, v };
}

// HSV to RGB
function hsvToRgb(h: number, s: number, v: number) {
    let r, g, b;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            r = g = b = 0;
            break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function updateDisplayValue() {
    alphaInputValue.value = Math.round(hsv.a * 100).toString();
    if (colorFormat.value === 'HEX') {
        displayColorValue.value = tempColor.value.replace('#', '').toUpperCase();
    } else {
        displayColorValue.value = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${hsv.a})`;
    }
}

function updateColorFromHsv() {
    const { r, g, b } = hsvToRgb(hsv.h, hsv.s, hsv.v);
    rgb.r = r;
    rgb.g = g;
    rgb.b = b;
    const hex = rgbToHex(r, g, b, hsv.a);
    tempColor.value = hex;

    // Update Gradient Stop
    if (colorType.value === 'gradient') {
        gradientStops.value[activeGradientIndex.value].color = hex;
        const finalColor = gradientString.value;
        emit('change', finalColor);
        emit('color-update', finalColor);
        emit('update:modelValue', finalColor);
    } else {
        emit('change', hex);
        emit('color-update', hex);
        emit('update:modelValue', hex);
    }
    updateDisplayValue();
}

function initColor(val: string) {
    if (!val) return;

    // Check if gradient
    if (val.includes('gradient')) {
        colorType.value = 'gradient';
        try {
            const stopsMatch = val.match(/linear-gradient\([^,]+,\s*(.+)\)/);
            if (stopsMatch && stopsMatch[1]) {
                const stops = stopsMatch[1].split(',').map((s: string) => s.trim());
                gradientStops.value = stops.map(s => {
                    const parts = s.split(/\s+/);
                    const color = parts[0];
                    const offsetStr = parts[1] || '0%';
                    const offset = Number.parseFloat(offsetStr) / 100;
                    return { color, offset };
                });
                // Activate first stop
                activeGradientIndex.value = 0;
                parseSolidColor(gradientStops.value[0].color);
            }
        } catch (e) {
            console.error('Gradient parse error', e);
        }
    } else {
        // Only switch to solid if mode supports it
        if (props.colorMode !== 'gradient') {
            colorType.value = 'solid';
        }
        parseSolidColor(val);
    }
}

function parseSolidColor(val: string) {
    let hex = val;
    let alpha = 1;
    let r = 0;
    let g = 0;
    let b = 0;

    if (val.startsWith('rgb')) {
        const parts = val.match(/[\d.]+/g);
        if (parts && parts.length >= 3) {
            r = Number.parseInt(parts[0]);
            g = Number.parseInt(parts[1]);
            b = Number.parseInt(parts[2]);
            if (parts.length >= 4) alpha = Number.parseFloat(parts[3]);
            hex = rgbToHex(r, g, b, alpha);
        }
    } else {
        const rgbVal = hexToRgb(val);
        r = rgbVal.r;
        g = rgbVal.g;
        b = rgbVal.b;
        alpha = rgbVal.a;
    }

    tempColor.value = hex;
    rgb.r = r;
    rgb.g = g;
    rgb.b = b;
    const hsvVal = rgbToHsv(r, g, b);
    hsv.h = hsvVal.h;
    hsv.s = hsvVal.s;
    hsv.v = hsvVal.v;
    hsv.a = alpha;

    updateDisplayValue();
}

function selectFormat(fmt: 'HEX' | 'RGB') {
    colorFormat.value = fmt;
    showFormatDropdown.value = false;
    updateDisplayValue();
}

function onColorInputBlur() {
    let val = displayColorValue.value;
    if (colorFormat.value === 'HEX') {
        if (!val.startsWith('#')) val = `#${val}`;
        if (/^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{8}$/i.test(val)) {
            parseSolidColor(val);
            updateColorFromHsv();
        }
    } else {
        parseSolidColor(val);
        updateColorFromHsv();
    }
}

function onAlphaInputBlur() {
    let val = Number.parseFloat(alphaInputValue.value);
    if (Number.isNaN(val)) val = 100;
    val = Math.max(0, Math.min(100, val));
    hsv.a = val / 100;
    updateColorFromHsv();
}

function adjustAlpha(step: number) {
    let val = Math.round(hsv.a * 100) + step;
    val = Math.max(0, Math.min(100, val));
    hsv.a = val / 100;
    updateColorFromHsv();
}

// --- Gradient Logic ---

function selectGradientStop(index: number) {
    if (props.disabled) return;
    activeGradientIndex.value = index;
    parseSolidColor(gradientStops.value[index].color);
}

function onGradientTouchStart(e: TouchEvent) {
    if (props.disabled) return;
    getRects().then(() => {
        // Check if we hit a stop
        if (!gradientRect.value.width) return;
        const touch = e.touches[0];
        const x = touch.clientX - gradientRect.value.left;
        const width = gradientRect.value.width;

        // Find nearest stop
        let minDist = Infinity;
        let nearestIndex = -1;

        gradientStops.value.forEach((stop, index) => {
            const stopX = stop.offset * width;
            const dist = Math.abs(x - stopX);
            if (dist < minDist) {
                minDist = dist;
                nearestIndex = index;
            }
        });

        // Threshold (e.g. 30px)
        if (minDist < 30 && nearestIndex !== -1) {
            activeGradientIndex.value = nearestIndex;
            parseSolidColor(gradientStops.value[nearestIndex].color);
        }

        handleGradientTouch(e);
    });
}

function onGradientTouchMove(e: TouchEvent) {
    if (props.disabled) return;
    handleGradientTouch(e);
}

function handleGradientTouch(e: TouchEvent) {
    if (!gradientRect.value.width) return;
    const touch = e.touches[0];
    let x = touch.clientX - gradientRect.value.left;
    x = Math.max(0, Math.min(x, gradientRect.value.width));
    const offset = x / gradientRect.value.width;

    gradientStops.value[activeGradientIndex.value].offset = Number.parseFloat(offset.toFixed(2));
    updateColorFromHsv();
}

// --- Touch Handling ---

function getRects() {
    return new Promise<void>(resolve => {
        const query = uni.createSelectorQuery().in(instance);
        const svId = '#u-color-select-panel__sv-box';
        const hueId = '#u-color-select-panel__hue-slider';
        const alphaId = '#u-color-select-panel__alpha-slider';
        const gradientId = '#u-color-select-panel__gradient-bar';

        query
            .select(svId)
            .boundingClientRect(data => {
                if (data) svRect.value = data as any;
            })
            .select(hueId)
            .boundingClientRect(data => {
                if (data) hueRect.value = data as any;
            })
            .select(alphaId)
            .boundingClientRect(data => {
                if (data) alphaRect.value = data as any;
            })
            .select(gradientId)
            .boundingClientRect(data => {
                if (data) gradientRect.value = data as any;
                resolve();
            })
            .exec();
    });
}

function onSvTouchStart(e: TouchEvent) {
    if (props.disabled) return;
    getRects().then(() => {
        handleSvTouch(e);
    });
}

function onSvTouchMove(e: TouchEvent) {
    if (props.disabled) return;
    handleSvTouch(e);
}

function handleSvTouch(e: TouchEvent) {
    if (!svRect.value.width) return;
    const touch = e.touches[0];
    let x = touch.clientX - svRect.value.left;
    let y = touch.clientY - svRect.value.top;

    x = Math.max(0, Math.min(x, svRect.value.width));
    y = Math.max(0, Math.min(y, svRect.value.height));

    hsv.s = x / svRect.value.width;
    hsv.v = 1 - y / svRect.value.height;

    updateColorFromHsv();
}

function onHueTouchStart(e: TouchEvent) {
    if (props.disabled) return;
    getRects().then(() => {
        handleHueTouch(e);
    });
}

function onHueTouchMove(e: TouchEvent) {
    if (props.disabled) return;
    handleHueTouch(e);
}

function handleHueTouch(e: TouchEvent) {
    if (!hueRect.value.width) return;
    const touch = e.touches[0];
    let x = touch.clientX - hueRect.value.left;
    x = Math.max(0, Math.min(x, hueRect.value.width));
    hsv.h = (x / hueRect.value.width) * 360;
    updateColorFromHsv();
}

function onAlphaTouchStart(e: TouchEvent) {
    if (props.disabled) return;
    getRects().then(() => {
        handleAlphaTouch(e);
    });
}

function onAlphaTouchMove(e: TouchEvent) {
    if (props.disabled) return;
    handleAlphaTouch(e);
}

function handleAlphaTouch(e: TouchEvent) {
    if (!alphaRect.value.width) return;
    const touch = e.touches[0];
    let x = touch.clientX - alphaRect.value.left;
    x = Math.max(0, Math.min(x, alphaRect.value.width));
    hsv.a = Number.parseFloat((x / alphaRect.value.width).toFixed(2));
    updateColorFromHsv();
}

// --- EyeDropper ---
async function openEyeDropper() {
    if (props.disabled) return;
    // #ifdef H5
    if (!isEyeDropperSupported.value) return;
    const eyeDropper = new (window as any).EyeDropper();
    try {
        const result = await eyeDropper.open();
        const hex = result.sRGBHex;
        parseSolidColor(hex);
        updateColorFromHsv();
    } catch (e) {
        console.log('User canceled selection');
    }
    // #endif
}

// --- Presets ---
function selectSwatch(color: string) {
    if (props.disabled) return;
    if (color.includes('gradient')) {
        colorType.value = 'gradient';
        initColor(color);
        emit('change', color);
        emit('update:modelValue', color);
    } else {
        colorType.value = 'solid';
        parseSolidColor(color);
        updateColorFromHsv();
    }
}

function loadRecentColors() {
    try {
        const stored = uni.getStorageSync(STORAGE_KEY);
        if (stored) {
            recentColors.value = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load recent colors', e);
    }
}

// --- API ---
function setColor(color: string) {
    initColor(color);
}

function getColor(): ColorObject {
    return {
        hex: tempColor.value,
        rgb: { ...rgb },
        hsl: { h: hsv.h, s: hsv.s, l: hsv.v }, // Approximation
        hsv: { ...hsv },
        alpha: hsv.a,
        source: colorFormat.value.toLowerCase()
    };
}

function saveRecentColor(color: string) {
    if (!color) return;
    const index = recentColors.value.indexOf(color);
    if (index > -1) {
        recentColors.value.splice(index, 1);
    }
    recentColors.value.unshift(color);
    if (recentColors.value.length > 10) {
        recentColors.value.pop();
    }
    uni.setStorageSync(STORAGE_KEY, JSON.stringify(recentColors.value));
    recentColors.value = [...recentColors.value];
}

defineExpose({
    setColor,
    getColor,
    saveRecentColor
});

// --- Watchers & Lifecycle ---
watch(
    () => props.format,
    val => {
        if (val) colorFormat.value = val;
    }
);

watch(
    () => props.modelValue,
    val => {
        if (colorType.value === 'solid') {
            if (val !== tempColor.value) initColor(val);
        } else {
            if (val !== gradientString.value) initColor(val);
        }
    }
);

watch(
    () => props.colorMode,
    val => {
        if (val === 'solid') colorType.value = 'solid';
        if (val === 'gradient') colorType.value = 'gradient';
    }
);

watch(
    () => props.showAlpha,
    val => {
        if (val) {
            initColor(props.modelValue);
            nextTick(() => {
                setTimeout(() => getRects(), 200);
            });
        }
    }
);

onMounted(() => {
    if (props.colorMode === 'gradient') colorType.value = 'gradient';
    initColor(props.modelValue);
    loadRecentColors();
    nextTick(() => {
        getRects();
    });
    // #ifdef H5
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
        isEyeDropperSupported.value = true;
    }
    // #endif
});
</script>

<style lang="scss" scoped>
@import 'uview-pro/libs/css/style.components.scss';

.u-color-select-panel {
    background-color: var(--u-bg-color);
    color: var(--u-main-color);
    padding: 24rpx;
    transition:
        background-color 0.3s,
        color 0.3s;

    &__tabs {
        @include vue-flex;
        background-color: var(--u-light-color);
        padding: 6rpx;
        border-radius: 8rpx;
        margin-bottom: 24rpx;
    }

    &__tab-item {
        flex: 1;
        text-align: center;
        font-size: 24rpx;
        color: var(--u-main-color);
        padding: 10rpx 0;
        border-radius: 6rpx;
        transition: all 0.2s;

        &--active {
            background-color: var(--u-bg-white);
            color: var(--u-main-color);
            box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
            font-weight: 500;
        }
    }

    // Gradient Bar
    &__gradient-bar-wrapper {
        position: relative;
        width: 100%;
        height: 40rpx;
        margin-bottom: 24rpx;
    }

    &__gradient-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20rpx;
        background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 16rpx 16rpx;
        background-color: #fff;
    }

    &__gradient-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20rpx;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    }

    &__gradient-stop {
        position: absolute;
        top: 50%;
        width: 32rpx;
        height: 32rpx;
        border-radius: 50%;
        background-color: #fff;
        border: 4rpx solid #fff;
        box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.3);
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        z-index: 10;

        &--active {
            transform: translate(-50%, -50%) scale(1.2);
            border-color: var(--u-main-color);
            z-index: 20;
        }
    }

    // SV Box
    &__sv-box {
        position: relative;
        width: 100%;
        height: 320rpx;
        border-radius: 12rpx;
        overflow: hidden;
        margin-bottom: 24rpx;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
    }

    &__sv-white {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
    }

    &__sv-black {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
    }

    &__sv-cursor {
        position: absolute;
        width: 24rpx;
        height: 24rpx;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.5);
        transform: translate(-50%, -50%);
        box-sizing: border-box;
    }

    // Middle Row
    &__middle-row {
        @include vue-flex;
        gap: 20rpx;
        margin-bottom: 24rpx;
        height: 80rpx;
    }

    &__sliders-col {
        flex: 1;
        @include vue-flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__slider-wrapper {
        position: relative;
        width: 100%;
        height: 32rpx;
        border-radius: 16rpx;
    }

    &__hue-bar {
        width: 100%;
        height: 100%;
        border-radius: 16rpx;
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
        position: relative;
    }

    &__alpha-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 16rpx;
        background-image:
            linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%);
        background-size: 16rpx 16rpx;
        background-color: #fff;
    }

    &__alpha-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 16rpx;
    }

    &__slider-thumb {
        position: absolute;
        top: 50%;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
        transform: translate(-50%, -50%);
        border: 4rpx solid #fff;
        box-sizing: border-box;

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transform: translate(-50%, -50%);
        }
    }

    &__preview-block {
        width: 80rpx;
        height: 80rpx;
        margin-left: 5rpx;
        border-radius: 12rpx;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    }

    // Input Row
    &__input-row {
        @include vue-flex;
        align-items: center;
        gap: 16rpx;
        margin-bottom: 30rpx;
    }

    &__format-selector {
        position: relative;
        min-width: 80rpx;
    }

    &__format-current {
        @include vue-flex;
        align-items: center;
        font-size: 26rpx;
        color: var(--u-main-color);
        padding: 10rpx 0;
    }

    &__format-dropdown {
        position: absolute;
        bottom: 100%;
        left: 0;
        background-color: var(--u-bg-color);
        border-radius: 8rpx;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
        padding: 8rpx 0;
        z-index: 100;
        width: 120rpx;
        border: 1px solid var(--u-border-color);
    }

    &__format-option {
        padding: 12rpx 20rpx;
        font-size: 26rpx;
        color: var(--u-main-color);

        &--active {
            color: var(--u-primary-color, #3c9cff);
            background-color: var(--u-bg-white);
        }
    }

    &__input-container {
        flex: 1;
        height: 64rpx;
        background-color: var(--u-bg-white);
        border-radius: 8rpx;
        @include vue-flex;
        align-items: center;
        padding: 0 16rpx;
        border: 1px solid transparent;
        transition: all 0.2s;

        &:focus-within {
            background-color: var(--u-bg-white);
            border-color: var(--u-primary-color, #3c9cff);
        }
    }

    &__input-prefix {
        color: var(--u-main-color);
        font-size: 26rpx;
        margin-right: 8rpx;
    }

    &__hex-input {
        flex: 1;
        color: var(--u-main-color);
        font-size: 26rpx;
        font-family: monospace;
    }

    &__alpha-control {
        @include vue-flex;
        align-items: center;
        background-color: var(--u-bg-white);
        border-radius: 8rpx;
        height: 64rpx;
        padding: 0 4rpx;
    }

    &__alpha-btn {
        width: 40rpx;
        height: 100%;
        @include vue-flex;
        align-items: center;
        justify-content: center;

        &:active {
            opacity: 0.7;
        }
    }

    &__alpha-input-wrapper {
        position: relative;
        width: 70rpx;
        height: 100%;
        @include vue-flex;
        align-items: center;
    }

    &__alpha-input {
        flex: 1;
        color: var(--u-main-color);
        font-size: 26rpx;
        text-align: center;
    }

    &__alpha-percent {
        position: absolute;
        right: 0;
        color: var(--u-main-color);
        font-size: 20rpx;
        pointer-events: none;
    }

    &__eyedropper-btn {
        width: 64rpx;
        height: 64rpx;
        background-color: var(--u-bg-white);
        border-radius: 8rpx;
        @include vue-flex;
        align-items: center;
        justify-content: center;

        &:active {
            background-color: var(--u-border-color);
        }
    }

    // Presets
    &__presets {
        margin-bottom: 30rpx;
    }

    &__section-title {
        font-size: 24rpx;
        color: var(--u-main-color);
        margin-bottom: 16rpx;
        display: block;
    }

    &__swatches-grid {
        @include vue-flex;
        flex-wrap: wrap;
        gap: 16rpx;
    }

    &__swatch {
        width: 48rpx;
        height: 48rpx;
        border-radius: 8rpx;
        box-sizing: border-box;
        transition: transform 0.1s;

        &:active {
            transform: scale(0.9);
        }
    }
}
</style>
