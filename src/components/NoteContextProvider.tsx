import { useReducer, type FC, type ReactNode, type ChangeEvent } from "react";

import {
    noteContext,
    type AddData,
    type AddPage,
    type Datas,
    type Data,
    type NoteContextType,
    type RemoveData,
    type RemovePage,
    type SingleData,
    type SetActiveInput,
} from "../store/note-context.tsx";

type NoteContextProviderType = {
    children: ReactNode;
};

const initialValue: Datas = {
    datas: [{ name: "90K", item: "MB Can 330ml", plts: 16, data: [] }],
    activeInput: null,
};

const noteReducer = (
    state: Datas,
    action: AddPage | RemovePage | AddData | RemoveData | SetActiveInput
): Datas => {
    if (action.dispatchName === "ADD_PAGE") {
        return {
            ...state,
            datas: [...state.datas, action.payload.data],
        };
    }

    if (action.dispatchName === "REMOVE_PAGE") {
        const updatedState = { ...state };
        updatedState.datas.filter((data) => data.name !== action.payload.name);
        return updatedState;
    }

    if (action.dispatchName === "ADD_DATA") {
        const updatedState = { ...state };
        const selectedData = updatedState.datas.find(
            (data) => data.name === action.payload.name
        );
        selectedData?.data.push(action.payload.data);

        return updatedState;
    }

    if (action.dispatchName === "REMOVE_DATA") {
        const updatedState = { ...state };
        const selectedData = updatedState.datas.find(
            (data) => data.name === action.payload.name
        );
        selectedData!.data = selectedData!.data.filter(
            (data) => data.no !== action.payload.no
        );

        return updatedState;
    }

    if (action.dispatchName === "SET_INPUT") {
        if (!action.payload.current) {
            return { ...state };
        }

        return {
            ...state,
            activeInput: action.payload.current,
        };
    }

    return state;
};

const NoteContextProvider: FC<NoteContextProviderType> = ({ children }) => {
    const [noteState, dispatch] = useReducer(noteReducer, initialValue);

    const noteCtxValue: NoteContextType = {
        datas: noteState.datas,
        activeInput: noteState.activeInput,
        setActiveInput: (e: ChangeEvent<HTMLInputElement>) =>
            dispatch({
                dispatchName: "SET_INPUT",
                payload: { current: e },
            }),
        addPage: (page: Data) =>
            dispatch({ dispatchName: "ADD_PAGE", payload: { data: page } }),
        removePage: (name: string) =>
            dispatch({ dispatchName: "REMOVE_PAGE", payload: { name: name } }),
        addData: (data: SingleData, name: string) =>
            dispatch({
                dispatchName: "ADD_DATA",
                payload: { data: data, name: name },
            }),
        removeData: (no: string, name: string) =>
            dispatch({
                dispatchName: "REMOVE_DATA",
                payload: { no: no, name: name },
            }),
    };

    return (
        <noteContext.Provider value={noteCtxValue}>
            {children}
        </noteContext.Provider>
    );
};

export default NoteContextProvider;
