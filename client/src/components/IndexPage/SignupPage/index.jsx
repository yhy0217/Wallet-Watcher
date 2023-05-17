import React, { useState } from 'react';
import {signup, login} from '../../../utils';
import { Button, InputAdornment, TextField, IconButton } from '@mui/material';
import { Email, AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup({
            "username": username,
            "password": password,
            "email": email,
            "dateOfBirth": dateOfBirth
        }).then(login({
            "username": username,
            "password": password
        }));
        // jump to the list
        props.onLoginStatusChange((status) => status = true);
    }

    return (
        <React.Fragment>
            <h1>Sign up</h1>  
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Username"
                    onChange={(e) => {setUsername(e.target.value);}}
                    required
                    variant="standard"
                    type="text"
                    sx={{m: 1 }}
                    fullWidth
                    value={username}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    label="Email"
                    onChange={(e) => {setEmail(e.target.value);}}
                    required
                    variant="standard"
                    type="text"
                    sx={{m: 1 }}
                    fullWidth
                    value={email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ), 
                    }}
                />
                <TextField
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant='standard'
                    value={dateOfBirth}
                    onChange={e => setDateOfBirth(e.target.value)}
                    fullWidth
                    required
                    sx={{m: 1 }}
                />
                <TextField 
                    label="Password"
                    required
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    sx={{m: 1}}
                    fullWidth
                    value={password}
                    onChange={(e) => {setPassword(e.target.value);}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button type="submit" variant="contained">Sign up</Button>
            </form>
        </React.Fragment>
    )
}