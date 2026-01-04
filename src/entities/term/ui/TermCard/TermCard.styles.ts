import styled from "styled-components";

const CardWrapper = styled.div`
    height: 350px;
    
    background: #FFF;
    border-radius: 16px;
    
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    padding: 12px 8px;
    
    h3 {
        font-size: 18px;
        font-weight: 500;
    }
    
    p {
        font-size: 14px;
        font-weight: 400;
        color: #3B3B3B80;
    }
`;

export default {
    CardWrapper
};