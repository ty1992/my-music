<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-29 17:38:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <transition name="slide">
    <div class="music-list">
      <router-link to="/singer" tag="div" class="back">
        <i class="icon-back"></i>
      </router-link>
      <h1 class="title" v-html="singer.name"></h1>
      <div class="bg-image" ref="imgWrap" :style="{backgroundImage: `url(${singer.avatar})`}">
        <div class="filter" ref="filter"></div>
      </div>

      <scroll
        :data="songList.list"
        @scroll="scrolling"
        :probe-type="3"
        :listenScroll="true"
        class="scroll-warp"
        ref="scrollWarp"
      >
        <div class="song-list" style="padding:20px 30px;" ref="songList">
          <ul>
            <li class="item" v-for="(song, index) in songList.list" :key="index" @click="selectItem(song, index)">
              <div class="content">
                <h2 class="name">{{song.musicData.songname}}--{{song.musicData.albumname}}</h2>
                <p class="desc">{{getDec(song.musicData)}}</p>
              </div>
            </li>
          </ul>
        </div>
        <loading v-if="!songList.length"></loading>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getSongList, cd } from "@/api/getSong";
import { ERR_ON } from "@/api/config";
import scroll from "@/base/scroll/scroll";
import loading from "@/components/loading/loading";

export default {
  name: "singer-detail",
  components: { scroll, loading },
  computed: {
    ...mapGetters(["singer"])
  },
  data() {
    return {
      songList: [],
      scrollY: -1
      // imgH: -1
    };
  },
  created() {
    if (!this.singer.id) {
      this.$router.push("/singer");
      return;
    }
    this._getSongList();
  },
  mounted() {
    this.winW = window.screen.width;
    this.$refs.scrollWarp.$el.style.top = this.imgH = this.$refs.imgWrap.style.height =
      this.$refs.imgWrap.clientHeight + "px";
    this.$refs.imgWrap.style.paddingTop = 0;
  },
  methods: {
    _getSongList() {
      getSongList(this.singer.id).then(res => {
        if (res.code == ERR_ON) {
          console.log(res.data)
          this.songList = res.data;
        }
      });
    },
    getDec(song) {
      var { singer } = song;
      var songListHtml = "";
      singer.forEach(element => {
        songListHtml += "/" + element.name;
      });
      return songListHtml.substring(1);
    },
    scrolling(pos) {
      this.scrollY = pos.y;
    },
    selectItem(song, index){
      this.selectPlay({
        list: this.songList.list,
        index
      })
      console.log(index)
    },
    ...mapActions(['selectPlay'])
  },
  watch: {
    scrollY(newVal) {
      let diff = 1;
      if (newVal > 0) {
        diff += newVal / parseInt(this.imgH);
        this.$refs.imgWrap.style.transform = `scale(${diff})`;
      } else {
        this.$refs.imgWrap.style.transform = `scale(1)`;
        let imgH = parseInt(this.imgH) + newVal;
        let maxH = Math.max(imgH, 40);
        this.$refs.imgWrap.style.height = maxH + 'px'
      }
    }
  }
};
</script>

<style scoped lang="less">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.music-list {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  right: 0;
  background: #222;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    z-index: 1010;
    i {
      display: block;
      padding: 10px;
      font-size: 22px;
      color: #ffcd32;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    z-index: 1010;
  }
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    padding-top: 70%;
    z-index: 1000;
  }
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.4);
  }
  .song-list-wrap {
    padding: 20px 30px;
  }
}

.scroll {
  position: fixed;
  top: 280px;
  bottom: 0;
  width: 100%;
}
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 14px;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #fff;
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 4px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
.scroll-warp {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  z-index: 999;
}

</style>
