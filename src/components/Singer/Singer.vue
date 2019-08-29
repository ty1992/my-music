<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-04-16 22:22:46
 * @LastEditTime: 2019-08-29 15:04:13
 * @LastEditors: Please set LastEditors
 -->
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
            <li
              class="list-group-item"
              v-for="_item in item.list"
              :key="_item.id"
              @click="openDetail(_item)"
            >
              <img class="avatar" :src="_item.avatar" lazy="loaded">
              <span class="name">{{_item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <div class="fixed-title">{{fixedTitle}}</div>
      </div>
    </scroll>
    <loading v-if="!singerList.length"></loading>

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

    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from "@/api/singer";
import Singer from "common/js/Singer";
import { ERR_ON } from "@/api/config";
import scroll from "@/base/scroll/scroll";
import loading from "@/base/loading/loading";
import { mapMutations } from "vuex";

var TITLE_HEIGHT = 28;
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
      fixedTop: 0,
      diff: -1
    };
  },
  methods: {
    //内部请求接口
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code == ERR_ON) {
          this._normalList(res.data.list);
        }
      });
    },
    //格式化数据，返回需要的数据格式
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
    //动态的计算每个歌手板块的高度
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
      this.shortcutIndex =
        parseInt((this.touchY2 - this.touchY1) / 18) +
        parseInt(this.touchs.currentIndex);
      this._scrollTo(this.shortcutIndex);
    },
    _scrollTo(index) {
      if (index < 0) {
        index = 0;
      } else if (index > this.singerItemHeights.length - 2) {
        index = this.singerItemHeights.length - 2;
      }
      this.$refs.listview.scrollTo(0, -this.singerItemHeights[index], 0);
    },
    //点击歌手事件
    openDetail(singer) {
      this.setSinger(singer);
      this.$router.push({ path: `/singer/${singer.id}` });
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  watch: {
    scrollY(newVal) {
      this.diff = newVal;
      for (var i = 0, len = this.singerItemHeights.length - 1; i < len; i++) {
        var height1 = this.singerItemHeights[i];
        var height2 = this.singerItemHeights[i + 1];
        if (-newVal >= height1 && -newVal < height2) {
          this.shortcutIndex = i;
          this.diff = height2 + newVal;
          return;
        }
      }
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;
      if (this.fixedTop === fixedTop) {
        return;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
    }
  },
  computed: {
    shortcutList() {
      return this.singerList.map(item => {
        return item.title;
      });
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.singerList[this.shortcutIndex]
        ? this.singerList[this.shortcutIndex].title
        : "";
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
  .list-fixed {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;
      background: #333;
    }
  }
}
</style>
