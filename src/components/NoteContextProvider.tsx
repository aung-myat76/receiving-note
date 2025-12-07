import { useReducer, type FC, type ReactNode } from "react";

import {
    noteContext,
    type AddData,
    type AddPage,
    type Data,
    type EditPage,
    type NoteContextType,
    type RemoveData,
    type RemovePage,
    type SaveData,
    type SingleData,
} from "../store/note-context.tsx";

type NoteContextProviderType = {
    children: ReactNode;
};

// const initialValue: Datas = {
//     datas: [{ name: "90K", item: "MB Can 330ml", plts: 16, data: [] }],
// };

const noteReducer = (
    state: Data[],
    action: AddPage | EditPage | RemovePage | SaveData | AddData | RemoveData
): Data[] => {
    if (action.dispatchName === "ADD_PAGE") {
        const updatedPages = [
            ...state,
            { ...action.payload.data, id: Math.random().toString() },
        ];
        window.localStorage.setItem("pages", JSON.stringify(updatedPages));
        return updatedPages;
    }

    if (action.dispatchName === "EDIT_PAGE") {
        const updatedPages = [...state];

        const editPageIndex = updatedPages.findIndex(
            (page) => page.id === action.payload.id
        );
        updatedPages[editPageIndex] = action.payload.data;

        window.localStorage.setItem("pages", JSON.stringify(updatedPages));
        return updatedPages;
    }

    if (action.dispatchName === "REMOVE_PAGE") {
        const updatedPages = [...state];
        const filterPages = updatedPages.filter(
            (data) => data.id !== action.payload.id
        );

        window.localStorage.setItem("pages", JSON.stringify(filterPages));
        return filterPages;
    }

    if (action.dispatchName === "SAVE_DATA") {
        const updatedState = [...state];

        const selectedPageIndex = updatedState.findIndex(
            (p) => p.id === action.payload.id
        );

        const filterData = action.payload.data.filter(
            (d) => d.truckNo && d.start && d.finish
        );

        updatedState[selectedPageIndex].data = filterData;
        window.localStorage.setItem("pages", JSON.stringify(updatedState));

        return updatedState;
    }

    if (action.dispatchName === "ADD_DATA") {
        const updatedState = [...state];

        const selectedData = updatedState?.find(
            (data) => data.name === action.payload.name
        );

        if (action.payload.data.id === null) {
            selectedData?.data.push({
                ...action.payload.data,
                id: Math.random().toString(),
            });
            console.log("add");
        } else {
            // 4.12 need to fix
            console.log("edit");
        }

        window.localStorage.setItem("pages", JSON.stringify(updatedState));
        return updatedState;
    }

    if (action.dispatchName === "REMOVE_DATA") {
        const updatedState = [...state];
        // const selectedData = updatedState.find(
        //     (data) => data.name === action.payload.name
        // );
        const selectedDataIndex = updatedState.findIndex(
            (data) => data.name === action.payload.name
        );

        // if (selectedData) {
        updatedState[selectedDataIndex].data = updatedState[
            selectedDataIndex
        ].data.filter((data) => data.id !== action.payload.id);
        // }
        window.localStorage.setItem("pages", JSON.stringify(updatedState));
        return updatedState;
    }

    return state;
};

const NoteContextProvider: FC<NoteContextProviderType> = ({ children }) => {
    // need initial value  to
    const initialValue = window.localStorage.getItem("pages");
    let parsedInitialValue: Data[] = [];
    if (initialValue) {
        parsedInitialValue = JSON.parse(initialValue);
    }

    const [noteState, dispatch] = useReducer(noteReducer, parsedInitialValue);

    const noteCtxValue: NoteContextType = {
        datas: noteState,
        addPage: (page: Data) =>
            dispatch({ dispatchName: "ADD_PAGE", payload: { data: page } }),
        editPage: (page: Data, id: string) =>
            dispatch({
                dispatchName: "EDIT_PAGE",
                payload: { data: page, id: id },
            }),
        removePage: (id: string) =>
            dispatch({ dispatchName: "REMOVE_PAGE", payload: { id: id } }),
        saveData: (data: SingleData[], id: string) => {
            dispatch({
                dispatchName: "SAVE_DATA",
                payload: { data: data, id: id },
            });
        },

        addData: (data: SingleData, name: string) =>
            dispatch({
                dispatchName: "ADD_DATA",
                payload: { data: data, name: name },
            }),
        removeData: (id: string, name: string) =>
            dispatch({
                dispatchName: "REMOVE_DATA",
                payload: { id: id.toString(), name: name },
            }),
    };

    return (
        <noteContext.Provider value={noteCtxValue}>
            {children}
        </noteContext.Provider>
    );
};

export default NoteContextProvider;
