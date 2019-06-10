import jsonp from 'common/js/jsonp';
import axios from 'axios';
import { commonParams, options } from './config';

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5',
        format: 'jsonp'
    })

    return jsonp(url, data, options)
}

export function search(query, page, perpage) {
    const url = '/api/search'

    const data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        perpage,
        n: perpage,
        catZhida: 0,
        zhidaqu: 0,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5'


        // is_xml:0,
        // key:query,
        // g_tk:6675832,
        // loginUin:546658991,
        // hostUin:0,
        // format:'json',
        // inCharset:'utf8',
        // outCharset:'utf-8',
        // notice:0,
        // platform:'yqq.json',
        // needNewCode:0
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

