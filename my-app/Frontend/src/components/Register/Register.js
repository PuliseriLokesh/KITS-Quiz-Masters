import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Register() {
    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const history = useNavigate();
    
    const handleSignUp = async (event) => {
        event.preventDefault();
        
        // Reset error message
        setErrorMessage('');
        
        // Validate form fields
        if (!UserName || !Email || !Password) {
            setErrorMessage("Please fill in all fields before submitting.");
            alert("Please fill in all fields before submitting.");
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            setErrorMessage("Please enter a valid email address.");
            alert("Please enter a valid email address.");
            return;
        }
        
        // Validate password strength
        if (Password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            alert("Password must be at least 6 characters long.");
            return;
        }
        
        try {
            // Show loading message
            alert("Processing your registration...");
            
            const response = await axios.post('http://localhost:7018/api/auth/signup', {
                username: UserName,
                email: Email,
                password: Password
            });
            
            console.log(response);
            
            // Show success message
            alert(`Registration successful!\n\nWelcome ${UserName}! Your account has been created.\n\nYou can now login with your email and password.`);
            
            // Navigate to login page
            history("/");
        } catch (error) {
            console.error("Registration error:", error);
            
            // Check for specific error types
            if (error.response) {
                // Server responded with an error
                if (error.response.status === 409) {
                    const message = "Invalid registration data. Please check your information and try again.";
                    setErrorMessage(message);
                    alert(message);
                } else if (error.response.status === 400) {
                    const message = "This username or email is already registered. Please try logging in instead or use a different username/email.";
                    setErrorMessage(message);
                    alert(message);
                } else {
                    const message = `Registration failed: ${error.response.data.message || "Unknown error"}`;
                    setErrorMessage(message);
                    alert(message);
                }
            } else if (error.request) {
                // Request was made but no response received
                const message = "Unable to connect to the server. Please check your internet connection and try again.";
                setErrorMessage(message);
                alert(message);
            } else {
                // Something else happened
                const message = "An unexpected error occurred. Please try again later.";
                setErrorMessage(message);
                alert(message);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        alignItems: 'center',
                        width: 300,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & bottom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {errorMessage && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    autoComplete="username"
                                    value={UserName} 
                                    onChange={(e) => setUserName(e.target.value)}
                                    error={!!errorMessage && !UserName}
                                    helperText={!!errorMessage && !UserName ? "Username is required" : ""}
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
                                    value={Email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errorMessage && (!Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email))}
                                    helperText={!!errorMessage && !Email ? "Email is required" : 
                                               !!errorMessage && Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email) ? 
                                               "Please enter a valid email address" : ""}
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
                                    value={Password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!errorMessage && (!Password || Password.length < 6)}
                                    helperText={!!errorMessage && !Password ? "Password is required" : 
                                               !!errorMessage && Password && Password.length < 6 ? 
                                               "Password must be at least 6 characters long" : ""}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}