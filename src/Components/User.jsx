import React, { useEffect, useState } from 'react'
import firebase from "firebase";
import { useHistory, useParams } from 'react-router-dom';
import { db } from './Redux/FirebaseConfig';
import { Container } from './Styles/Containers';
import styled from "styled-components";
import { Messages, DefaultButton } from './Styles/Texts';

let EachMessage = styled.div`
    width: 100%;
    padding: 20px;
    background: gray;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    position: relative;
    .close {
        position: absolute;
        top: -0.5%;
        right: 0.5%;
        height: 20px;
        width: 10px;
        border-radius: 50%;
        display: grid;
        place-content: center;

    
    }
`

export default function User() {
    let { id } = useParams();
    let [message, setMessage] = useState([]);
    let history = useHistory();
    let navigateTo = (path) => {
        history.push(`/${path}`);
    }
    let getMessage = async () => {
        if (!firebase.auth().currentUser) {
            navigateTo("");
            return;
        }
        // console.log(firebase.auth().currentUser.email.split(".").join("_"));
        let data = await db.collection(firebase.auth().currentUser.email.split(".").join("_")).doc("Message").collection("Message").get();
        // console.log(data.docs);
        if (data.docs) {
            let newArr = [];
            data.docs.forEach((elem, index) => {
                let newMessage = [elem.id, elem.data().message]
                newArr.push(newMessage);
            });
            setMessage(newArr);
            console.log(newArr);
        }
        // if (data.exists) {
        //     console.log(data);
        // }
    }
    useEffect(() => {
        getMessage();
        // eslint-disable-next-line
    }, [])
    let deleteIt = async (personId) => {
        try {
            await db.collection(firebase.auth().currentUser.email.split(".").join("_")).doc("Message").collection("Message").doc(personId).delete();
            getMessage();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Container>
            <Messages style={{ marginBottom: "20px" }}>FeedBack URL: http://localhost:3000/feedback/{id}</Messages>
            {message.length > 0 ? message.map((elem) => <EachMessage>
                <DefaultButton className="close" onClick={() => deleteIt(elem[0])}>X</DefaultButton>
                {elem[1]}
            </EachMessage>) : <h2>There are no messages </h2>}
        </Container>
    )
}
