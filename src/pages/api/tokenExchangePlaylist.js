/*
 * @Author: your name
 * @Date: 2022-03-06 15:29:47
 * @LastEditTime: 2022-03-13 12:16:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\pages\api\tokenExchange.js
 */
import fetch from 'isomorphic-unfetch';
import { setAuthCookie,generateAuthToken } from 'src/lib/auth';
import { createClient } from 'redis';
import { useRouter } from 'next/router';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const redirect_play_uri = process.env.NEXT_PUBLIC_REDIRECT_PLAY_URI;
//const redis_secret = process.env.REDIS_SECRET;

const basic = Buffer.from(client_id+":"+client_secret, 'utf8').toString('base64');

//const client = createClient();

//client.connect();

//client.on('connect', function() {
//  console.log('Connected!');
//});

export default async (req, res) => {
  
  const { code } = req.body;
  if (!code) {
    res.status(400).json({ err: "Must specify auth code" });
  }
  else {
      const spotifyRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        code: code,
        redirect_uri: redirect_play_uri,
        grant_type: 'authorization_code',
        scope: "playlist-read-private"
      }).toString(),
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        json: true
      });
    const spotifyResBody = await spotifyRes.json();
    if (spotifyResBody.access_token) {
      //store the access token in server side cache (eg. Redis)
      const token = spotifyResBody.access_token;
      //client.SETEX("token",600,token);
      setAuthCookie(res, generateAuthToken("..."));
      res.status(200).json({token: token});
    } 
    else {
      res.status(401).json({err: spotifyResBody.error_description });
    }
  }
}