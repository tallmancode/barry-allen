<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { VueMesaSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  VueMesaSample,
  // }
});
</script>

<template>
  <div id="app">
    <vue-mesa-sample />
  </div>
</template>
