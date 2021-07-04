import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const kids = [
  "Alia",
  "Daxton",
  "Verity",
  "Levi",
  "Kevin",
  "Jared",
  "Kristie",
  "Leo",
  "Turquoise",
  "Dotty",
  "R-2",
];

const verbs = ["exists", "tickles", "eats", "runs", "jumps", "gives"];

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
];

const adverbs = ["quickly", "speedily", "funnily", "hesitantly"];

// random number between 0 and x
function random(x) {
  return Math.floor(Math.random() * x);
}

function App() {
  const classes = useStyles();
  const [kiddo, setKiddo] = React.useState(null);
  const [adjective1, setAdjective1] = React.useState("");
  const [adjective2, setAdjective2] = React.useState("");

  React.useEffect(() => {
    const adject1 = adjectives[random(adjectives.length)];
    setAdjective1(adject1.charAt(0).toUpperCase() + adject1.slice(1));
    const adject2 = adjectives[random(adjectives.length)];
    setAdjective2(adject2);
  }, [kiddo]);

  const handleChange = (event) => {
    setKiddo(event.target.value);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Which Person and/or Animal?
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
        {kiddo ? (
          <>
            <Typography variant="h2">
              {adjective1} {kiddo} {adverbs[random(adverbs.length)]}{" "}
              {verbs[random(verbs.length)]}!
            </Typography>

            <Typography variant="h3">And guess what else?</Typography>

            <Typography variant="h2" style={{ color: adjective2 }}>
              {kids[random(kids.length)]} is {adjective2}!
              {adjective2 === "sad" ? (
                <SentimentVeryDissatisfiedIcon
                  fontSize="large"
                  color="primary"
                />
              ) : null}
            </Typography>
          </>
        ) : (
          "CHOOSE!"
        )}
      </Container>
    </div>
  );
}

export default App;
