import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import GoogleSigninButton from './Google/GoogleSignInButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AnimatedXPage from '../Animations/AnimatedXPage';
import { helix } from 'ldrs';
import { useAppContext } from '../../services/utilities';

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

export default function SignUp() {
	helix.register();
	const { userRegister, loading, setLoading } = useAppContext();
	const [inputs, setInputs] = React.useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

  const handleSubmit = (event) => {
    event.preventDefault();
		event.target.reset();
		userRegister(inputs);
  };

	const signUpLoader = (
    <div className='flex items-center justify-center rotate-90'>
			<l-helix
				size="100"
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
								backgroundImage:
									'url("/images/gofoods_img2.webp")',
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
									<h2 className='concert-one-regular text-green-500 text-3xl font-bold'>
										<i>GOFoods</i>
									</h2>
								</NavLink>
								<h2 className='font-bold text-xl'>Get started!</h2>
								<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											<TextField
												autoComplete="given-name"
												name="first_name"
												required={true}
												fullWidth
												id="firstName"
												label="First Name"
												autoFocus
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												required
												fullWidth
												id="lastName"
												label="Last Name"
												name="last_name"
												autoComplete="family-name"
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												id="email"
												label="Email Address"
												name="email"
												autoComplete="email"
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												name="password"
												label="Password"
												type="password"
												id="password"
												autoComplete="new-password"
												onChange={handleChange}
											/>
										</Grid>
									</Grid>
									<Button
										type="submit"
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
									>
										Sign Up
									</Button>
									<p className='text-center'>OR</p>
									<GoogleSigninButton></GoogleSigninButton>
	
									{ loading && signUpLoader }
									<Grid container justifyContent="center" marginTop={2}>
										<Grid item>
											<NavLink to="/account/signin" variant="body2">
												Already have an account? <span className='text-blue-500 cursor-pointer hover:text-blue-600 transition duration-300 ease-in'>Sign in</span>
											</NavLink>
										</Grid>
									</Grid>
								</Box>
							</Box>
							<Copyright sx={{ mt: 5 }} />
						</Grid>
					</Grid>
				</ThemeProvider>
			</AnimatedXPage>
		</div>
  );
};