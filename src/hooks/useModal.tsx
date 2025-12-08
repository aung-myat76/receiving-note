import React, { useState } from "react";

const useModal = () => {
    const [isConfirm, setIsConfirm] = useState(false);

    const onCancel = () => {
        setIsConfirm(false);
    };

    const onConfirm = () => {
        setIsConfirm(true);
    };
};

export default useModal;
