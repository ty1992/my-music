<template>
  <div class="singer">
    <singer-view-list :data="singer"></singer-view-list>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from '@/api/getSinger'
  import {ERR_ON} from '@/api/config.js'
  import singerViewList from '@/components/SingerViewList/SingerViewList'

  export default {
    name: "singer",
    data() {
      return {
        singer: []
      }
    },
    created() {
      this._getSingerList();
    },
    components: {
      singerViewList
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_ON) {
            this.singer = this._formatData( res.data.list )
          }
        })
      },
      _formatData(list){
        var map = {};
        var arr = [];
        list.forEach((item, index) => {
          var key = item.Findex
          if( !map[key] ){
            map[key] = {
              title: key,
              items: []
            }
          }
         map[key].items.push({
            name: item.Fsinger_name,
            mid: item.Fsinger_mid,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        });
        for( var attr in map ){
          var val = map[attr];
          if( val.title.match(/[a-zA-Z]/) ){
            arr.push(val)
          }
        }
        arr.sort((val1, val2) => {
          return val1.title.charCodeAt(0) - val2.title.charCodeAt(0)
        })
        return arr;
      }
    }
  }
</script>

<style scoped lang="less">
  .singer {
    position: fixed;
    top: 88px;
    width: 100%;
    bottom: 0;
  }
</style>
