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
  try {
    const response = await axios.get(URL + word, { timeout: 10000 });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
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
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZUAAAEEIIOOU";

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
    if (word.length >= 4) {
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
        sx={{ height: "100vh", bgcolor: "#f0f0f0", p: 1 }}
      >
        <Grid item xs={4}>
          <Typography sx={{ color: "#333333", fontWeight: "bold" }}>Player 1</Typography>
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
                  variant="contained"
                  sx={{ bgcolor: "#4CAF50", color: "#ffffff", "&:hover": { bgcolor: "#388E3C" } }}
                  onClick={handlePlayer1}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#F44336", color: "#ffffff", "&:hover": { bgcolor: "#D32F2F" } }}
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
              Array.from(player1Word).map((alphabet, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#ffffff",
                      color: "#333333",
                      m: 1,
                      height: "50px",
                      width: "50px",
                      borderRadius: "5px",
                    }}
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
                  bgcolor: "#ffffff",
                  m: 1,
                  height: "50px",
                  width: "50px",
                  borderRadius: "5px",
                }}
              >
                {" "}
              </Box>
            )}
          </Stack>
          <Grid container direction="row">
            {player1Word.length >= 4 ? (
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
                  This is an invalid word.
                </Alert>
              )
            ) : (
              <Typography sx={{ m: 1 }}></Typography>
            )}
          </Grid>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#333333" }}
        />
        <Grid item xs={4} sx={{ textAlign: "center" }}>
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
                bgcolor: "#ffffff",
                color: "#333333",
                padding: "10px",
                borderRadius: "10px",
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
          sx={{ borderColor: "#333333" }}
        />
        <Grid item xs={3}>
          <Typography sx={{ color: "#333333", fontWeight: "bold" }}>Player 2</Typography>
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
                  variant="contained"
                  sx={{ bgcolor: "#4CAF50", color: "#ffffff", "&:hover": { bgcolor: "#388E3C" } }}
                  onClick={handlePlayer2}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#F44336", color: "#ffffff", "&:hover": { bgcolor: "#D32F2F" } }}
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
              Array.from(player2Word).map((alphabet, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#ffffff",
                      color: "#333333",
                      m: 1,
                      height: "50px",
                      width: "50px",
                      borderRadius: "5px",
                    }}
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
                  bgcolor: "#ffffff",
                  m: 1,
                  height: "50px",
                  width: "50px",
                  borderRadius: "5px",
                }}
              >
                {" "}
              </Box>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
          <Typography sx={{ color: "#333333", fontStyle: "italic" }}>
            Rules:
            <br />
            1. Minimum 4 lettered word is allowed.
            <br />
            2. Add or pass the letter to make your word.
            <br />
            3. The game happens turn by turn.
            <br />
            4. The first to make a valid 4 or more lettered word wins.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
