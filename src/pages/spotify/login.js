/*
 * @Author: your name
 * @Date: 2022-03-06 15:29:58
 * @LastEditTime: 2022-03-06 17:22:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\pages\github\login.js
 */
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import SpotifyLoginLink from '../../components/SpotifyLoginLink';

export default function GitHubLogin() {
  const [ error, setError ] = useState("");
  const router = useRouter();

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <SpotifyLoginLink />
    </div>
  );
}
