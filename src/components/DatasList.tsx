import { type FC } from "react";
import { type Data } from "../store/note-context";
import SingleData from "./SingleData.tsx";

type DatasList = {
    datas: Data[];
};

const DatasList: FC<DatasList> = ({ datas }) => {
    return (
        <ul>
            {datas.map((data) => (
                <SingleData data={data} key={data.name} />
            ))}
        </ul>
    );
};

export default DatasList;
