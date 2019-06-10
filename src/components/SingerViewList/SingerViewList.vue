<template>
  <scroll
    class="scroll"
    @scroll="scrolling"
    :listenScroll="true"
    :data="data"
    :probe-type="3"
    ref="myScroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            @click="select(item)"
            v-for="item in group.items"
            class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <loading v-if="!data.length"></loading>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item, index) in shortcutList"
            :data-index="index"
            @touchstart.stop.prevent="selectList"
            :class="index === currentIndex ? 'current' : ''"
            class="item">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
  import scroll from '@/base/scroll/scroll'
  import loading from '@/components/loading/loading'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "singer-view-list",
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0,
        listHeight: []
      }
    },
    components: {
      scroll, loading
    },
    computed: {
      shortcutList() {
        return this.data.map((item) => {
          return item.title
        })
      },
      ...mapState([
        'singer'
      ])
    },

    methods: {
      selectList(e) {
        var el = e.srcElement;
        var lis = document.querySelectorAll('.list-group');
        var scroll = this.$refs.myScroll.scroll
        var index = el.getAttribute('data-index');
        this.currentIndex = parseInt(index);
        scroll.scrollToElement(lis[index], 500);
      },
      scrolling(pos) {
        var listHeight = this.listHeight;
        var newY = -pos.y;
        listHeight.forEach((item, index) => {
          if (newY >= item) {
            this.currentIndex = index++;
            return;
          }
        })
      },
      _calculateHeight() {
        var listGroups = this.$refs.listGroup;
        var height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < listGroups.length; i++) {
          height += listGroups[i].clientHeight
          this.listHeight.push(height)
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      select(item) {
        this.setSinger(item)
        this.$router.push({path: `singer/${item.mid}`})
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this._calculateHeight()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .scroll {
    height: 100%;
    overflow: hidden;
    .list-group {
      padding-bottom: 20px;
      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        background: #333;
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          margin-left: 20px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }
      }
    }
    .list-shortcut {
      position: absolute;
      z-index: 100;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      font-family: Helvetica;
      .item {
        padding: 3px;
        line-height: 1;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
        &.current {
          color: #ffcd32;
        }
      }
    }
  }
</style>
