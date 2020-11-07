<template>
  <div id="app">
    <Header/>
    <Main/>
  </div>
</template>

<script>
import Header from "@/components/layouts/Header";
import Main from "@/components/layouts/Main";

export default {
  name: 'App',
  components: {
    Main,
    Header,
  }
}
</script>

<style>
</style>
