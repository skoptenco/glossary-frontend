import S from "./Header.styles";
import {useLocation, useNavigate} from "react-router-dom";
import {ActiveButton} from "@/shared/ui/ActiveButton";

const Header = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <S.HeaderWrapper>
            <S.HeaderTabs>
                <ActiveButton
                    onClick={() => navigate("/terms")}
                    active={pathname === "/terms"}
                >
                    Глоссарий
                </ActiveButton>
                <ActiveButton
                    active={pathname === "/graph"}
                    onClick={() => navigate("/graph")}
                >
                    Семантический граф
                </ActiveButton>
            </S.HeaderTabs>
        </S.HeaderWrapper>
    );
}

export default Header;