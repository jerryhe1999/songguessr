/*
 * @Author: your name
 * @Date: 2022-03-06 15:29:47
 * @LastEditTime: 2022-03-06 22:10:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\pages\api\tokenExchange.js
 */
import fetch from 'isomorphic-unfetch';
import { useState } from 'react';

export default async (req, res) => {
  const [ user, setUser ] = useState({});
  const { token } = req.body;
  console.log("req==", req)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/user');
      if (res.status === 401) {
        console.log("== Error: Unauthorized");
      } else {
        const body = await res.json();
        setUser(body);
      }
    }
    fetchData();
  }, []);
  console.log("user===", user)
  if (!token) {
    res.status(400).send({ err: "Must specify auth code" });
  }
  else {
    const Res = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      });

    if (res.status !== 200) {
		return null;
    }

    const resBody = await res.json();
    currentplaylist = resBody.items;

    return currentplaylist;

  }
}