import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NewPage from "./pages/NewPage";
import Page from "./pages/Page";
import PageAnalysis from "./pages/PageAnalysis";
import Summary from "./pages/Summary";
import EditPage from "./pages/EditPage";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/add-page" element={<NewPage />} />
                    <Route path="/pages/:pageId" element={<Page />} />
                    <Route path="pages/:pageId/edit" element={<EditPage />} />
                    <Route
                        path="/pages/:pageId/analysis"
                        element={<PageAnalysis />}
                    />
                    <Route path="/summary" element={<Summary />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
