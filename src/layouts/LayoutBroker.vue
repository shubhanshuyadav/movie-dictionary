<template>
    <component :is="currentLayout">
        <router-view></router-view>
    </component>
</template>
<script>
import AppLayout from "./AppLayout";
import AuthLayout from "./AuthLayout";

export default {
  name: 'LayoutBroker',
  data(){
    return {
      layouts: {
        AppLayout,
        AuthLayout
      }
    }
  },
  props: {
    current: {
      type: String
    }
  },
  computed: {
    /**
     * Return layout component name for current route
     * @return {string}
     */
    currentLayout() {
      return this.layouts[this.current]
    }
  }
}
</script>
