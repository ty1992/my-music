/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-04 17:46:32
 * @LastEditTime: 2019-08-29 16:47:28
 * @LastEditors: Please set LastEditors
 */


export default class Singer{
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`;
    }
}