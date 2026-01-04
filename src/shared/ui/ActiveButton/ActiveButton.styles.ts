import styled from "styled-components";

const StyledButton = styled.button`
    appearance: none;
    border: none;
    outline: none;
    
    padding: 8px;
    border-radius: 8px;
    
    background: #FFF;
    
    font-size: 16px;
    font-weight: 600;
    
    &:hover, &.active {
        background: rgb(40, 44, 52);
        color: #FFF;
    }
`;

export default {
    StyledButton,
}