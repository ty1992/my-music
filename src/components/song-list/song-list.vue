<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-29 11:44:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song, index) in songList" :key="index">
        <div class="content">
          <h2 class="name">{{song.albumname}}</h2>
          <p class="desc">{{getDec(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "song-list",
    props: {
      songList: {
        type: Array,
        default: []
      }
    },
    methods: {
      getDec(song) {
        var {singer} = song
        var dec = ''
        if( singer.length > 1 ){
          singer.forEach((item) =>{
            dec += '/' + item.name
          })
        }else{
          dec += '/' + singer.name
        }
        dec += ' · ' + song.albumname
        return dec.substring(1)
      }
    }
  }
</script>

<style scoped lang="less">
  .song-list {
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: 14px;
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #fff;
      }
      .content{
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .desc {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin-top: 4px;
          color: rgba(255,255,255,0.3);
        }
      }
    }
  }
</style>
