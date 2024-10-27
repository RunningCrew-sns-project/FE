import React from "react";

type Props = {
    theme: "primary" | "dark" | "light";
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
};

const Button = ({
    theme,
    children,
    className,
    onClick,
    disabled = false,
}: Props) => {
    const buttonTheme = {
        primary: "bg-[#C0FF00] text-[#000]",
        dark: "bg-[#000] text-white",
        light: "bg-white text-[#000]",
    };
    return (
        <button
            onClick={onClick}
            className={
                `px-6 py-2 transition-colors rounded-xl hover:opacity-80 text-md font-bold ${buttonTheme[theme]
                } ${disabled && "cursor-no-drop"}` +
                " " +
                className
            }
        >
            {children}
        </button>
    );
};
export default Button;