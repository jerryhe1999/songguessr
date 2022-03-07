/*
 * @Author: your name
 * @Date: 2022-03-06 15:29:58
 * @LastEditTime: 2022-03-06 22:01:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\pages\github\login.js
 */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import SpotifyLoginLink from '../../components/SpotifyLoginLink'

export default function SpotifyLogin() {
  const [ error, setError ] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function exchangeForAccessToken(code) {
      const res = await fetch('/api/tokenExchange', {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          'Content-Type': 'application/json'
        }
      });     
    }
    if (router.query.code) {
      exchangeForAccessToken(router.query.code);
    }
  }, [ router.query.code ]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <SpotifyLoginLink />
    </div>
  );
}
