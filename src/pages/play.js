import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import data from "./api/dummy_data_play.json";
import { Carousel, Card, Image, Container, Form } from "react-bootstrap";
import styles from "../styles/Play.module.css";
import { useRouter } from "next/router";

export default function play() {
  const [ error, setError ] = useState("");
  const router = useRouter();
  const [ round1, setRound1 ] = useState([]);
  const [ round2, setRound2 ] = useState([]);
  const [ round3, setRound3 ] = useState([]);
  const [ allRounds, setAllRounds ] = useState([]);

  var songs;
  var gameSongs = {
    round: [
      {
        songs: [{}],
      },
      {
        songs: [{}],
      },
      {
        songs: [{}],
      }
    ]
  };
    
  var playlists;
  useEffect(() => {
    async function exchangeForAccessToken(code) {
      const res = await fetch('/api/tokenExchangePlaylist', {
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
        console.log("token ==", token);
        const spotifyPlaylistRes = await fetch('https://api.spotify.com/v1/me/playlists', {
          method: 'GET',
          headers: {
              Authorization: "Bearer " + token
          }
        });
        const spotifyPlaylistResBody = await spotifyPlaylistRes.json();
        console.log("spotify playlist return===", spotifyPlaylistResBody);
        if (spotifyPlaylistRes.status !== 200) {
          setError(resBody.err)
        } else {
          playlists = spotifyPlaylistResBody.items
          console.log("playlists", playlists)
          const playlistID = playlists[0].id
          const spotifySongsRes = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
          });
          const spotifySongsResBody = await spotifySongsRes.json();
          console.log("songs of first playlist in playlists===", spotifySongsResBody);
          songs = spotifySongsResBody.items
          // for each round
          for (var i = 0; i < 3; i++) {
            // for each song in the round
            for (var j = 0; j < 3; j++) {
              if (j == 0) {
                // first song, make this the right answer for prototype testing
                var randNum = Math.floor(Math.random() * (songs.length-1))
                songs[randNum].track.artist = songs[randNum].track.artists[0].name
                songs[randNum].track.albumName = songs[randNum].track.album.name
                songs[randNum].track.guessedCorrect = true
                gameSongs.round[i].songs[j] = songs[randNum].track
              
              } else {
                // !!! has possibility to duplicate choice
                // Create check to prevent same song being chosen twice
                var randNum = Math.floor(Math.random() * (songs.length-1))
                songs[randNum].track.artist = songs[randNum].track.artists[0].name
                songs[randNum].track.albumName = songs[randNum].track.album.name
                songs[randNum].track.guessedCorrect = false
                gameSongs.round[i].songs[j] = songs[randNum].track
              }
            }
            
          }
          console.log("chosen songs==", gameSongs)
          setRound1(gameSongs.round[0].songs)
          setRound2(gameSongs.round[1].songs)
          setRound3(gameSongs.round[2].songs)
          setAllRounds(gameSongs.round)
        }
      }
    }
    if (router.query.code) {
      exchangeForAccessToken(router.query.code);
    }
  }, [ router.query.code ]);

  /*
  const round1 = gameSongs.round[0].songs
  const round2 = gameSongs.round[1].songs
  const round3 = gameSongs.round[2].songs
  */
  /*
  return (
    <Layout title="Play" css={false}>
      {error && <p>Error: {error}</p>}
      <h1 className="text-md-center pt-5">Time Left: 15 Seconds</h1>
      <Carousel style={{ width: "100vw" }} interval={null} wrap={false}>
        {data.map((item, key) => (
          <Carousel.Item eventKey={key}>
            <Container>
              <div key={key} className={styles.carItem}>
                <div className={styles.carPhoto}>
                  <Image src={data.image} width={360} height={180} />
                </div>
                <div className={styles.carPhoto}>
                <Card className={"bg-dark text-white"}  style={{ width: '30rem' }} border="success">
                  <Container>
                  <Form className="text-md-center p-2">
                    <Form.Check
                      type={"radio"}
                      id={key}
                      label={item.option_1}
                      name={`group${key}`}
                      isValid
                    />
                    <Form.Check
                      type={"radio"}
                      id={key}
                      label={item.option_2}
                      name={`group${key}`}
                      isValid
                    />
                    <Form.Check
                      type={"radio"}
                      id={key}
                      label={item.option_3}
                      name={`group${key}`}
                      isValid
                    />
                  </Form>
                  </Container>  
                </Card>
                </div>
              </div>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </Layout>
  );
  */
  
  return (
    <Layout title="Play" css={false}>
      {error && <p>Error: {error}</p>}
      <h1 className="text-md-center pt-5">Time Left: 15 Seconds</h1>
      <Carousel style={{ width: "100vw" }} interval={null} wrap={false}>
        {allRounds.map((round, key) => console.log("==round", round) || (
          <Carousel.Item eventKey={key}>
            <Container>
              <div key={key} className={styles.carItem}>
                <div className={styles.carPhoto}>
                  <Image src={data.image} width={360} height={180} />
                </div>
                <div className={styles.carPhoto}>
                <Card className={"bg-dark text-white"}  style={{ width: '30rem' }} border="success">
                  <Container>
                  <Form className="text-md-center p-2">
                    {round.songs.map((item, key1) => console.log("==item", item) || (
                    <Form.Check
                      type={"radio"}
                      id={key1}
                      label={`${item.artist}, ${item.name}, ${item.albumName}`}
                      name={`group${key1}`}
                      isValid
                    />
                    ))}
                  </Form>
                  </Container>  
                </Card>
                </div>
              </div>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </Layout>
  );
  
}
