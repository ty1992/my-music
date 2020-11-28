/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-04-16 22:52:25
 * @LastEditTime: 2019-09-02 09:39:53
 * @LastEditors: Please set LastEditors
 */
import jsonpOrigin from 'jsonp';

export default function myJsonp(url, data, option){
  url += ((url.indexOf('?') > 0) ? '&' : '?') + parse(data);
  return new Promise( (resolve, reject) => {
    jsonpOrigin( url, option, (err, data) => {
      if( !err  ){
        resolve(data);
      }else{
        reject( err );
      }
    } )
  } )
}
//https:baidu.com?name=nan&sex=nv&sdfdf=10

function parse(data){
  var url = '';
  for( let k in data ){
    url += '&' + k + '=' + (data[k] ? data[k] : undefined);
    //url +=  data[k] == undefined ? '' : data[k];
  }
  return url ? url.substring(1) : '';
}
