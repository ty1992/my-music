<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 15:25:40
 * @LastEditTime: 2019-09-02 15:19:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="player" v-show="playSongList.length">
    <div class="normal-player" v-show="playFull">
      <div class="background">
        <img alt width="100%" height="100%" :src="playCurrentSong.image" />
      </div>
      <div class="top">
        <div class="back" @click="openMini">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{playCurrentSong.name}}</h1>
        <h2 class="subtitle">{{playCurrentSong.singer}}</h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img alt class="image play" :class="{pause: !playState}" :src="playCurrentSong.image" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <div class="time time-l">{{_formarDate(currentTime)}}</div>
          <progress-bar
            :currentTime="currentTime"
            :totalTime="playCurrentSong.interval"
            @touchend="touchend"
          ></progress-bar>
          <div class="time time-r">{{_formarDate(playCurrentSong.interval)}}</div>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-left" @click="pre">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center" @click="togglePlay">
            <i class="icon" :class="playState ? 'icon-pause' : 'icon-play'"></i>
          </div>
          <div class="icon i-right" @click="next">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon icon-pause"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!playFull" @click="openNormal">
      <div class="icon">
        <img
          class="image play"
          :class="{pause: !playState}"
          :src="playCurrentSong.image"
          alt
          height="40"
          width="40"
        />
      </div>
      <div class="text">
        <h2 class="name">{{playCurrentSong.name}}</h2>
        <p class="desc">{{playCurrentSong.singer}}</p>
      </div>
      <div class="control" @click.stop="togglePlay">
        <circle-bar>
          <i class="icon-mini" :class="playState ? 'icon-pause-mini' : 'icon-play-mini'"></i>
        </circle-bar>
      </div>
      <div class="control">
        <i class="icon-playlist icon-mini"></i>
      </div>
    </div>
    <audio
      :src="playCurrentSong.url"
      ref="audio"
      @error="error"
      @canplay="canplay"
      @timeupdate="timeupdate"
      @ended="ended"
    ></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import progressBar from "@/base/progressBar/index";
import circleBar from "@/base/circleBar/index";
export default {
  data() {
    return {
      reading: true,
      currentTime: 0
    };
  },
  components: {
    progressBar,
    circleBar
  },
  computed: {
    ...mapGetters([
      "playState",
      "playFull",
      "playCurrentSong",
      "playSongList",
      "playIndex"
    ])
  },
  methods: {
    openMini() {
      this.SET_PLAY_FULL(false);
    },
    openNormal() {
      this.SET_PLAY_FULL(true);
    },
    togglePlay() {
      if (!this.reading) {
        return;
      }
      this.SET_PLAY_STATE(!this.playState);
    },
    pre() {
      if (!this.reading) return;
      let index = this.playIndex - 1;
      if (index < 0) {
        index = this.playSongList.length - 1;
      }
      this.SET_PLAY_INDEX(index);
      this.reading = false;
    },
    next() {
      if (!this.reading) return;
      let index = this.playIndex + 1;
      if (index > this.playSongList.length - 1) {
        index = 0;
      }
      this.SET_PLAY_INDEX(index);
      this.reading = false;
    },
    error() {
      console.log("视频加载失败");
    },
    canplay() {
      this.reading = true;
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      // console.log(this.currentTime)
    },
    _formarDate(time) {
      var time = time | 0;
      var s = time % 60;
      var m = (time / 60) | 0;
      return `${this._pad(m)}:${this._pad(s)}`;
    },
    _pad(str) {
      // console.log(typeof str)
      if (str < 10) {
        str = "0" + str;
      }
      return str;
    },
    touchend(time) {
      this.$refs.audio.currentTime = time.toFixed(2);
      this.$refs.audio.play();
    },
    ended() {
      var index = this.playIndex + 1;
      if (this.playIndex > this.playSongList.length) {
        index = 0;
      }
      this.SET_PLAY_INDEX(index);
    },
    ...mapMutations(["SET_PLAY_FULL", "SET_PLAY_STATE", "SET_PLAY_INDEX"])
  },
  watch: {
    playCurrentSong(newVal) {
      this.$nextTick(() => {
        this.SET_PLAY_STATE(true);
        this.$refs.audio.play();
      });
    },
    playState(newval) {
      this.$nextTick(() => {
        newval ? this.$refs.audio.play() : this.$refs.audio.pause();
      });
    }
  }
};
</script>

<style scoped lang="less">
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1992;
    background: #222;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: 22px;
          color: #ffcd32;
          transform: rotate(-90deg);
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        color: #fff;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
      }
      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
        .cd {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 10px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid hsla(0, 0%, 100%, 0.1);
          }
        }
      }
      .playing-lyric-wrapper {
        width: 80%;
        margin: 30px auto 0 auto;
        overflow: hidden;
        text-align: center;
        .playing-lyric {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        .time {
          color: #fff;
          font-size: 12px;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          font-size: 30px;
          color: #ffcd32;
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
        }
        .i-right {
          text-align: left;
        }
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1993;
    width: 100%;
    height: 60px;
    background: #333;
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #fff;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-mini {
        font-size: 32px;
        color: rgba(255, 205, 49, 0.5);
      }
      .icon-playlist {
        font-size: 30px;
      }
    }
  }
  .image {
    &.play {
      animation: myrotate 20s linear infinite;
    }
    &.pause {
      animation-play-state: paused;
    }
  }
}

@keyframes myrotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
