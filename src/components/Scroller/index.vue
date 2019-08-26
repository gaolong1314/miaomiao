<template>
  <div class="Wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  mounted(){
      var scroll = new BScroll(this.$refs.wrapper,{
          tap:true,
          probeType:1
      })
  }

};
</script>

<style lang="scss" scoped>
.Wrapper {
  height: 100%;
}
</style>