/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-09-02 10:16:04
 * @LastEditors: Please set LastEditors
 */
import { commonParams, options } from './config.js';
import myJsonp from 'common/js/jsonp.js'
import axios from 'axios'

export function getSongList(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId
  })

  return myJsonp(url, data, options)
}


export function getLyric(){
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios.get(url).then(res => {
    console.log(res)
  })
}
getLyric();
