import { useContext } from "react";
import { noteContext } from "../store/note-context";

const useNote = () => {
    const ctx = useContext(noteContext);

    return ctx;
};

export default useNote;
