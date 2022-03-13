/*
 * @Author: your name
 * @Date: 2022-03-06 15:29:47
 * @LastEditTime: 2022-03-13 06:01:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\pages\api\tokenExchange.js
 */
import fetch from 'isomorphic-unfetch';
import { setAuthCookie,generateAuthToken } from 'src/lib/auth';

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

const basic = Buffer.from(client_id+":"+client_secret, 'utf8').toString('base64');

export default async (req, res) => {
  
  const { code } = req.body;
  if (!code) {
    res.status(400).send({ err: "Must specify auth code" });
  }
  else {
      const spotifyRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
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
      setAuthCookie(res, generateAuthToken("..."));
      res.status(200).send({ msg: "OK!" });
    } 
    else {
      res.status(401).send({ err: spotifyResBody.error_description });
    }
  }
}