import * as React from 'react';
import { jwtDecode } from 'jwt-decode';
import { enqueueSnackbar } from 'notistack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FcGoogle } from "react-icons/fc";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import AnimatedXPage from '../Animations/AnimatedXPage';
import { helix } from 'ldrs';
import { AppContext } from '../../App';
import { useAppContext } from '../../services/utilities';
import ReCAPTCHA from "react-google-recaptcha";
import GoogleSigninButton from './Google/GoogleSignInButton';
import api from '../../api';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Gad-Ongoro/lisha">
        GOFoods
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  helix.register();
  const { googleLogin } = useAppContext();
  const { setAuth, loading, setLoading } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({});
  const [recaptchaValue, setRecaptchaValue] = React.useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!recaptchaValue) {
      enqueueSnackbar('Please complete the ReCAPTCHA', { variant: 'error' });
      return;
    }
    try {
      setLoading(true);
      api.post('token/', { ...inputs, recaptcha: recaptchaValue })
      .then((res) => {
        if(res.status === 200){
          const user_id = jwtDecode(res.data.access).user_id;
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
          setAuth(true);
          setLoading(false);
          enqueueSnackbar(`Successfully logged in`, { variant: 'success' });
          navigate(`/account/${user_id}/dashview`);
        };
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(`${err.response.data.detail}`, { variant: 'error' });
      });
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(`${err.response.data.detail}`, { variant: 'error' });
    }
  };

  const signinLoader = (
    <div className='flex items-center justify-center rotate-90'>
			<l-helix
				size="50"
				speed="2.5" 
				color="green" 
        className=""
			></l-helix>
		</div>
  );

  return (
    <div className='bg-gray-900'>
      <AnimatedXPage>
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url("/images/signinimg.jpg")',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'left',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <NavLink to={"/"}>
                  <h2 className='text-green-500 text-3xl font-bold'>
                    <i>GOFoods</i>
                  </h2>
                </NavLink>
                <h2 className='font-bold text-2xl'>Welcome Back!</h2>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                  <div className='grid justify-center items-center'>
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                      onChange={handleRecaptchaChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    Sign In
                  </Button>

                  <p className='text-center'>OR</p>
									{/* <div className='flex justify-center items-center' onClick={() => googleLogin()}>
										<section className='w-3/4 flex justify-center items-center text-center border rounded-lg'>
											<FcGoogle size={30}/>
											<Button>Continue with Google</Button>
										</section>
									</div> */}

                  <GoogleSigninButton></GoogleSigninButton>

                  { loading && signinLoader }
                  <Grid container marginTop={2}>
                    <Grid item xs>
                      <NavLink to="/password/reset" variant="body2">
                        Forgot password?
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink to="/account/signup" variant="body2">
                        Don't have an account? <span className='text-blue-500 cursor-pointer hover:text-blue-600 transition duration-300 ease-in'>Sign Up</span>
                      </NavLink>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </AnimatedXPage>
    </div>
  );
}