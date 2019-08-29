<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-04-16 22:22:46
 * @LastEditTime: 2019-08-29 15:32:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <keep-alive>
      <router-view />
    </keep-alive>
    <Player />
  </div>
</template>

<script>
import MyHeader from "components/MyHeader/MyHeader";
import Tab from "components/Tab/Tab";
import Player from "components/Player";
export default {
  name: "App",
  components: {
    MyHeader,
    Tab,
    Player
  }
};
</script>

