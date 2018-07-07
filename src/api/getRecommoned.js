import {commonParams,options} from  './config.js';
import axios from 'axios';
import myJsonp from 'common/js/jsonp.js'

export function getRecommoned() {
  var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  return myJsonp(url, commonParams, options);
}

export function getDiscList() {
  const url = '/api/recommoned'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
