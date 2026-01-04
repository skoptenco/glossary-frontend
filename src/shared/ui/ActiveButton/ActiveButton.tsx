import S from './ActiveButton.styles'
import type {FC, HTMLProps} from "react";
import clsx from "clsx";

interface ActiveButtonProps extends HTMLProps<HTMLButtonElement> {
    active: boolean;
    type?: "button" | "submit" | "reset";
}

const ActiveButton: FC<ActiveButtonProps> = props => {

    const {children, className, active, ...restProps} = props;

    return (
        <S.StyledButton
            className={clsx(className, active && 'active')}
            {...restProps}
        >
            {children}
        </S.StyledButton>
    )
}

export default ActiveButton