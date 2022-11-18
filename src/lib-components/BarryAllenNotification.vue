<template>
    <transition name="notify"
                @mouseenter="clearTimer"
                @mouseleave="startTimer"
                @before-enter="beforeNotificationEnter"
                @after-enter="afterNotificationEnter"
                @before-leave=""
                @after-leave="afterNotificationLeave"
    >
        <div v-if="visible"
             tabindex="-1"
             :style="styles"
             class="barry-allen-notification"
             :class="wrapperClass">
            <slot :close="() => close()" />
            <div class="barry-allen-notification__inner">
                <slot name="inner">
                    {{ message }}
                </slot>
            </div>
            <div class="barry-allen-notification__action">
                <slot name="actions">
                    <button class="barry-allen-notification__button" @click="close">x</button>
                </slot>
            </div>
        </div>
    </transition>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
    name: "BarryAllenNotification",
    props: {
        message: {type: String, required: true},
        wrapperClass: {type: String, default: null},
        duration: {type: Number, default: 5000},
        styles: { type: [Object, Array], default: () => ({}) },
    },
    emits: [
        '_closed',
    ],
    setup(props, {emit}) {
        const uid = Symbol('barry_allen')
        const visible = ref(false)
        const timeout = ref(null)

        //Init show
        function startTransitionEnter() {
            visible.value = true
        }

        //close
        function close() {
            if (timeout.value !== null) {
                clearTimeout(timeout.value);
            }
            visible.value = false
        }

        //Events
        function beforeNotificationEnter() {

        }

        function afterNotificationEnter() {
            startTimer()
        }

        function afterNotificationLeave(){
            emit('_closed')
        }

        function startTimer() {
            timeout.value = setTimeout(close, props.duration);
        }

        function clearTimer() {
            clearTimeout(timeout.value);
            timeout.value = null
        }

        //Mounted logic
        function mounted() {
            startTransitionEnter()
        }

        onMounted(() => {
            mounted()
        })

        return {
            startTransitionEnter,
            beforeNotificationEnter,
            afterNotificationEnter,
            afterNotificationLeave,
            startTimer,
            clearTimer,
            close,
            visible,
            timeout,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>