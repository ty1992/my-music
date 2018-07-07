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
