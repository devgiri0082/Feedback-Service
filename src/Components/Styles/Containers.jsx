import styled from "styled-components";

export let Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
`

export let Box = styled.div`
    border: 1px solid black;
    width: 30vw;
    min-height: 30vh;
    display: flex;
    flex-direction: column;gap: 5px;
    align-items: flex-start;
    padding: 10px;
`