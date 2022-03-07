/*
 * @Author: your name
 * @Date: 2022-03-06 17:19:29
 * @LastEditTime: 2022-03-06 17:26:58
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\pages\spotify\index.js
 */
import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Home() {
  const [ user, setUser ] = useState({});

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

  return (
    <div>
      <h1>Spotify login required</h1>
      {user.name && <p>Name: {user.name}</p>}
      {user.email && <p>Email: {user.email}</p>}
    </div>
  );
}
