import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import { CssVarsProvider } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

export default function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7018/api/auth/signin', {
                username: Username,
                password: Password
            });

            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data)); 
                const gg = response.data;  
                const roles_array = gg.roles || [];

                if (roles_array.includes("ROLE_ADMIN")) {
                    navigate("/Admin-page");
                } else {
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg || "Login failed. Please try again.");
            } else {
                setMsg("Something went wrong. Please check your connection.");
            }
        }
    };

    const handleLoginAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7018/api/auth/signin', {
                username: Username,
                password: Password
            });

            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data)); 
                const gg = response.data;
                const roles_array = gg.roles || [];

                if (roles_array.includes("ROLE_ADMIN")) {
                    navigate("/Admin-page");
                } else if (roles_array.includes("ROLE_USER")) {
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg || "Login failed. Please try again.");
            } else {
                setMsg("Something went wrong. Please check your connection.");
            }
        }
    };

    return (
        <CssVarsProvider>
            <div className="split-login-root no-scroll">
                <div className="split-login-left">
                    <Sheet
                        sx={{
                            width: 350,
                            mx: 'auto',
                            py: 4,
                            px: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius: '8px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            backgroundColor: '#fff',
                        }}
                        variant="outlined"
                    >
                        <div>
                            <Typography level="h4" component="h1">
                                <b>Welcome!</b>
                            </Typography>
                            <Typography level="body2">Sign in to continue.</Typography>
                        </div>
                        {msg && <Typography color="danger">{msg}</Typography>}
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button sx={{ mt: 1 }} onClick={handleLogin}>Log in</Button>
                        <Typography
                            endDecorator={<Link href="/sign-up">Sign up</Link>}
                            fontSize="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            Don&apos;t have an account?
                        </Typography>
                    </Sheet>
                </div>
                <div className="split-login-right">
                    <div className="split-login-image-text">
                        <span>Welcome to<br/>KITS Quiz Masters</span>
                    </div>
                    <img
                        src="https://i.pinimg.com/736x/98/96/ee/9896ee1595f5fa28fd679169821f5568.jpg"
                        alt="Background"
                        className="split-login-bg-img"
                    />
                </div>
            </div>
        </CssVarsProvider>
    );
}
