import {useEffect, useState} from "react";
import type {Term} from "@/shared/model/term";
import {TermCard} from "@/entities/term/ui/TermCard";
import {getApi} from "@/shared/api";
import S from "./Terms.styles";
import {Helmet} from "react-helmet";

const TermsPage = () => {

    const [terms, setTerms] = useState<Term[]>([]);

    useEffect(() => {
        getApi.getTerms().then(response => {
            setTerms(response.data);
        })
    }, []);

    return (
        <>
            <Helmet>
                <title>Список терминов</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <S.TermsWrapper>
                {terms.map(term => (
                    <TermCard term={term} key={term.keyword}/>))}
            </S.TermsWrapper>
        </>
    )
};

export default TermsPage;