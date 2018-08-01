<template>
  <transition name="slide">
    <music-list></music-list>
  </transition>
</template>

<script>
  import musicList from '@/components/music-list/music-list'
  import {mapState} from 'vuex'

  export default {
    name: "song-list",
    components: {
      musicList
    },
    computed: {
      ...mapState([
        'singer'
      ])
    },
    created() {
      if (!this.singer.mid) {
        this.$router.push('/singer');
        return;
      }
    },
  }
</script>

<style scoped lang="less">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
