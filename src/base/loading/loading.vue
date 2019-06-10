<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt>
    <div class="title">{{title}}</div>
  </div>
</template>


<script>
export default {
  name: "loading",
  props: {
    title: {
      type: String,
      default: "正在加载..."
    }
  }
};
</script>

<style lang="less">
.loading {
  position: fixed;
  top:50%;
  width:100%;
  transform:translateY(-50%);
  text-align:center;
  z-index:1993;
  img{
      display: block;
      margin:0 auto 10px;
  }
  .title {
    color: #fff;
    font-size: 14px;
  }
}
</style>

