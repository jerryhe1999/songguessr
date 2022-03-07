/*
 * @Author: your name
 * @Date: 2022-03-06 16:16:11
 * @LastEditTime: 2022-03-06 16:49:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\components\SpotifyLoginLink.js
 */
import React from 'react';

export default function SpotifyLoginLink() {
  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    scope: "user-read-private user-read-email",
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
  })
  const baseUrl = "https://accounts.spotify.com/authorize";
  const url = `${baseUrl}?${queryParams.toString()}`;
  return <a href={url}>Login with Spotify</a>
}
