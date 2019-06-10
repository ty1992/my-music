import { commonParams, options } from './config.js';
import myJsonp from 'common/js/jsonp.js';


export function getSingerList() {
    var url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })

    return myJsonp(url, data, options);
}