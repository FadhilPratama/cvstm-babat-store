import {cn} from "@/lib/util";
import React, {MouseEventHandler} from "react";

interface IconButtonProps {
    onclick?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactElement;
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
                                                   onclick, icon, className
                                               }) => {
    return (
        <button
            onClick={onclick}
            className={cn(
                "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
                className
            )}
        >
            {icon}
        </button>
    );
}

export default IconButton;