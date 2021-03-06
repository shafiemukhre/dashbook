import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControl, MenuItem, Select, InputLabel, FormHelperText} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const {t, i18n } = useTranslation()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [language, setLanguage] = useState('')


  function handleLanguage(e){
    i18n.changeLanguage(e.target.value)
    // setLanguage(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()

    const localhost = 'http://127.0.0.1:5000'
    const endpoint = '/api/signup'
    const url = `${localhost}${endpoint}`
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            un: username,
            em: email,
            pw: password,
            lg: language,
            rl: role,
        })
    }
    fetch(url, requestOptions)
    //using high-order-component withRouter in order to pass props.history
    .then(() => props.history.push('/signin'))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signup.signup')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                // name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label={t('signup.username')}
                autoFocus
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={t('signup.emailaddress')}
                // name="email"
                autoComplete="email"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // name="password"
                label={t('signup.password')}
                type="password"
                id="password"
                autoComplete="current-password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="select-role">{t('signup.role')}</InputLabel>
                <Select
                  labelId="select-role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={'analyst'}>{t('signup.analyst')}</MenuItem>
                  <MenuItem value={'manager'}>{t('signup.manager')}</MenuItem>
                </Select>
                <FormHelperText>{t('signup.required')}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="select-lang">{t('signup.language')}</InputLabel>
                <Select
                  labelId="select-lang"
                  id="lang"
                  // value={language}
                  onChange={handleLanguage}
                >
                  <MenuItem value={'english'}>{t('signup.english')}</MenuItem>
                  <MenuItem value={'bahasa'}>{t('signup.bahasa')}</MenuItem>
                  <MenuItem value={'hindi'}>{t('signup.hindi')}</MenuItem>
                </Select>
                <FormHelperText>{t('signup.required')}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t('signup.signup')}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                {t('signup.already')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(SignUp)