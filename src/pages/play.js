import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import data from "./api/dummy_data_play.json";
import { Carousel, Card, Image, Container, Form } from "react-bootstrap";
import styles from "../styles/Play.module.css";
import { useRouter } from "next/router";
import ReactAudioPlayer from "react-audio-player";

export default function play() {
  const [ error, setError ] = useState("");
  const [ allRounds, setAllRounds ] = useState([]);
  const [ theScore, setScore ] = useState(0);
  const [ answerStatus, setAnswerStatus ] = useState("");
  const [ roundCounter, setRoundCounter ] = useState(1);
  const [ songUrl, setSongUrl ] = useState("");
  const [ correctSongs, setCorrectSongs ] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const router = useRouter();
  const ref = useRef(null);
  const nextRound = () => {
    ref.current.next();
  }
  const incrementRound = () => {
    setRoundCounter(roundCounter + 1);
  }
  //var correctSongs = [];
  var songs;
  var playlists;
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

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
      if (timeLeft < 0) {
        // never reached?
        console.log("!!!") // never logs
        setAnswerStatus("Incorrect")
        setRoundCounter(prevCount => prevCount + 1)
        setTimeout(function() {
          setAnswerStatus("")
          nextRound();
          nextSong();
          setTimeLeft(30);
        }, 5000)
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function handleRadioBtn(e){
    console.log(e)
    if (e.target.value === "true") {
      console.log("Correct!!!")
      setAnswerStatus("Correct!!!")
      setScore(theScore + 100)
      setRoundCounter(prevCount => prevCount + 1)
    } else {
      setAnswerStatus("Incorrect")
      setRoundCounter(prevCount => prevCount + 1)
    }
    
    // Give user time to acknowledge result
    setTimeout(function() {
      setAnswerStatus("")
      nextRound();
      nextSong();
    }, 5000)
  }

  function nextSong() {
    
    incrementRound();
    console.log("roundCounter after inc", roundCounter)
    console.log("==inside nextSong call", correctSongs)
    console.log("song to be played next", correctSongs[roundCounter])
    setSongUrl(correctSongs[roundCounter])
  }

  // Randomize order for correct song
  function randomizer() {
    console.log("gameSongs before randomization", gameSongs)
    for (var i = 0; i < 3; i++) {
      gameSongs.round[i].songs.sort(() => Math.random() - 0.5)
    }
    console.log("gameSongs after randomization", gameSongs)
  }

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
          if (spotifySongsResBody) {
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
                  console.log("correctSongs after set",correctSongs)
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
              // create list of correct songs for audio output
            }
            // Initial song declaration
            randomizer();
            console.log("==game songs", gameSongs)
            console.log("==correct songs", correctSongs)
            for (var i = 0; i < 3; i++) {
              for (var j = 0; j < 3; j++) {
                if (gameSongs.round[i].songs[j].guessedCorrect) {
                  console.log("guessedCorrect found for round: ", i, gameSongs.round[i].songs[j])
                  if (i == 0) {
                    setCorrectSongs([gameSongs.round[i].songs[j].preview_url])
                    // special case for first. currentSongs is empty on first render
                    setSongUrl(gameSongs.round[i].songs[j].preview_url) 
                  } else {
                    setCorrectSongs((currentState) => [...currentState, gameSongs.round[i].songs[j].preview_url])
                  }
                }
              }
            }
            console.log("==correct songs", correctSongs)
            console.log("==game songs randomized", gameSongs)
            setAllRounds(gameSongs.round)
          }
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
      <h3 className="text-md-center pt-5">Time Left: {timeLeft} Seconds</h3>
      <h3 className="text-md-center pt-5">{answerStatus}</h3>
      <ReactAudioPlayer src={songUrl} autoPlay={true} volume={0.3}/>
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
