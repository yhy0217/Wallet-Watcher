import React, { useState } from "react";
import { Card, Box, Button, Divider } from "@mui/material";
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

export default function IndexPage(props) {
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState(null);
    
    return  (
        <React.Fragment>
            <Card>       
                <Box error={error}>
                    {
                        registered ? <SignupPage onLoginStatusChange={props.changeLoginStatus} /> : <LoginPage onLoginStatusChange={props.changeLoginStatus} />
                    }
                </Box>
                <Divider />
                <Button variant="text" onClick={() => setRegistered(!registered)}>{registered ? 'already had an account? Log in' : 'New to here? Sign up'}</Button>
            </Card>
        </React.Fragment>
    )
}
