import type { ReactNode } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import DatasList from "./components/DatasList";

import useNote from "./hooks/useNote";

const App = () => {
    const { datas } = useNote();

    let content: ReactNode;

    if (datas.length > 0) {
        content = <DatasList datas={datas} />;
    }

    return (
        <>
            <Header image={{ src: "hello", alt: "world" }}>Hello</Header>
            <main>
                <Button>Add Page</Button>
                {content}
            </main>
        </>
    );
};

export default App;
