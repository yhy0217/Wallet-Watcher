import React, {useState} from 'react';
import { Button, InputAdornment, TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import {login} from '../../../utils';

export default function LoginPage (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            "username": username,
            "password": password
        }).then((data) => {
            console.log(data);
            if (data.code === '0000') {
                props.onLoginStatusChange(true);
            } else {
                setPassword('');
            }
        });
    }

    return (
        <React.Fragment>
            <h1>Login</h1>  
            <form onSubmit={handleSubmit} target="framePreventJump">
                <TextField 
                    label="Username"
                    onChange={(e) => {setUsername(e.target.value);}}
                    required
                    variant="outlined"
                    type="text"
                    sx={{m: 1 }}
                    fullWidth
                    value={username}
                />
                <TextField 
                    label="Password"
                    onChange={(e) => {setPassword(e.target.value);}}
                    required
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    sx={{m: 1}}
                    fullWidth
                    value={password}
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
                <Button type="submit" variant="contained">Login</Button>
            </form>
            <iframe src="" frameBorder="0" hidden name="framePreventJump"></iframe>
        </React.Fragment>
    )
}