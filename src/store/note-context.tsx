import { createContext, type ChangeEvent } from "react";

export type SingleData = {
    no: string;
    truckNo: string;
    plts: number;
    loose: number;
    start: string;
    finish: string;
    remark: string | null;
};

export type Data = {
    name: string;
    item: string;
    plts: number;
    data: SingleData[];
};

export type AddPage = {
    dispatchName: "ADD_PAGE";
    payload: {
        data: Data;
    };
};

export type RemovePage = {
    dispatchName: "REMOVE_PAGE";
    payload: {
        name: string;
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
        no: string;
        name: string;
    };
};

export type SetActiveInput = {
    dispatchName: "SET_INPUT";
    payload: {
        current: ChangeEvent<HTMLInputElement> | null;
    };
};

export type PageActions = {
    addPage: (page: Data) => void;
    removePage: (name: string) => void;
};

export type DataActions = {
    addData: (data: SingleData, name: string) => void;
    removeData: (no: string, name: string) => void;
};

// export type DataActions = AddData | RemoveData;

export type Datas = {
    datas: Data[];
    activeInput: ChangeEvent<HTMLInputElement> | null;
};

// export type NoteContextType = Datas &
//     AddPage &
//     RemovePage &
//     AddData &
//     RemoveData;

export type NoteContextType = {
    datas: Data[];
    activeInput: ChangeEvent<HTMLInputElement> | null;
    setActiveInput: (e: ChangeEvent<HTMLInputElement>) => void;
} & PageActions &
    DataActions;

export const noteContext = createContext<NoteContextType>({
    datas: [],
    activeInput: null,
    setActiveInput: (e: ChangeEvent<HTMLInputElement>) => console.log(e),
    addPage: (data: Data): void => console.log(data),
    removePage: (name: string): void => console.log(name),
    addData: (data: SingleData): void => console.log(data),
    removeData: (no: string): void => console.log(no),
});
