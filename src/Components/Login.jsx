import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Container } from "./Styles/Containers";
import { MainTitle, Messages, ErrorShow, DefaultButton } from "./Styles/Texts";
import firebase from "firebase";
import { db } from "./Redux/FirebaseConfig";

export default function Login() {
    let [error, setError] = useState("");
    let emailRef = useRef();
    let passwordRef = useRef();
    let history = useHistory();
    let navigateTo = (path) => {
        history.push(`/${path}`);
    }
    let signIn = async () => {
        if (emailRef.current.value === "" || passwordRef.current.value === "") {
            console.log("empty fields");
            setError("empty fields");
            return;
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
            let data = await db.collection(emailRef.current.value.split(".").join("_")).doc("userName").get();
            navigateTo(`user/${data.data().userName}`);

        } catch (err) {
            console.log(err);
            setError(err.message);

        }
    }
    return (
        <Container>
            <MainTitle>Login page</MainTitle>
            <Box>
                <Messages>Email: </Messages>
                <input type="text" ref={emailRef} />
                <messages>Password: </messages>
                <input type="password" ref={passwordRef} />
                <DefaultButton onClick={signIn}>Login</DefaultButton>
                <ErrorShow>{error}</ErrorShow>
            </Box>
            <DefaultButton onClick={() => navigateTo("signup")}>Signup</DefaultButton>
        </Container>
    )
}
