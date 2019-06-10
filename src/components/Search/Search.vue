<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @uploadQuery="uploadQuery"></search-box>
    </div>
    <div class="hot-key" v-show="!searches.length">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li @click="addquery(item.k)" class="item" v-for="item in hotKey" :key="item.n">
          <span>{{item.k}}</span>
        </li>
      </ul>
    </div>
    <div class="search-result" v-show="searches.length">
      <div class="suggest">
        <scroll ref="searches-view" :pullup="true" @scrollToEnd="scrollToEnd">
          <div>
            <ul class="suggest-list">
              <li :key="item.songid" class="suggest-item" v-for="item in searches">
                <div class="icon">
                  <i class="icon-music"></i>
                </div>
                <div class="name">
                  <p class="text" v-html="getDisplayName(item)"></p>
                </div>
              </li>
            </ul>
            <loading
              title
              v-show="more"
              style="position:static;transform:none;height:auto;margin-top:-5px;padding-bottom:15px;"
            ></loading>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import loading from "@/base/loading/loading";
import searchBox from "@/base/search-box/search-box";
import scroll from "@/base/scroll/scroll";
import { ERR_ON } from "api/config";
import { getHotKey, search } from "@/api/search.js";
export default {
  name: "search",
  components: { searchBox, scroll, loading },
  created() {
    this._renderHot();
  },
  data() {
    return {
      hotKey: [],
      searches: [],
      page: 1,
      size: 20,
      more: false,
      query: "",
      totalPage: -1
    };
  },
  methods: {
    _renderHot() {
      getHotKey().then(res => {
        if (res.code == ERR_ON) {
          this.hotKey = res.data.hotkey.splice(0, 10);
        }
      });
    },
    addquery(query) {
      //this.query = query;
      //console.log(this.$refs);
      this.$refs.searchBox.setQuery(query);
    },
    uploadQuery(newVal) {
      this.query = newVal;
      search(newVal, this.page, this.size).then(res => {
        if (res.code == ERR_ON) {
          this.searches = res.data.song.list;
          if (this.totalPage == -1) {
            this._computedTotalPage(res.data.song);
          }
        }
      });
    },
    getDisplayName(item) {
      var singer = "";
      if (item.singer.length > 1) {
        for (var i = 0, len = item.singer.length; i < len; i++) {
          singer += "/" + item.singer[i].name;
        }
        singer = singer.substring(1);
      } else {
        singer = item.singer[0].name;
      }
      return item.songname_hilight + "--" + singer;
    },
    _computedTotalPage(data) {
      this.totalPage = Math.ceil(data.totalnum / data.curnum);
    },
    scrollToEnd() {
      if (this.page == this.totalPage && this.totalPage == -1) {
        return;
      }
      this.page++;
      this.more = true;
      search(this.query, this.page, this.size).then(res => {
        if (res.code == ERR_ON) {
          console.log(res.data.song.list);
          this.searches.concat(res.data.song.list);
          this.more = false;
        }
      });
      //search(this.query, this.page, this.size)
    }
  }
};
</script>

<style lang="less">
@import "~common/less/variable.less";
.search-box-wrapper {
  margin: 20px;
}
.hot-key {
  margin: 0 20px 20px 20px;
  position: relative;
  .title {
    margin-bottom: 20px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
  .item {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    background: #333;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.3);
  }
}

.search-result {
  position: fixed;
  width: 100%;
  top: 178px;
  bottom: 0;
  .suggest {
    height: 100%;
    overflow: hidden;
  }
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
    .c_tx_highlight {
      color: @color-theme;
    }
    .name {
      flex: 1;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.3);
      overflow: hidden;
      .text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
