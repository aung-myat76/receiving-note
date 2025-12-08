import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

import useNote from "../hooks/useNote";
import Button from "../components/Button";
import Modal from "../components/Modal";

const Home = () => {
    const { datas, removePage } = useNote();
    const [isOpen, setIsOpen] = useState<{
        state: boolean;
        payload: string | null;
    }>({
        state: false,
        payload: null,
    });

    const onClose = () => {
        setIsOpen({ state: false, payload: null });
    };

    const onOpen = (payload: string) => {
        setIsOpen({ state: true, payload: payload });
    };

    const handleDeletePage = (id: string | null) => {
        if (id) {
            removePage(id);
        }
        onClose();
    };

    let content: ReactNode;

    if (datas.length > 0) {
        content = (
            <ul className="space-y-4">
                {datas.map((data) => (
                    <li
                        key={data.id}
                        className="p-4 bg-white shadow-sm border border-gray-200 rounded-xl flex flex-col gap-2 hover:shadow-md transition"
                    >
                        <Link to={`/pages/${data.id}`}>
                            <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                                {data.name}
                            </h2>

                            <p className="text-gray-700">{data.item}</p>
                        </Link>
                        <div className="flex items-center justify-end">
                            <Link
                                to={`/pages/${data.id}/edit`}
                                className="bg-blue-500 mx-3 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Edit
                            </Link>
                            <Button
                                onClick={() => onOpen(data.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    } else {
        content = (
            <p className="text-gray-600 text-center mt-10 text-lg">
                You haven't added any page yet.
                <Link to={"/add-page"} className="text-blue-600">
                    {" "}
                    Add one?
                </Link>
            </p>
        );
    }

    return (
        <main className="max-w-4xl mx-auto w-full px-4 py-6">
            <Modal
                isOpen={isOpen.state}
                onConfirm={() => handleDeletePage(isOpen.payload)}
                onClose={onClose}
                btnName="Delete"
            >
                Are you sure to Delete this Page?
            </Modal>
            {content}
        </main>
    );
};

export default Home;
