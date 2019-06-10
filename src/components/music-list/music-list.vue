<template>
  <div class="music-list">
    <router-link to="/singer" tag="div" class="back">
      <i class="icon-back"></i>
    </router-link>
    <h1 class="title" v-html="singer.name"></h1>
    <div class="bg-image" :style="{backgroundImage:bgStyle}" ref="imgWrap">
      <div class="filter" ref="filter"></div>
    </div>

    <div class="bg" ref="bg"></div>
    <scroll
      :data="songList"
      class="scroll"
      @scroll="scrolling"
      :probe-type="3"
      :listenScroll="true"
      ref="scroll"
    >
      <song-list class="song-list-wrap" :song-list="songList"></song-list>
    </scroll>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import scroll from '@/base/scroll/scroll'
  import songList from '@/components/song-list/song-list'
  import {getSongList} from '@/api/getSong'
  const RESERVED_HEIGHT = 40
  export default {
    name: "music-list",
    data() {
      return {
        songList: [],
        scrollY: -1
      }
    },
    created() {
      this._songListInit()
    },
    methods: {
      _songListInit() {
        if (!this.singer.mid) {
          return
        }
        getSongList(this.singer.mid).then((res) => {
          this.songList = this._normalized(res.data.list)
        }).catch((err) => {
          console.log(err);
        })
      },
      _normalized(list) {
        var arr = [];
        list.forEach((item) => {
          let {musicData} = item
          arr.push(musicData)
        })
        return arr
      },
      scrolling(pos) {
        this.scrollY = pos.y
      }
    },
    mounted(){
      this.heightTop = this.$refs.imgWrap.clientHeight
      this.$refs.scroll.$el.style.top = this.heightTop + 'px'
      this.minTransalteY = this.heightTop - RESERVED_HEIGHT
    },
    computed: {
      ...mapState([
        'singer'
      ]),
      bgStyle() {
        return `url("https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.mid}.jpg?max_age=2592000`
      }
    },
    components: {
      scroll, songList
    },
    watch:{
      scrollY(newVal){
        let scale = 1
        let h = Math.min( this.minTransalteY, -newVal)
        this.$refs.bg.style.transform = `translateY(${-h}px)`
        if( newVal < 0 ){
          if( newVal  < -this.minTransalteY ){
            this.$refs.imgWrap.style.zIndex = 10
            this.$refs.imgWrap.style.height = RESERVED_HEIGHT + 'px'
            this.$refs.imgWrap.style.paddingTop = 0
          }else{
            this.$refs.imgWrap.style.zIndex = 0
            this.$refs.imgWrap.style.height = 0
            this.$refs.imgWrap.style.paddingTop = '70%'
          }
        }else{
          scale += (newVal / this.heightTop)
          this.$refs.imgWrap.style.transform = `scale(${scale})`
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .music-list {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #222;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
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
    }
    .bg{
      position: absolute;
      width:100%;
      height:100%;
      background: #222;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      padding-top: 70%;
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
</style>
