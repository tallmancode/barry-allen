<template>
    <div class="barry-allen-container">
        <component
            :is="modal.component"
            :key="modal.id"
            :message="modal.message"
            :wrapperClass="modal.params.wrapperClass"
            v-on="modal.on"
            v-for="(modal, index) in api.notifications"
            @_closed="slice(index)"
        >

        </component>
    </div>
</template>

<script>
export default {
    name: "BarryAllenContainer",
    methods:{
        slice(index){
            this.api.notifications.splice(index, 1)
        }
    }
}
</script>

<style scoped lang="scss">

</style>