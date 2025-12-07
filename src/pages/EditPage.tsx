import { type FormEvent } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import useNote from "../hooks/useNote";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
    const { pageId } = useParams();
    const { editPage, datas } = useNote();
    const nav = useNavigate();

    const selectedPage = datas.find((d) => d.id === pageId);

    const handleEditPage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const rawData = new FormData(e.currentTarget);
        const data = Object.fromEntries(rawData);
        editPage(
            {
                id: pageId!.toString(),
                name: data.name.toString(),
                item: data.item.toString(),
                ctnOrCrt: +data.ctnOrCrt,
                data: selectedPage?.data ? [...selectedPage.data] : [],
            },
            pageId!.toString()
        );
        nav("/");
    };

    return (
        <div className="flex justify-center mt-10 px-4">
            <form
                onSubmit={handleEditPage}
                className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-5"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Edit Page
                </h2>

                <Input
                    defaultValue={selectedPage?.name}
                    label="Name"
                    id="name"
                    className="w-full"
                />
                <Input
                    defaultValue={selectedPage?.item}
                    label="Item"
                    id="item"
                    className="w-full"
                />
                <Input
                    defaultValue={selectedPage?.ctnOrCrt}
                    label="Ctn/Crt"
                    id="ctnOrCrt"
                    className="w-full"
                />

                <Button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Edit Page
                </Button>
            </form>
        </div>
    );
};

export default EditPage;
