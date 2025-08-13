<template>
    <view :class="[animationName]" :style="[animationDelay ? { animationDelay: animationDelay * 0.1 + 's' } : {}]">
        <slot></slot>
    </view>
</template>

<script>
export default {
    props: {
        name: {
            // 'fade'｜'scale-up'｜'scale-down'｜'slide-top'｜'slide-bottom'｜'slide-left'｜'slide-right'｜'shake'
            type: String,
            default: ''
        },
        delay: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            animationName: '',
            animationDelay: 0
        };
    },
    created() {
        this.animationName = this.name ? `animation-${this.name}` : '';
        this.animationDelay = this.delay || 0;
    },
    methods: {
        toggle(name, delay) {
            this.animationName = name ? `animation-${name}` : `animation-${this.name}`;
            this.animationDelay = delay || this.delay;
            setTimeout(() => {
                this.animationName = '';
            }, 500);
        }
    }
};
</script>

<style>
@import 'animation.css';
</style>
