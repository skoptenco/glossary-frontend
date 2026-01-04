import styled from "styled-components";

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    padding: 10px 20px;
`;

const HeaderTabs = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export default {
    HeaderTabs,
    HeaderWrapper
};