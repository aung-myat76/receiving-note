import React, { type FormEvent } from "react";
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
            name: data.name.toString(),
            item: data.item.toString(),
            plts: +data.plts,
            data: [],
        });
        nav("/");
    };

    return (
        <form onSubmit={handleAddPage}>
            <Input label="Name" id="name" />
            <Input label="Item" id="item" />
            <Input label="Pallets" id="plts" />
            <Button>Add Page</Button>
        </form>
    );
};

export default NewPage;
