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
    const navigate = useNavigate(); // ✅ Fixed useNavigate

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

                console.log("User Data:", gg);

                if (roles_array.includes("ROLE_ADMIN")) {
                    navigate("/Admin-page");
                } else {
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            if (error.response) {
                console.error("Login failed:", error.response.data);
                setMsg(error.response.data.msg || "Login failed. Please try again.");
            } else {
                console.error("Unexpected error:", error);
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

                console.log("Admin Login:", gg);

                if (roles_array.includes("ROLE_ADMIN")) {
                    navigate("/Admin-page");
                } else if (roles_array.includes("ROLE_USER")) {
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            if (error.response) {
                console.error("Admin login failed:", error.response.data);
                setMsg(error.response.data.msg || "Login failed. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                setMsg("Something went wrong. Please check your connection.");
            }
        }
    };

    return (
        <CssVarsProvider>
            <main className='Login'>
                <Sheet
                    sx={{
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
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body2">Sign in to continue.</Typography>
                    </div>

                    {msg && <Typography color="danger">{msg}</Typography>} {/* ✅ Display error messages */}

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
                    <Button sx={{ mt: 1 }} onClick={handleLoginAdmin}>Admin? Click here to login</Button>

                    <Typography
                        endDecorator={<Link href="/sign-up">Sign up</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Don&apos;t have an account?
                    </Typography>
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}
