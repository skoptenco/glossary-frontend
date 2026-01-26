import styled from "styled-components";

const PageWrapper = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    gap: 32px;
    
    padding: 20px;
    
    background: #FFF;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    text-indent: 32px;
    text-align: justify;
`

export default {
    PageWrapper,
    DescriptionWrapper,
}