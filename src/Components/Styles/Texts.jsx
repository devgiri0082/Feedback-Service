import styled from "styled-components";

export let MainTitle = styled.div`
    font-size: 25px;
`

export let Messages = styled.div`
    font-size: 17px;
`


export let DefaultButton = styled.button`
    background: tomato;
    border: 1px solid tomato;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    margin-top: 10px;
    display: block;
    &:hover {
        color: tomato;
        border: 1px solid tomato;
        background: none; 
    }
`
export let ErrorShow = styled.div`
    color: red;
    font-size: 15px;
`