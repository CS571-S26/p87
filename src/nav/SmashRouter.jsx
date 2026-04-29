import { BrowserRouter, HashRouter, Route, Routes } from "react-router";

import Home from "./pages/Home";
import Theater from "./pages/Theater";
import Bios from "./pages/Bios";
import Getting_Started from "./pages/Getting Started";
import App from "../App";

export default function SmashRouter() {
    return <HashRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="theater" element={<Theater />} />
                    <Route path="bios" element={<Bios />} />
                    <Route path="Getting_Started" element={<Getting_Started />} />
                </Route>
            </Routes>
    </HashRouter>
}