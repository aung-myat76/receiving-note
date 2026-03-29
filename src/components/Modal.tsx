import { type FC, type ReactNode } from "react";
import Button from "./Button";
import { createPortal } from "react-dom";

type ModalType = {
    children: ReactNode;
    btnName: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

const Modal: FC<ModalType> = ({
    btnName,
    isOpen,
    onClose,
    onConfirm,
    children
}) => {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;

    return createPortal(
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="absolute inset-0 opacity-90 flex justify-center items-center w-full bg-stone-500">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-60 p-5 rounded-lg bg-white text-stone-900">
                        <div>
                            <h2 className="text-lg text-start mb-3 font-semibold">
                                {children}
                            </h2>
                        </div>
                        <div className="action flex justify-end gap-2">
                            <Button
                                className="btn btn-secondary"
                                onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                className="btn btn-danger"
                                onClick={onConfirm}>
                                {btnName}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>,
        modalRoot
    );
};

export default Modal;
