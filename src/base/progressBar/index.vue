<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 16:14:08
 * @LastEditTime: 2019-09-01 09:02:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="progress-bar-wrapper">
    <div class="progress-bar" ref="progressBar">
      <div class="bar-inner">
        <div class="progress" ref="progress"></div>
        <div
          class="progress-btn-wrapper"
          ref="progressBtn"
          @touchstart="touchstart"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <div class="progress-btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    totalTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dragging: false,
      touches: {}
    };
  },
  components: {},
  created() {
    // this.$nextTick(() => {
    //   this.width = this.$refs.progressBar.clientWidth;
    // });
    // console.log(this.width);
  },
  methods: {
    touchstart(e) {
      this.dragging = true;
      this.touches.start = e.touches[0].clientX;
      this.left = this.$refs.progress.clientWidth;
    },
    touchmove(e) {
      let deltaX = e.touches[0].clientX - this.touches.start;
      this.total = Math.min(deltaX + this.left, this.w);
      this.$refs.progressBtn.style.left = this.$refs.progress.style.width = this.total + 'px'   
    },
    touchend(e) {
      this.dragging = false;
      this.$emit('touchend', this.total * this.diff);
    }
  },
  watch: {
    currentTime(newVal) {
      if(this.dragging) return;
      this.$refs.progressBtn.style.left = this.$refs.progress.style.width =
        (newVal / this.totalTime) * this.w + "px";
    },
    totalTime(newVal){
      this.w = this.$refs.progressBar.clientWidth - 15;
      this.diff = newVal / this.w;
    }
  }
};
</script>

<style scoped lang="less">
.progress-bar-wrapper {
  flex: 1;
  .progress-bar {
    height: 30px;
  }
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
  }
  .progress {
    position: absolute;
    height: 100%;
    background: #ffcd32;
  }
  .progress-btn-wrapper {
    position: absolute;
    left: 0;
    top: -13px;
    width: 30px;
    height: 30px;
    transform: translateX(-8px);
    .progress-btn {
      position: relative;
      top: 7px;
      left: 7px;
      box-sizing: border-box;
      width: 16px;
      height: 16px;
      border: 3px solid #fff;
      border-radius: 50%;
      background: #ffcd32;
    }
  }
}
</style>
