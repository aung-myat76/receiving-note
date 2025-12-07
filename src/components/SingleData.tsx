import { type FC } from "react";
import type { Data } from "../store/note-context";
import Button from "./Button";

type DataType = {
    data: Data;
};

const SingleData: FC<DataType> = ({ data }) => {
    return (
        <li>
            <Button>{data.name}</Button>
        </li>
    );
};

export default SingleData;
