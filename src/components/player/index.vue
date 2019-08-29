<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 15:25:40
 * @LastEditTime: 2019-08-29 16:35:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="player" v-show="playState">
    <div class="normal-player" v-show="playFull">
      <div class="background">
        <img src alt width="100%" height="100%" />
      </div>
      <div class="top">
        <div class="back"></div>
        <h1 class="title"></h1>
        <h2 class="subtitle"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd play pause">
              <img src alt class="image" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev"></i>
          </div>
          <div class="icon i-center">
            <i class="icon icon-pause"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon icon-pause"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!playFull">
      <div class="icon">
        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000DMpJ73yeITP.jpg?max_age=2592000" alt height="40" width="40" class="play pause" />
      </div>
      <div class="text">
        <h2 class="name">222222222222222222</h2>
        <p class="desc">222222222222222</p>
      </div>
      <div class="control">
        <i class="icon-playlist"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(["playState", "playFull", "playCurrentSong"])
  },
  created(){
    // console.log(this.playCurrentSong)
  },
  watch: {
    playCurrentSong(newVal){
      console.log(newVal)
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
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
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
      img{
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
      .icon-playlist {
        font-size: 30px;
        color: rgba(255, 205, 49, 0.5);
      }
    }
  }
}
</style>
