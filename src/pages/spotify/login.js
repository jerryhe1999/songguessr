/*
 * @Author: your name
 * @Date: 2022-03-06 15:29:58
 * @LastEditTime: 2022-03-13 13:10:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \cs499\song-guessr\src\pages\github\login.js
 */
import Layout from 'src/components/Layout';
import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SpotifyLoginLink from '../../components/SpotifyLoginLink';
import SpotifyPlayLink from 'src/components/SpotifyPlayLink';

export default function SpotifyLogin() {
  const [ user, setUser ] = useState({});
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
      const resBody = await res.json();
      if(res.status !== 200) {
        setError(resBody.err)
      }
      else {
        const { token } = resBody;
        console.log("== Auth succeeded!");
        console.log(token);
        const spotifyRes = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {
              Authorization: "Bearer " + token
          }
      });
      const spotifyResBody = await spotifyRes.json();
      console.log("spotify return===", spotifyResBody);
      setUser(spotifyResBody);
      }
    }
    if (router.query.code) {
      exchangeForAccessToken(router.query.code);
    }
  }, [ router.query.code ]);
  
  var count = 0;
  return (
    <Layout title="Spotify login" css={false}>
    <Row className="align-items-center pt-5">
    <Col>
      {error && <p className="text-md-center text-light">Error: {error}</p>}
      <h1 className="text-md-center text-light">{user.display_name ? "Spotify logged in": "Spotify login required"}</h1>
    </Col>
    </Row>
    <Row className="align-items-center pt-5">
    <Col>
      {user.display_name && <p className="text-md-center text-light">Name: {user.display_name}</p>}
      {user.email && <p className="text-md-center text-light">Email: {user.email}</p>}
    </Col>
    </Row>
    <Row className="align-items-center">
    <Col>
      <SpotifyPlayLink />
    </Col>
    </Row>
    </Layout>
  );
}
