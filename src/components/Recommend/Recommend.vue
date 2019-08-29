<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-29 15:02:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="scroll-wrap">
    <scroll :data="discList" class="scroll-container">
      <div>
        <div v-if="slideList.length">
          <slide>
            <div v-for="(item, index) in slideList" :key="index">
              <img :src="item.picUrl" alt>
            </div>
          </slide>
        </div>
        <loading v-else title></loading>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>

          <ul>
            <li v-for="(item, _index) in discList" class="item" :key="_index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
          <loading v-if="!discList.length" style="top:160%;"></loading>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import slide from "@/base/Slide/Slide";
import loading from "@/components/loading/loading";
import Scroll from "@/base/scroll/scroll";
import { getRecommoned, getDiscList } from "@/api/getRecommoned.js";
import { ERR_ON } from "@/api/config.js";

export default {
  name: "recommend",
  components: {
    slide,
    Scroll,
    loading
  },
  data() {
    return {
      slideList: [],
      discList: []
    };
  },
  created() {
    this._getSlideList();
    this._getDescList();
  },
  methods: {
    _getSlideList() {
      getRecommoned().then(res => {
        if (res.code === ERR_ON) {
          this.slideList = res.data.slider;
        }
      });
    },
    _getDescList() {
      getDiscList().then((res, err) => {
        this.discList = res.data.list;
      });
    }
  }
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 0;
  .scroll-container {
    height: 100%;
    overflow: hidden;
  }
}

.recommend-list {
  .list-title {
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: 14px;
    color: #ffcd32;
  }
  .item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon {
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: 14px;
    }
    .name {
      margin-bottom: 10px;
      color: #fff;
    }
    .desc {
      color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
