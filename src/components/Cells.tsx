import { useRef, type FC } from "react";
import Button from "./Button";
import useNote from "../hooks/useNote";
import type { RefType } from "./RefInput";
import RefInput from "./RefInput";

type CellsType = {
    no: string | number;
    name: string;
};

const Cells: FC<CellsType> = ({ no, name }) => {
    const { addData, datas } = useNote();

    const selectedData = datas.find((d) => d.name === name);

    const noRef = useRef<RefType>(null);
    const truckNoRef = useRef<RefType>(null);
    const pltsRef = useRef<RefType>(null);
    const looseRef = useRef<RefType>(null);
    const startRef = useRef<RefType>(null);
    const finishRef = useRef<RefType>(null);
    const remarkRef = useRef<RefType>(null);

    const handleAddCells = () => {
        const dataObj = {
            no: noRef.current!.getValue(),
            truckNo: truckNoRef.current!.getValue(),
            plts: +pltsRef.current!.getValue() || +selectedData!.plts,
            loose: +looseRef.current!.getValue(),
            start: startRef.current!.getValue(),
            finish: finishRef.current!.getValue(),
            remark: remarkRef.current!.getValue(),
        };

        addData(dataObj, name);
    };

    const handleStartTime = () => {
        startRef.current?.getNow();
    };

    const handleFinishTime = () => {
        finishRef.current?.getNow();
    };

    return (
        <tbody>
            <tr>
                <td className="col-cell">
                    <RefInput
                        className="cell"
                        id="no"
                        defaultValue={+no + 1}
                        ref={noRef}
                    />
                </td>
                <td className="col-cell">
                    <RefInput className="cell" ref={truckNoRef} id="truckNo" />
                </td>
                <td className="col-cell">
                    <RefInput className="cell" ref={pltsRef} id="plts" />
                </td>
                <td className="col-cell">
                    <RefInput className="cell" ref={looseRef} id="loose" />
                </td>
                <td className="col-cell input-button">
                    <RefInput className="cell" id="start" ref={startRef} />
                    <Button onClick={handleStartTime}>Now</Button>
                </td>
                <td className="col-cell input-button">
                    <RefInput className="cell" id="finish" ref={finishRef} />
                    <Button onClick={handleFinishTime}>Now</Button>
                </td>
                <td className="col-cell">
                    <RefInput className="cell" ref={remarkRef} id="remark" />
                </td>
            </tr>
        </tbody>
    );
};

export default Cells;
