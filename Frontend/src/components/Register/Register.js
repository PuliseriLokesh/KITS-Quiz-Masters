import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/joy/Box';
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

const Register = () => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkPasswordConstraints = (password) => {
    return {
      length: password.length >= 8,
      capital: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one capital letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Check if all fields are filled
      if (!UserName || !Email || !Password || !ConfirmPassword) {
        setErrorMessage("Please fill in all fields before submitting.");
        return false;
      }

      // Validate password strength
      const passwordErrors = validatePassword(Password);
      if (passwordErrors.length > 0) {
        setErrorMessage(passwordErrors.join("\n"));
        return false;
      }

      // Check if passwords match
      if (Password !== ConfirmPassword) {
        setErrorMessage("Passwords do not match.");
        return false;
      }

      const response = await axios.post("http://localhost:7018/api/auth/signup", {
        username: UserName,
        email: Email,
        password: Password,
        roles: ["user"],
      });

      if (response.data) {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const constraints = checkPasswordConstraints(Password);

  return (
    <CssVarsProvider>
      <main className='Login'>
        <Sheet
          sx={{
            width: 300,
            mx: 'auto',
            my: 4,
            py: 3,
            px: 2,
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
            <Typography level="body2">Sign up to get started.</Typography>
          </div>

          {errorMessage && <Typography color="danger">{errorMessage}</Typography>}

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography
                level="body3"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: constraints.length ? 'success.500' : 'danger.500'
                }}
              >
                {constraints.length ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                At least 8 characters long
              </Typography>
              <Typography
                level="body3"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: constraints.capital ? 'success.500' : 'danger.500'
                }}
              >
                {constraints.capital ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                Contains a capital letter
              </Typography>
              <Typography
                level="body3"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: constraints.number ? 'success.500' : 'danger.500'
                }}
              >
                {constraints.number ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                Contains a number
              </Typography>
              <Typography
                level="body3"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: constraints.special ? 'success.500' : 'danger.500'
                }}
              >
                {constraints.special ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                Contains a special character
              </Typography>
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {ConfirmPassword && (
              <Typography
                level="body3"
                sx={{
                  mt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: Password === ConfirmPassword ? 'success.500' : 'danger.500'
                }}
              >
                {Password === ConfirmPassword ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                Passwords match
              </Typography>
            )}
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={handleSignUp} loading={isLoading}>
            Sign up
          </Button>

          <Typography
            endDecorator={<Link href="/login">Sign in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default Register;
