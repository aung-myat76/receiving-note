import { type ComponentPropsWithoutRef } from "react";

type InputType = {
    id: string;
    label: string;
} & ComponentPropsWithoutRef<"input">;

const Input = ({ id, label, ...props }: InputType) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...props} name={id} />
        </div>
    );
};

export default Input;
