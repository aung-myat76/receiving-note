import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NewPage from "./pages/NewPage";
import Page from "./pages/Page";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/add-page" element={<NewPage />} />
                    <Route path="/pages/:pageName" element={<Page />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
