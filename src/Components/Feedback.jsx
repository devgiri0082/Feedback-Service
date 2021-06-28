import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { db } from './Redux/FirebaseConfig';
import { Container } from './Styles/Containers';
import { DefaultButton, MainTitle } from './Styles/Texts';

export default function Feedback() {
    let messageRef = useRef();
    let [email, setEmail] = useState("");
    let history = useHistory();
    let navigateTo = (path) => {
        history.push(`/${path}`)
    }
    let { id } = useParams();
    let checkValid = async () => {
        let data = await db.collection("users").doc(id).get();
        console.log(id, data);
        if (!data.exists) {
            navigateTo("");
        }
        setEmail(data.data().Email)
    }
    useEffect(() => {
        checkValid()
        // eslint-disable-next-line
    }, [])
    let submitMessage = async () => {
        let response = await db.collection(email.split(".").join("_")).doc("Message").collection("Message").doc().set({ message: messageRef.current.value });
        console.log(response);
    }
    return (
        <Container>
            <MainTitle>Enter the Feedback for {id}</MainTitle>
            <textarea row="60" col="100" ref={messageRef}></textarea>
            <DefaultButton onClick={submitMessage}>Submit</DefaultButton>

        </Container>

    )
}
