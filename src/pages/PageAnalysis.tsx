import useNote from "../hooks/useNote";
import { useParams } from "react-router-dom";

const countDuplicate = (arr: string[]) => {
    const frequencyMap: Record<string, number> = {};
    for (const number of arr) {
        frequencyMap[number] = (frequencyMap[number] || 0) + 1;
    }
    return frequencyMap;
};

const PageAnalysis = () => {
    const { datas } = useNote();
    const { pageId } = useParams();

    const selectedPage = datas.find((data) => data.id === pageId);
    const filterData = selectedPage?.data.filter(
        (d) => d.truckNo && d.start && d.finish
    );

    const count = filterData?.length || 0;
    const plts: number = filterData?.reduce((sum, d) => sum + d.plts, 0) || 0;
    const loose: number = filterData?.reduce((sum, d) => sum + d.loose, 0) || 0;
    const total: number = plts * (selectedPage?.ctnOrCrt || 0) + loose;

    const truckNumbers = filterData?.map((d) => d.truckNo) || [];
    const truckCount = Object.entries(countDuplicate(truckNumbers));

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {selectedPage?.name} - Analysis
                </h2>
                <p className="text-gray-600 mt-1">{selectedPage?.item}</p>
            </div>

            {/* Summary Stats */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-700">
                <div className="flex flex-col">
                    <span className="font-medium">Count</span>
                    <span>{count}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Plts</span>
                    <span>{plts}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Loose</span>
                    <span>{loose}</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">Total</span>
                    <span>{total}</span>
                </div>
            </div>

            {/* Truck Count List */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Truck Number Frequency
                </h3>
                <ul className="space-y-2">
                    {truckCount.map(([truck, freq]) => (
                        <li
                            key={truck}
                            className="flex justify-between border-b border-gray-200 pb-1"
                        >
                            <span className="text-gray-700">{truck}</span>
                            <span className="font-medium text-gray-800">
                                {freq}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PageAnalysis;
