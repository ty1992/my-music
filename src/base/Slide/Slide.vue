<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "slide",
    components: {},
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 5000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      var me = this;
      this.$nextTick(() => {

        this._setWrapWidth()
        this._initDots()
        this._initSlider()
      });
      window.addEventListener('resize',function(){
        me._setWrapWidth(true);
      },false);
    },
    methods: {
      _setWrapWidth(flag) {
        var slider = this.$refs.slider
        var sliderItemWrap = this.$refs.sliderGroup
        this.child = sliderItemWrap.children
        var sliderW = slider.clientWidth
        var width = 0;
        for (let i = 0; i < this.child.length; i++) {
          width += sliderW;
        }
        if( this.loop && !flag){
          width += sliderW * 2
        }
        sliderItemWrap.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        });
        if( this.autoplay ){
          this._play();
        }
        this.slider.on('scrollEnd', () => {
          this.currentPageIndex = this.slider.getCurrentPage().pageX;
          if (this.autoplay) {
            this._play();
          }
        })

        this.slider.on('beforeScrollStart', () =>{
          if (this.autoplay) {
            clearTimeout(this.timer)
          }
        })
      },
      //初始化下标
      _initDots(){
        this.dots = new Array(this.child.length)
      },
      //自动播放
      _play(){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.currentPageIndex++;
          if( this.currentPageIndex > (this.dots.length - 1) ){
            this.currentPageIndex = 0;
          }
          this.slider.goToPage(this.currentPageIndex, 0, 400);
        },this.interval);
      }


    },
    beforeDestroy() {
      console.log(111);
      clearTimeout(this.timer)
    },
  }
</script>

<style scoped lang="less">
  .slider {
    width: 100%;
    position: relative;
    overflow: hidden;
    .slider-group {
      display: flex;
      > div {
        flex: 1;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .dots{
      position: absolute;
      left:0;
      right:0;
      bottom:10px;
      text-align: center;
      > span{
        display: inline-block;
        margin: 0 5px;
        border-radius: 4px;
        height:8px;
        width:8px;
        background: rgba(255, 255, 255, 0.5);
        &.active{
          width: 20px;
          background: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
</style>
