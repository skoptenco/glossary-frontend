import {createGlobalStyle} from "styled-components";
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {BaseLayout} from "./layouts/BaseLayout";
import { TermsPage } from "@/pages/Terms";
import { GraphPage } from "@/pages/Graph";

const GlobalStyles = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        
        font-family: 'Roboto', monospace;
        
        color: #373737;
    }
`;

function App() {

  return (
    <>
        <GlobalStyles />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout/>}>
                    <Route path="terms" element={<TermsPage/>} />
                    <Route path="graph" element={<GraphPage/>} />
                    <Route index element={<Navigate to="terms"/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
