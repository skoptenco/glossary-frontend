import { Outlet } from "react-router-dom"
import {Header} from "@/widgets/Header";
import S from "./BaseLayout.styles";

const BaseLayout = () => {

    return (
        <S.LayoutWrapper>
            <Header/>
            <S.PageWrapper>
                <Outlet />
            </S.PageWrapper>
        </S.LayoutWrapper>
    )
}

export default BaseLayout;