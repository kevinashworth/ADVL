import React, { useState } from "react";
import { createApi } from "unsplash-js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import {
  capitalize,
  randomArrayEntry,
  randomNumber,
  randomVariant,
} from "./utils";

import { adjectives, adverbs, animals, kids, verbs } from "./data";

const unsplash = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

const useStyles = makeStyles((theme) => ({
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
  const [person, setPerson] = useState("");
  const [adjective1, setAdjective1] = useState("red");
  const [adjective2, setAdjective2] = useState("green");
  // const [color, setColor] = useState("red");
  const [pet, setPet] = useState("");
  const [petImageUrl, setPetImageUrl] = useState("");

  const getImageUrlFromUnsplash = (pet) => {
    unsplash.photos
      .getRandom({ query: pet })
      .then((result) => {
        if (result.errors) {
          console.log("getRandomImageUrl error occurred: ", result.errors[0]);
        } else {
          const photo = result.response;
          console.log("getRandomImageUrl photo:", photo.urls.small);
          return photo.urls.small;
        }
      })
      .then((url) => {
        setPetImageUrl(url);
      });
    // unsplash.search
    //   .getPhotos({
    //     query: pet,
    //     color
    //   })
    //   .then((result) => {
    //     if (result.errors) {
    //       console.log("getImageUrlFromUnsplash error:", result.errors[0]);
    //     } else {
    //       console.log("getImageUrlFromUnsplash success:", result.response);
    //       const { total, total_pages, results } = result.response;
    //       if (total > 0 && results.length > 0) {
    //         let randomIndex;
    //         if (total_pages > 1) {
    //           randomIndex = randomNumber(10);
    //         } else {
    //           randomIndex = randomNumber(total);
    //         }
    //         const imageUrl = results[randomIndex].urls.small;
    //         return imageUrl;
    //       }
    //     }
    //   })
    //   .then((url) => {
    //     setPetImageUrl(url);
    //   });
  };

  const resetStuff = () => {
    const adject1 = randomArrayEntry(adjectives);
    setAdjective1(capitalize(adject1));
    const adject2 = randomArrayEntry(adjectives);
    setAdjective2(adject2);
    // setColor(randomArrayEntry(unsplashColors));
    const pet = randomArrayEntry(animals);
    setPet(pet);
    getImageUrlFromUnsplash(pet);
  };

  const handleChange = async (event) => {
    setPerson(event.target.value);
    resetStuff();
  };

  const getNextKid = () => {
    const currentKid = person;
    const currentKidId = kids.findIndex((kid) => kid === currentKid);
    let nextKidId = currentKidId + 1;
    if (nextKidId > kids.length - 1) {
      nextKidId = 0;
    }
    console.log({ currentKid });
    console.log(nextKidId, kids[nextKidId]);
    setPerson(kids[nextKidId]);
    resetStuff();
  };

  const startOver = () => {
    setPerson("");
    setPetImageUrl("");
    resetStuff();
  };

  return (
    <Container>
      <Hidden mdDown>
        <lite-youtube
          videoid="dQw4w9WgXcQ"
          playlabel="Something Just For You"
        ></lite-youtube>
      </Hidden>
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
                value={person}
                onChange={handleChange}
              >
                {kids.map((kid) => (
                  <MenuItem key={kid} value={kid}>
                    {kid}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {person && (
              <>
                <Button variant="outlined" color="primary" onClick={startOver}>
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
          {person ? (
            <>
              <Typography variant={randomVariant()} gutterBottom>
                {adjective1} {person} {adverbs[randomNumber(adverbs.length)]}{" "}
                {verbs[randomNumber(verbs.length)]}.
              </Typography>

              <Typography variant="body1" gutterBottom>
                And guess what else?
              </Typography>

              <Typography
                variant={randomVariant()}
                style={{ color: adjective2 }}
                gutterBottom
              >
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
              <Typography variant="body1" gutterBottom>
                And guess what else?
              </Typography>
              <Typography variant={randomVariant()} gutterBottom>
                {person} owns a {pet}!
              </Typography>
              <Typography variant="body1" gutterBottom>
                And this is what it looks like:
              </Typography>
              <img src={petImageUrl} alt={`${person}'s ${pet}`} width="100%" />
            </>
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
