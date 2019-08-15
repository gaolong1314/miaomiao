<template>
  <div id="main">
    <Header title="我的喵喵"/>
    <Tabbar />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Tabbar from "@/components/Tabbar";

export default {
  name: "Mine",
  components: {
    Header,
    Tabbar
  }
};
</script>

<style lang="scss" scoped>
</style>