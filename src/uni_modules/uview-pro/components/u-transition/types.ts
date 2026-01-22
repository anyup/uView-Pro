import type { PropType } from 'vue';
import { baseProps } from '../common/props';
import type { TransitionDuration, TransitionPreset } from '../../types/global';

export const TransitionProps = {
    ...baseProps,
    show: {
        type: Boolean,
        default: true
    },
    name: {
        type: String as PropType<TransitionPreset>,
        default: 'fade'
    },
    mode: {
        type: String as PropType<'out-in' | 'in-out' | ''>,
        default: ''
    },
    duration: {
        type: [Number, Object] as PropType<number | TransitionDuration>,
        default: 300
    },
    timingFunction: {
        type: String,
        default: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
    },
    delay: {
        type: Number,
        default: 0
    },
    appear: {
        type: Boolean,
        default: false
    }
};
