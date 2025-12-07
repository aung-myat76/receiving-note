import { Link, useLocation, useParams } from "react-router-dom";
import useNote from "../hooks/useNote";
import Row from "../components/Row";
import Button from "../components/Button";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRef } from "react";

const Page = () => {
    const { pageId } = useParams();
    const tableRef = useRef<HTMLTableSectionElement>(null);

    const { datas, saveData } = useNote();
    const [rowNum, setRowNum] = useLocalStorage("rowNum", 10);
    const location = useLocation();

    const selectedPage = datas.find((page) => page.id === pageId);

    const handleAddRow = () => setRowNum((prev: number) => prev + 5);
    const handleDeleteRow = () =>
        setRowNum((prev: number) => Math.max(prev - 5, 5));

    const handleSaveData = () => {
        if (!tableRef.current) return;

        const rows = Array.from(tableRef.current.querySelectorAll("tr"));
        const rowData = rows.map((row) => {
            const inputs = Array.from(row.querySelectorAll("input"));
            return {
                id: Math.random().toString(),
                truckNo: inputs[0].value,
                plts: +inputs[1].value,
                loose: +inputs[2].value,
                start: inputs[3].value,
                finish: inputs[4].value,
                remark:
                    inputs[5].value ||
                    +inputs[1].value * selectedPage!.ctnOrCrt +
                        +inputs[2].value,
            };
        });

        if (pageId) saveData(rowData, pageId);
    };

    const analysisPath = location.pathname;

    return (
        <div className="max-w-full mx-auto px-3 py-4 space-y-4">
            {/* PAGE HEADER */}
            <div className="flex items-center justify-between bg-white p-3 sm:p-5 rounded-lg shadow border border-gray-200">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {selectedPage?.name}
                </h2>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    {selectedPage?.item}
                </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-around gap-2 justify-center flex-wrap ">
                <Button
                    onClick={handleAddRow}
                    className="bg-blue-600 flex-1 font-bold rounded-md text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-blue-700 transition"
                >
                    ADD 5 Rows
                </Button>

                <Button
                    onClick={handleDeleteRow}
                    className="bg-red-500 flex-1 font-bold rounded-md text-white px-2 sm:px-4 py-1 sm:py-2  text-xs sm:text-sm hover:bg-red-600 transition"
                >
                    DEL 5 Rows
                </Button>
                <Button
                    onClick={handleSaveData}
                    className="bg-green-600 flex-1 font-bold rounded-md text-white px-2 sm:px-4 py-1 sm:py-2  text-xs sm:text-sm hover:bg-green-700 transition"
                >
                    Save
                </Button>

                <Link
                    to={`${analysisPath}/analysis`}
                    className="bg-yellow-600 flex-1 flex items-center  font-bold rounded-md  text-white px-2 sm:px-4 py-1 sm:py-2  text-xs sm:text-sm hover:bg-yellow-700 transition"
                >
                    <p>Analysis</p>
                </Link>
            </div>

            {/* SAVED INFO */}
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow border border-gray-200 text-sm sm:text-base">
                <p className="text-gray-700">
                    You have saved up to line{" "}
                    <span className="font-semibold">
                        {selectedPage?.data.length}
                    </span>
                </p>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-max border-collapse bg-white shadow border border-gray-200 text-xs sm:text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 py-1 sm:px-3 sm:py-2 text-left font-semibold border-b w-10">
                                No
                            </th>
                            <th className="px-2 py-1 sm:px-3 sm:py-2 text-left font-semibold border-b w-24">
                                Truck no
                            </th>
                            <th className="px-2 py-1 sm:px-3 sm:py-2 text-left font-semibold border-b w-18">
                                Plts
                            </th>
                            <th className="px-2 py-1 sm:px-3 sm:py-2 text-left font-semibold border-b w-18">
                                Loose
                            </th>
                            <th className="px-2 py-1 sm:px-3 sm:py-2 text-left font-semibold border-b w-30">
                                Start
                            </th>
                            <th className="px-2 py-1 sm:px-3 sm:py-2 text-left font-semibold border-b w-30">
                                Finish
                            </th>
                            <th className="px-2 py-1 sm:px-3 sm:py-2 text-left font-semibold border-b w-36">
                                Remark
                            </th>
                        </tr>
                    </thead>

                    <tbody ref={tableRef}>
                        {[...Array(rowNum)].map((_, i) => (
                            <Row
                                key={i}
                                no={i}
                                initialData={selectedPage?.data[i]}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;
