<template>
  <div ref="scroll" class="scroll-view">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
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
      type: [Array, Object],
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
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.scroll, {
        probeType: this.probeType
      });
      let _this = this;
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          _this.$emit("scroll", pos);
        });
      }
      if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            console.log(this.scroll.maxScrollY, this.scroll.y)
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  },
  watch: {
    data() {
      var me = this;
      setTimeout(() => {
        me.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style scoped>
.scroll-view {
  overflow: hidden;
  height: 100%;
}
</style>
