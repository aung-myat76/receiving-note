import { type FormEvent } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import useNote from "../hooks/useNote";
import { useNavigate } from "react-router-dom";

const NewPage = () => {
    const { addPage } = useNote();
    const nav = useNavigate();

    const handleAddPage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const rawData = new FormData(e.currentTarget);
        const data = Object.fromEntries(rawData);

        addPage({
            id: null,
            name: data.name.toString(),
            item: data.item.toString(),
            ctnOrCrt: +data.ctnOrCrt,
            data: [],
        });

        nav("/");
    };

    return (
        <div className="flex justify-center mt-10 px-4">
            <form
                onSubmit={handleAddPage}
                className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-5"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Add New Page
                </h2>

                <Input label="Name" id="name" className="w-full" />
                <Input label="Item" id="item" className="w-full" />
                <Input label="Ctn/Crt" id="ctnOrCrt" className="w-full" />

                <Button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Add Page
                </Button>
            </form>
        </div>
    );
};

export default NewPage;
