<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script>

    import BScroll from 'better-scroll'
    export default {
      name: "scroll",
      props: {
        probeType: {
          type: Number,
          default: 1
        },
        click: {
          type: Boolean,
          default: true
        },
        listenScroll: {
          type: Boolean,
          default: false
        },
        data: {
          type: Array,
          default: null
        },
        pullup: {
          type: Boolean,
          default: false
        },
        beforeScroll: {
          type: Boolean,
          default: false
        },
        refreshDelay: {
          type: Number,
          default: 20
        }
      },
      mounted(){
        this.$nextTick(function(){
          this._initScroll();
        })
      },
      methods: {
        _initScroll(){
            //var scroll = document.querySelector('.scroll');
            this.scroll = new BScroll(this.$refs.scroll)
          },
        refresh() {
          this.scroll && this.scroll.refresh()
        }
      },
      watch: {
        data() {
          setTimeout(() => {
            this.refresh()
          }, this.refreshDelay)
        }
      }
    }
</script>

<style scoped>

</style>
