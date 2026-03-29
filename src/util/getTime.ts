export const getHour = () => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",

        hour12: false
    });

    return time;
};

export const getTime = () => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    return time;
};
