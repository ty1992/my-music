import { create } from "domain";

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 16:45:39
 * @LastEditTime: 2019-09-02 10:24:43
 * @LastEditors: Please set LastEditors
 */

class Song {
    constructor(id, name, albummid, albumname, interval, singer) {
        this.id = id;
        this.name = name;
        this.albummid = albummid;
        this.albumname = albumname;
        this.interval = interval;
        this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.albummid}.jpg?max_age=2592000`;
                 // http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400003clL2S0lVVSF.m4a?guid=7830235796&vkey=82AE37EB289ED692FF98B34B9B4AC9CA86AFBB749DEB780A25D09D0CF963373EB18C9980D77D5F25348C21E4EAEE7E908B822F32F1ABAA03&uin=0&fromtag=38
        this.url = `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${this.id}.m4a?guid=4604207596&vkey=AF0401EEB7E1971012D569AD1028EAECC3EF3BE9FFE959BC132FB236F68817D33C9027289089BDD915A7AA00E546BDD307D1E500BE8BFA74&uin=0&fromtag=38`,
        this.singer = singer;
    }

    lyric(){
        
    }
}

export const createSong = function (data) {
    return new Song(
        data.musicData.songmid,
        data.musicData.songname,
        data.musicData.albummid,
        data.musicData.albumname,
        data.musicData.interval,
        _formatSinger(data.musicData.singer)
    )
}

function _formatSinger(singers){
    let arr = [];
    singers.forEach(element => {
        arr.push(element.name)
    });
    return arr.join(' / ')
}




