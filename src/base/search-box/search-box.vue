<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input
      ref="searchBox"
      v-model="query"
      class="box"
      :placeholder="placeholder"
    >
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    clear() {
      this.query = "";
    },
    setQuery(query) {
      this.query = query;
    }
  },
  watch: {
    query(newVal){
      this.$emit('uploadQuery', newVal);
    }
  }
};
</script>


<style scoped lang="less">
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: #333;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: #222;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: #333;
    color: #fff;
    font-size: 14px;
    &::placeholder {
      color: #666;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: #222;
  }
}
</style>