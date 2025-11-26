import { useParams } from "react-router-dom";
import useNote from "../hooks/useNote";
import Cells from "../components/Cells";

const Page = () => {
    const { pageName } = useParams();
    const { datas } = useNote();
    console.log(datas);

    const selectedPage = datas.find((page) => page.name === pageName);
    const colHeaders = [
        "No",
        "Truck no",
        "Plts",
        "Loose",
        "Start",
        "Finish",
        "Remark",
    ];

    return (
        <div>
            <div>
                <h2>{selectedPage?.name}</h2>
                <p>{selectedPage?.item}</p>
            </div>

            <div>
                <table id="data-table">
                    <thead>
                        <tr>
                            {colHeaders.map((col) => (
                                <th className="col-header" key={col}>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {[...Array(10)].map((_, i) => (
                        <Cells key={i} no={i} name={selectedPage!.name} />
                    ))}
                </table>
            </div>
        </div>
    );
};

export default Page;
