import React from 'react'
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { Container } from "./Styles/Containers";
import { MainTitle, Messages, DefaultButton } from "./Styles/Texts";
let AppContainer = styled(Container)`
`

let Title = styled(MainTitle)`
`
let Message = styled(Messages)`
`
export default function Main() {
    let history = useHistory();

    let navigateTo = (path) => {
        history.push(`/${path}`);
    }
    return (
        <AppContainer>
            <Title>
                Welcome to Anonymous Feedback Service
            </Title>
            <Message>If you already have an account: </Message>
            <DefaultButton onClick={() => navigateTo("login")}> Sign In</DefaultButton>
            <Message>If you don't have an account: </Message>
            <DefaultButton onClick={() => navigateTo("signup")}> Sign Up</DefaultButton>
        </AppContainer>
    )
}
