import { type ReactNode } from "react";

import { Link } from "react-router-dom";

import Header from "../components/Header";

import useNote from "../hooks/useNote";

const Home = () => {
    const { datas } = useNote();

    let content: ReactNode;

    if (datas.length > 0) {
        content = (
            <ul>
                {datas.map((data) => (
                    <li>
                        <Link to={`/pages/${data.name}`}>{data.name}</Link>
                    </li>
                ))}
            </ul>
        );
    } else {
        content = <p>You haven't added any page yet, add one?</p>;
    }

    return (
        <>
            <Header image={{ src: "hello", alt: "world" }}>Hello</Header>
            <main>
                <Link to={"/add-page"}>Add Page</Link>
                {content}
            </main>
        </>
    );
};

export default Home;
