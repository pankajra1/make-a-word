import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import {
  Grid,
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import axios from "axios";

const checkIfWordIsValid = async (word) => {
  const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  await axios
    .get(URL + word, { timeout: 10000 })
    .then((response) => {
      console.log(response);
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

export default function WordGame() {
  const [player, setPlayer] = useState("p1");
  const [loader, setLoader] = useState(false);
  const [result, setResult] = useState(false);
  const [player2, setPlayer2] = useState(false);
  const [player1Word, setPlayer1Word] = useState("");
  const [player2Word, setPlayer2Word] = useState("");
  const [word, setWord] = useState(false);

  const generateRandomAlphabet = () => {
    // Create an array of all the letters in the alphabet
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Get a random index from the array
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    // Return the letter at the random index
    return alphabet[randomIndex];
  };

  const togglePlayer = () => {
    console.log(player);
    player === "p1" ? setPlayer("p2") : setPlayer("p1");
  };

  const handlePlayer1 = () => {
    setPlayer1Word(player1Word.concat(randomAlphabet));
    togglePlayer();
  };

  const handlePlayer2 = () => {
    setPlayer2Word(player2Word.concat(randomAlphabet));
    togglePlayer();
  };

  const [randomAlphabet, setRandomAlphabet] = useState();

  const getRandomAlphabet = () => {
    setRandomAlphabet(generateRandomAlphabet());
  };

  useEffect(() => {
    getRandomAlphabet();
    let word = player === "p1" ? player1Word : player2Word;
    console.log(word.length);
    if (word.length > 3) {
      const isWordValid = checkIfWordIsValid(word);
      if (isWordValid) {
        console.log("The word is valid.");
        setResult(true);
      } else {
        console.log("The word is not valid.");
        setResult(false);
      }
    }
  }, [player, player1Word, player2Word]);

  return (
    <div>
      <Header />
      <Grid
        container
        columnSpacing={1}
        sx={{ height: "100vh", bgcolor: "black", p: 1 }}
      >
        <Grid item xs={4}>
          <Typography sx={{ color: "white" }}>Player 1</Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              m: 2,
            }}
          >
            {player === "p1" && (
              <>
                <Button
                  variant="outlined"
                  sx={{ color: "green", borderColor: "green" }}
                  onClick={handlePlayer1}
                >
                  Add
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "red", borderColor: "red" }}
                  onClick={togglePlayer}
                >
                  Pass
                </Button>
              </>
            )}
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              m: 2,
            }}
          >
            {player1Word !== "" ? (
              Array.from(player1Word).map((alphabet) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      m: 1,
                      height: "50px",
                      width: "50px",
                    }}
                    key={player1Word.indexOf(alphabet)}
                  >
                    {alphabet}
                  </Box>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  m: 1,
                  height: "50px",
                  width: "50px",
                }}
              >
                {" "}
              </Box>
            )}
          </Stack>
          <Grid container direction="row">
            {player1Word.length > 3 ? (
              result ? (
                <Alert
                  sx={{ m: 1, width: "100%" }}
                  variant="filled"
                  severity="info"
                >
                  This is a valid word.
                </Alert>
              ) : (
                <Alert
                  sx={{ m: 1, width: "100%" }}
                  variant="filled"
                  severity="warning"
                >
                  This is a invalid word.
                </Alert>
              )
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "white" }}
        />
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                mt: 12,
                width: 128,
                height: 128,
              },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              sx={{
                fontSize: "60px",
                fontFamily: "cursive",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {randomAlphabet}
            </Paper>
          </Box>
          {loader && (
            <Box sx={{ display: "flex" }}>
              Checking the word ...
              <CircularProgress />
            </Box>
          )}

          {result && (
            <Grid container direction="row">
              <Alert
                sx={{ m: 1, width: "100%" }}
                variant="filled"
                severity="success"
              >
                {player === "p1" ? "Player 1" : "Player 2"} is the winner.
              </Alert>
              <Alert
                sx={{ m: 1, width: "100%" }}
                variant="filled"
                severity="error"
              >
                {player !== "p1" ? "Player 1" : "Player 2"} lost.
              </Alert>
            </Grid>
          )}
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "white" }}
        />
        <Grid item xs={3}>
          <Typography sx={{ color: "white" }}>Player 2</Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              m: 3,
            }}
          >
            {player === "p2" && (
              <>
                <Button
                  variant="outlined"
                  sx={{ color: "green", borderColor: "green" }}
                  onClick={handlePlayer2}
                >
                  Add
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "red", borderColor: "red" }}
                  onClick={togglePlayer}
                >
                  Pass
                </Button>
              </>
            )}
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              m: 2,
            }}
          >
            {player2Word !== "" ? (
              Array.from(player2Word).map((alphabet) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      m: 1,
                      height: "50px",
                      width: "50px",
                    }}
                    key={player2Word.indexOf(alphabet)}
                  >
                    {alphabet}
                  </Box>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  m: 1,
                  height: "50px",
                  width: "50px",
                }}
              >
                {" "}
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
