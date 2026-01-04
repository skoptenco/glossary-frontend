import S from "./TermCard.styles";
import type {FC} from "react";
import type {Term} from "@/shared/model/term";

interface TermCardProps {
    term: Term;
}

const TermCard: FC<TermCardProps> = props => {

    const { term } = props;

    return (
        <S.CardWrapper>
            <h3>{term.keyword}</h3>
            <p>{term.description}</p>
        </S.CardWrapper>
    )
};

export default TermCard;