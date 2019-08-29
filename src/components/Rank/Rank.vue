<template>
  <div class="rank">
    <scroll :data="topList" class="toplist">
      <ul>
        <!-- {{topList}} -->
        <li v-for="item in topList" :key="item.id" class="item">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList" :key="index">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <loading v-if="!topList.length"></loading>
  </div>
</template>

<script>
import { getTopList } from "@/api/rank.js";
import { ERR_ON } from "@/api/config";
import scroll from "@/base/scroll/scroll";
import loading from "@/base/loading/loading";
export default {
  name: "rank",
  data() {
    return {
      topList: []
    };
  },
  components: {
    scroll,
    loading
  },
  created() {
    this._getRankList();
  },
  methods: {
    _getRankList() {
      getTopList().then(res => {
        if (ERR_ON == res.code) {
          this.topList = res.data.topList;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.rank {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  .toplist {
    height: 100%;
    overflow: hidden;
  }
  .item {
    display: flex;
    margin: 0 20px;
    padding-top: 20px;
    height: 100px;
    &:last-child {
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 100px;
      width: 100px;
      height: 100px;
    }
    .songlist {
      -ms-flex: 1;
      flex: 1;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-pack: center;
      justify-content: center;
      padding: 0 20px;
      height: 100px;
      overflow: hidden;
      background: #333;
      color: rgba(255, 255, 255, 0.3);
      font-size: 12px;
    }
    li {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 26px;
    }
  }
}
</style>
