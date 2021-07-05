import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

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
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const kids = ["Alia", "Daxton", "Verity", "Levi", "Kevin", "Jared", "Kristie"];

const verbs = [
  "exists",
  "tickles",
  "eats",
  "runs",
  "jumps",
  "gives",
  "hides",
  "sleeps",
  "loves",
];

const adjectives = [
  "red",
  "braggy",
  "sad",
  "orange",
  "happy",
  "oblong",
  "hot",
  "shy",
  "frightening",
  "blue",
  "angry",
  "funny",
  "boring",
  "silly",
  "adorable",
  "cool",
  "cute",
  "dorky",
  "elegant",
  "fancy",
  "glamorous",
  "gorgeous",
  "handsome",
  "brilliant",
  "intelligent",
  "lazy",
  "magnificent",
  "smart",
  "sensible",
  "asleep",
];

const adverbs = [
  "quickly",
  "speedily",
  "funnily",
  "hesitantly",
  "smartly",
  "well",
];

const animals = [
  "grizzly bear",
  "rabbit",
  "cat",
  "chicken",
  "dolphin",
  "gecko",
  "salamander",
  "housefly",
  "cricket",
];

// random number between 0 and x
function random(x) {
  return Math.floor(Math.random() * x);
}

function App() {
  const classes = useStyles();
  const [kiddo, setKiddo] = useState(null);
  const [adjective1, setAdjective1] = useState("");
  const [adjective2, setAdjective2] = useState("");
  const [pet, setPet] = useState("");
  const [petImageUrl, setPetImageUrl] = useState("");

  useEffect(() => {
    const adject1 = adjectives[random(adjectives.length)];
    setAdjective1(adject1.charAt(0).toUpperCase() + adject1.slice(1));
    const adject2 = adjectives[random(adjectives.length)];
    setAdjective2(adject2);
    setPet(animals[random(animals.length)]);
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
            const imageUrl = result.response.results[random(10)].urls.small;
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
    <Box m={1} p={1}>
      <Container maxWidth="sm">
        {kiddo ? (
          <>
            <Typography variant="h4">
              {adjective1} {kiddo} {adverbs[random(adverbs.length)]}{" "}
              {verbs[random(verbs.length)]}!
            </Typography>

            <Typography variant="body1">And guess what else?</Typography>

            <Typography variant="h4" style={{ color: adjective2 }}>
              {kids[random(kids.length)]} is {adjective2}!
            </Typography>
            {adjective2 === "sad" ? (
              <SentimentVeryDissatisfiedIcon fontSize="large" color="primary" />
            ) : null}
            {adjective2 === "happy" ? (
              <SentimentVerySatisfiedIcon fontSize="large" color="secondary" />
            ) : null}
            <Typography variant="body1">And guess what else?</Typography>
            <Typography variant="h4">
              {kiddo} owns a {pet}!
            </Typography>
            <Typography variant="body1">
              And this is what it looks like:
            </Typography>
            <img
              src={petImageUrl}
              alt={`very accurate phone of ${kiddo}'s animal`}
              width="100%"
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setKiddo(null)}
            >
              Start Over
            </Button>
            <Button variant="outlined" color="secondary" onClick={getNextKid}>
              Somebody Else
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h3">CHOOSE!</Typography>
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
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;
