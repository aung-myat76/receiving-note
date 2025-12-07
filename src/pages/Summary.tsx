import useNote from "../hooks/useNote";
import { Link } from "react-router-dom";

const Summary = () => {
    const { datas } = useNote();

    const rowName = ["item", "count", "plts", "loose", "total"];

    const tds = datas.map((d) => {
        const plts =
            d.data.reduce((currentSum, data) => data.plts + currentSum, 0) || 0;
        const loose =
            d.data.reduce((currentSum, data) => data.loose + currentSum, 0) ||
            0;
        return {
            item: d.item,
            count: d.data.length,
            plts: plts,
            loose: loose,
            total: plts * d.ctnOrCrt + loose,
        };
    });

    return (
        <div className="max-w-6xl mx-auto px-3 py-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Summary
            </h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="min-w-full border-collapse text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 font-semibold border-b">
                                Row
                            </th>
                            {datas.map((d) => (
                                <th
                                    key={d.id}
                                    className="text-blue-500  px-4 py-2 font-semibold border-b border-black"
                                >
                                    <Link to={`/pages/${d.id}`}>{d.name}</Link>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rowName.map((row) => (
                            <tr
                                key={row}
                                className="odd:bg-white even:bg-gray-50"
                            >
                                <th className="px-4 py-2 font-medium border-b capitalize">
                                    {row}
                                </th>
                                {tds.map((td, idx) => (
                                    <td
                                        key={idx}
                                        className="px-4 py-2 border-b text-gray-700 whitespace-nowrap"
                                    >
                                        {td[row as keyof typeof td]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Summary;
