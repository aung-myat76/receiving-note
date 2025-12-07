import { type ComponentPropsWithoutRef } from "react";

type InputType = {
    id: string;
    label: string;
} & ComponentPropsWithoutRef<"input">;

const Input = ({ id, label, className = "", ...props }: InputType) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                id={id}
                name={id}
                {...props}
                className={`border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
            />
        </div>
    );
};

export default Input;
