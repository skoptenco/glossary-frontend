import {useEffect, useState} from "react";
import type {Term} from "@/shared/model/term";
import {TermCard} from "@/entities/term/ui/TermCard";
import {getApi} from "@/shared/api";
import S from "./Terms.styles";

const TermsPage = () => {

    const [terms, setTerms] = useState<Term[]>([]);

    useEffect(() => {
        getApi.getTerms().then(response => {
            setTerms(response.data);
        })
    }, []);

    return (
        <S.TermsWrapper>
            {terms.map(term => (
                <TermCard term={term} key={term.keyword}/>))}
        </S.TermsWrapper>
    )
};

export default TermsPage;