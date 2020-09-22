import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import SecurityIcon from "@material-ui/icons/Security";
import { makeStyles } from "@material-ui/core";
import firebaseDb from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 300,
  },
}));

const Usercheck = () => {
  const classes = useStyles();

  const preventDefault = (event) => event.preventDefault();

  const authKey = {
    passcode: "000000",
  };

  var [values, setValues] = useState(authKey);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    firebaseDb.child("authkey").once("value", (snapshot) => {
      var dbAuth = snapshot.val();
      var keys = Object.keys(dbAuth);
      if (dbAuth[keys[0]].passcode === values.passcode) {
        console.log("Verified");
      } else {
        console.log(keys);
      }
    });
  };

  return (
    <div className={classes.root}>
      <Box mt={22} ml={45} display="flex">
        <Typography variant="h4" component="h1">
          Inlens web
        </Typography>
      </Box>
      <Paper className={classes.paper}>
        <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Box display="flex" justifyContent="flex-end">
                <LockIcon color="primary" />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Enter Passcode"
                variant="outlined"
                size="small"
                name="passcode"
                value={values.passcode}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Verify
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Box display="flex" alignItems="center" justifyContent="center" m={2}>
        <SecurityIcon color="primary" />
        <Link href="#" onClick={preventDefault} color="inherit">
          Our Privacy Policy
        </Link>
      </Box>
    </div>
  );
};

export default Usercheck;
