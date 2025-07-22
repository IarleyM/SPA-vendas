interface IButtonProps {
    type ?: "button" | "submit" | "reset";
    onClick: () => void,
}

export const Button: React.FC<IButtonProps & { children?: React.ReactNode }> = ({ type, onClick, children }) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
}