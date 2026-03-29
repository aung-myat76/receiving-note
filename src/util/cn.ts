import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...input: string[]): string => {
    return twMerge(clsx(...input));
};

export default cn;
