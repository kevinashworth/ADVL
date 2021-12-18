import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { randomArrayEntry, randomNumber, capitalize, randomVariant } from "./utils";

import { kids, verbs, adjectives, adverbs, animals } from "./data";

const unsplash = createApi({
  accessKey: "hmm",
});

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 84,
    width: 84,
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [kiddo, setKiddo] = useState("");
  const [adjective1, setAdjective1] = useState("");
  const [adjective2, setAdjective2] = useState("");
  const [pet, setPet] = useState("");
  const [petImageUrl, setPetImageUrl] = useState("");

  useEffect(() => {
    const adject1 = randomArrayEntry(adjectives);
    setAdjective1(capitalize(adject1));
    const adject2 = randomArrayEntry(adjectives);
    setAdjective2(adject2);
    setPet(randomArrayEntry(animals));
  }, [kiddo]);

  useEffect(() => {
    const getImageUrlFromUnsplash = () => {
      unsplash.search
        .getPhotos({
          query: pet,
          page: 1,
          perPage: 10,
          color: adjective1,
          orientation: "landscape",
        })
        .then((result) => {
          if (result.errors) {
            // handle error here
            console.log("unsplash error occurred: ", result.errors[0]);
          } else if (result.type === "success") {
            const imageUrl =
              result.response.results[randomNumber(10)].urls.small;
            setPetImageUrl(imageUrl);
          }
        });
    };
    getImageUrlFromUnsplash();
  }, [adjective1, pet]);

  const handleChange = (event) => {
    setKiddo(event.target.value);
  };

  const getNextKid = () => {
    const currentKid = kiddo;
    const currentKidId = kids.findIndex((kid) => kid === currentKid);
    let nextKidId = currentKidId + 1;
    if (nextKidId > kids.length - 1) {
      nextKidId = 0;
    }
    console.log({ currentKid });
    console.log(nextKidId, kids[nextKidId]);
    setKiddo(kids[nextKidId]);
    // return kids[nextKidId];
  };

  return (
    <Container>
      <Grid container spacing={9}>
        <Grid item xs={12} sm={4} md={3}>
          <>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Which Person?
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kiddo}
                onChange={handleChange}
              >
                {kids.map((kid) => (
                  <MenuItem key={kid} value={kid}>
                    {kid}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {kiddo && (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setKiddo("")}
                >
                  Start Over
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={getNextKid}
                >
                  Somebody Else
                </Button>
              </>
            )}
          </>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {kiddo ? (
            <>
              <Typography variant={randomVariant()} gutterBottom>
                {adjective1} {kiddo} {adverbs[randomNumber(adverbs.length)]}{" "}
                {verbs[randomNumber(verbs.length)]}.
              </Typography>

              <Typography variant="body2" gutterBottom>
                And guess what else?
              </Typography>

              <Typography variant="h4" style={{ color: adjective2 }}>
                {kids[randomNumber(kids.length)]} is {adjective2}.
              </Typography>
              {adjective2 === "sad" ? (
                <SentimentVeryDissatisfiedIcon
                  fontSize="large"
                  color="primary"
                />
              ) : null}
              {adjective2 === "happy" ? (
                <SentimentVerySatisfiedIcon
                  fontSize="large"
                  color="secondary"
                />
              ) : null}
              <Typography variant="body2" gutterBottom>
                And guess what else?
              </Typography>
              <Typography variant="h4" gutterBottom>
                {kiddo} owns a {pet}!
              </Typography>
              <Typography variant="body1" gutterBottom>
                And this is what it looks like:
              </Typography>
              <img
                src={petImageUrl}
                alt={`photo of ${kiddo}'s ${pet}`}
                width="100%"
              />
            </>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
