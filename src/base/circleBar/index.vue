<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 15:01:48
 * @LastEditTime: 2019-09-02 16:12:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="circle-bar">
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" stroke="black" stroke-width="6" fill="transparent" stroke-dashoffset="0" stroke-dasharray="200"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style  lang="less">
.circle-bar {
  position: relative;
  width:32px;
  height:32px;
  circle {
    stroke: rgba(255, 205, 49, 1);
  }
  .icon-mini{
      position: absolute;
      left:0;
      top:0;
      z-index:-1;
  }
}
</style>
