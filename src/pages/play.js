import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import data from "./api/dummy_data_play.json";
import { Carousel, Card, Image, Container, Form } from "react-bootstrap";
import styles from "../styles/Play.module.css";
import { useRouter } from "next/router";



export default function play() {
  const [ error, setError ] = useState("");
  const [ allRounds, setAllRounds ] = useState([]);
  const [ secondsRemaining, setSecondsRemaining ] = useState(30);
  const [ theScore, setScore ] = useState(0);
  const [ answerStatus, setAnswerStatus ] = useState("")
  const router = useRouter();
  const ref = useRef(null);
  const nextRound = () => {
    ref.current.next();
  }

  function handleRadioBtn(e){
    console.log(e)
    if (e.target.value === "true") {
      console.log("Correct!!!")
      setAnswerStatus("Correct!!!")
      setScore(theScore + 100)
    } else {
      setAnswerStatus("Incorrect")
    }
    // Give user time to acknowledge result
    setTimeout(function() {
      setAnswerStatus("")
      nextRound();
    }, 5000)
    
  }

  const settings = {
    infinite: true,
    wrap: false,
    arrows: false,
  };

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
            // Randomize order for correct song
            gameSongs.round[i].songs.sort(() => Math.random() - 0.5)
          }
          console.log("chosen songs==", gameSongs)
          setAllRounds(gameSongs.round)
        }
      }
    }
    if (router.query.code) {
      exchangeForAccessToken(router.query.code);
    }
  }, [ router.query.code ]);
  
  return (
    <Layout title="Play" css={false}>
      {error && <p>Error: {error}</p>}
      <h3 className="text-md-center pt-3">Score: {theScore}</h3>
      <h3 className="text-md-center pt-5">Time Left: {secondsRemaining} Seconds</h3>
      <h3 className="text-md-center pt-5">{answerStatus}</h3>
      <Carousel 
        ref={ref} style={{ width: "100vw" }} controls={false} interval={null} 
        wrap={false} prevIcon={false} nextIcon={false} indicators={false}
      >
        {allRounds.map((round, key) => (
          <Carousel.Item eventKey={key}>
            <Container>
              <div key={key} className={styles.carItem}>
                <div className={styles.carPhoto}>
                  <Image src={data.image} width={360} height={180} />
                </div>
                <div className={styles.carPhoto}>
                <Card className={"bg-dark text-white"}  style={{ width: '30rem' }} border="success">
                  <Container>
                  <Form className="text-md-left p-2">
                    {round.songs.map((item, key1) => (
                    <Form.Check
                      onClick={(e) => handleRadioBtn(e)}
                      type={"radio"}
                      guessedCorrect={item.guessedCorrect}
                      id={key}
                      label={`${item.artist}, ${item.name}, ${item.albumName}`}
                      name={`group${key}`}
                      value={item.guessedCorrect}
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
