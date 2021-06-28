import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Box, Container } from "./Styles/Containers";
import { DefaultButton, ErrorShow, MainTitle, Messages } from "./Styles/Texts";
import firebase from "firebase";
import { db } from "./Redux/FirebaseConfig";

export default function Signup() {
    let [error, setError] = useState("");
    let userNameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();
    let passwordAgainRef = useRef();
    let history = useHistory();
    let navigateTo = (path) => {
        history.push(`/${path}`);
    }
    let createAccount = async () => {
        try {
            if (userNameRef.current.value === "" || emailRef.current.value === "" || passwordRef.current.value === "" || passwordAgainRef.current.value !== passwordRef.current.value) {
                console.log("empty");
                return;
            }
            let data = await db.collection("users").doc(userNameRef.current.value).get();
            if (data.exists) {
                console.log("invalid, userName");
                setError("invalid, userName");
                return;
            }
            let signupStatus = await firebase.auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
            await db.collection("users").doc(userNameRef.current.value).set({
                userName: userNameRef.current.value,
                Email: emailRef.current.value
            })
            await db.collection(emailRef.current.value.split(".").join("_")).doc("userName").set({
                userName: userNameRef.current.value
            });
            console.log(signupStatus);
            userNameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            passwordAgainRef.current.value = "";
            navigateTo("login");
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }
    return (
        <Container>
            <MainTitle>SignUp Page</MainTitle>
            <Box>
                <Messages>UserName: </Messages>
                <input type="text" ref={userNameRef} />
                <Messages>Email: </Messages>
                <input type="email" ref={emailRef} />
                <Messages>Password: </Messages>
                <input type="password" ref={passwordRef} />
                <Messages>Password Again: </Messages>
                <input type="password" ref={passwordAgainRef} />
                <DefaultButton onClick={createAccount}>Submit</DefaultButton>
                <ErrorShow>{error}</ErrorShow>
            </Box>
            <DefaultButton onClick={() => navigateTo("login")}>Login</DefaultButton>
        </Container>
    )
}
