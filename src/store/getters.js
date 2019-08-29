/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 18:02:28
 * @LastEditTime: 2019-08-29 16:36:38
 * @LastEditors: Please set LastEditors
 */


 export const singer = state => state.singer
 export const playState = state => state.player.playing
 export const playFull = state => state.player.full
 export const playIndex = state => state.player.index
 export const playSongList = state => state.player.songList
 export const playCurrentSong = state => {
     return state.player.songList[state.player.index]
 }