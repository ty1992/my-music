<template>
  <div class="singer">
    <scroll
      class="listview"
      :data="singerList"
      :probe-type="3"
      :listenScroll="true"
      @scroll="scroll"
      ref="listview"
    >
      <ul ref="singerContainer">
        <li class="list-group" v-for="item in singerList" :key="item.title">
          <h2 class="list-group-title">{{item.title}}</h2>
          <ul>
            <li class="list-group-item" v-for="_item in item.list" :key="_item.id">
              <img class="avatar" :src="_item.avatar" lazy="loaded">
              <span class="name">{{_item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <loading v-if="!singerList.length"></loading>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div class="list-shortcut">
      <ul @touchstart.stop.prevent="touch" @touchmove.stop.prevent="move" @touchend.stop>
        <li
          v-for="(item, index) in shortcutList"
          :data-index="index"
          class="item"
          :class="{'current': shortcutIndex == index }"
          :key="item"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSingerList } from "@/api/singer";
import Singer from "common/js/Singer";
import { ERR_ON } from "@/api/config";
import scroll from "@/base/scroll/scroll";
import loading from "@/base/loading/loading";
export default {
  name: "singer",
  created() {
    this._getSingerList();
  },
  components: { scroll, loading },
  data() {
    return {
      singerList: [],
      shortcutIndex: 0,
      singerItemHeights: [],
      scrollY: 0,
      touchs: {},
      fixedTitle: ''
    };
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code == ERR_ON) {
          this._normalList(res.data.list);
        }
      });
    },
    _normalList(list) {
      let map = {};
      let ret = [];
      list.forEach(item => {
        if (!map[item.Findex]) {
          map[item.Findex] = {
            title: item.Findex,
            list: []
          };
        }
        map[item.Findex].list.push(
          new Singer(item.Fsinger_name, item.Fsinger_mid)
        );
      });
      for (var key in map) {
        var val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        }
      }
      this.singerList = ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      this._computedH();
    },
    _computedH() {
      setTimeout(() => {
        var oLis = this.$refs.singerContainer.querySelectorAll(".list-group");
        var len = oLis.length;
        var h = 0;
        this.singerItemHeights.push(h);
        for (var i = 0; i < len; i++) {
          h += oLis[i].clientHeight;
          this.singerItemHeights.push(h);
        }
        console.log(this.singerItemHeights);
      }, 20);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    touch(e) {
      var index = e.target.getAttribute("data-index");
      this.touchs.currentIndex = this.shortcutIndex = index;
      this.touchY1 = e.touches[0].pageY;
      this._scrollTo(index);
    },
    move(e) {
      this.touchY2 = e.touches[0].pageY;
      this.shortcutIndex = parseInt((this.touchY2 - this.touchY1) / 18) + parseInt(this.touchs.currentIndex);
      this._scrollTo(this.shortcutIndex);
    },
    _scrollTo(index) {
      if(index < 0){
         index = 0;
      }else if(index > this.singerItemHeights.length - 2){
         index = this.singerItemHeights.length - 2;
      }
      this.$refs.listview.scrollTo(0, -this.singerItemHeights[index], 0);
    }
  },
  watch: {
    scrollY(newVal){
      for(var i = 0, len = this.singerItemHeights.length - 1; i < len; i++){
        var height1 = this.singerItemHeights[i];
        var height2 = this.singerItemHeights[i + 1];
        if(-newVal >= height1 && -newVal < height2){
          this.shortcutIndex = i;
          return;
        }
      }
    }
  },
  computed: {
    shortcutList() {
      return this.singerList.map(item => {
        return item.title;
      });
    }
  }
};
</script>

<style scoped lang="less">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #222;
  }
  .list-group {
    padding-bottom: 30px;
  }
  .list-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    background: #333;
  }
  .list-group-item {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 20px 0 0 30px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .name {
      margin-left: 20px;
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;
      &.current {
        color: #ffcd32;
      }
    }
  }
}
</style>
