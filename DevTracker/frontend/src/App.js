import HomePage from "./pages/home/HomePage";
import "./App.css";
import HomeNavbar from "./components/homenavbar/HomeNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminDashboard from "./pages/adminapp/AdminDashboard";
import { UserContextProvider } from "./context/userContext";
import { LocalContextProvider } from "./context/localContext";
import { DevContextProvider } from "./dev/Context/devContext";
import AdminAddProject from "./pages/adminapp/AdminAddProject";
import AdminAddDev from "./pages/adminapp/AdminAddDev";
import { DevLocalContextProvider } from "./dev/Context/devLocalContext";
import DevDashboard from "./pages/devapp/DevDashboard";
import DevPhaseBoard from "./pages/devapp/DevPhaseBoard";
import DevTestBoard from "./pages/devapp/DevTestBoard";
import DevFilesPage from "./pages/devapp/DevFilesPage";

function App() {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <div className="app">
      <UserContextProvider>
        <DevContextProvider>
          <DevLocalContextProvider>
            <LocalContextProvider>
              <Router>
                <HomeNavbar
                  activeForm={activeForm}
                  setActiveForm={setActiveForm}
                ></HomeNavbar>
                <Routes>
                  <Route
                    path="/"
                    element={<HomePage activeForm={activeForm}></HomePage>}
                  ></Route>
                  {/* Admin routes */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/project" element={<AdminAddProject />} />
                  <Route path="/admin/dev" element={<AdminAddDev />} />
                  {/* Dev routes */}
                  <Route path="/dev/dashboard" element={<DevDashboard />} />
                  <Route path="/dev/phase" element={<DevPhaseBoard />} />
                  <Route path="/dev/test" element={<DevTestBoard />} />
                  <Route path="/dev/files" element={<DevFilesPage />} />
                </Routes>
              </Router>
            </LocalContextProvider>
          </DevLocalContextProvider>
        </DevContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
