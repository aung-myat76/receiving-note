import { createContext } from "react";
import SingleData from "../components/SingleData";

export type SingleData = {
    id: string | null;
    truckNo: string;
    plts: number;
    loose: number;
    start: string;
    finish: string;
    remark: string | number;
};

export type Data = {
    id: string | null;
    name: string;
    item: string;
    ctnOrCrt: number;
    data: SingleData[];
};

export type AddPage = {
    dispatchName: "ADD_PAGE";
    payload: {
        data: Data;
    };
};

export type EditPage = {
    dispatchName: "EDIT_PAGE";
    payload: {
        data: Data;
        id: string;
    };
};

export type RemovePage = {
    dispatchName: "REMOVE_PAGE";
    payload: {
        id: string;
    };
};

export type SaveData = {
    dispatchName: "SAVE_DATA";
    payload: {
        data: SingleData[];
        id: string;
    };
};

export type AddData = {
    dispatchName: "ADD_DATA";
    payload: {
        data: SingleData;
        name: string;
    };
};

export type RemoveData = {
    dispatchName: "REMOVE_DATA";
    payload: {
        id: string;
        name: string;
    };
};

export type PageActions = {
    addPage: (page: Data) => void;
    editPage: (page: Data, id: string) => void;
    removePage: (id: string) => void;
};

export type DataActions = {
    saveData: (data: SingleData[], id: string) => void;
    addData: (data: SingleData, name: string) => void;
    removeData: (id: string, name: string) => void;
};

export type Datas = {
    datas: Data[];
};

export type NoteContextType = {
    datas: Data[];
} & PageActions &
    DataActions;

const getDataFromLocal = () => {
    const data = window.localStorage.getItem("pages");

    return data ? JSON.parse(data) : [];
};

export const noteContext = createContext<NoteContextType>({
    datas: getDataFromLocal(),
    addPage: (data: Data): void => console.log(data),
    editPage: (data: Data, id: string) => console.log(data, id),
    removePage: (id: string): void => console.log(id),
    saveData: (data: SingleData[], id: string) => console.log(data, id),
    addData: (data: SingleData): void => console.log(data),
    removeData: (id: string, name: string): void => console.log(id, name),
});
