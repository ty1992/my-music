<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script>
  import MyHeader from 'components/MyHeader/MyHeader'
  import Tab from 'components/Tab/Tab'
export default {
  name: 'App',
  components:{
    MyHeader,
    Tab
  }
}
</script>

<style>
#app {

}
</style>
