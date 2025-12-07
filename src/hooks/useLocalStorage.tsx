import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: unknown) => {
    const checkLocalStorage = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.log(err);
            return initialValue;
        }
    };

    const [value, setValue] = useState(checkLocalStorage);

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.log(err);
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
