<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <!--<div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
    export default {
        name: "slide",
        components:{
          BScroll
        },
        data(){
          return {

          }
        },
        mounted(){
          setTimeout(()=> {
            this._initSlider();
          },20)
        },
        methods: {
          _initSlider() {
            console.log( this.$refs.sliderGroup.children.length )
            this.slider = new BScroll(this.$refs.slider, {
              scrollX: false,
              scrollY: true,
              momentum: false,
              snap: true,
              snapLoop: this.loop,
              snapThreshold: 0.3,
              snapSpeed: 400
            })
          }
        }

    }
</script>

<style scoped>

</style>
