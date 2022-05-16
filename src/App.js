import React, { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css"; // contains .diagram-component CSS
import { UserDetailsContext } from "./context/UserDetailsContext";
import Diagram from "./GOJS/Diagram";
import Palatte from "./GOJS/Palatte";
import UserReducer from "./reducers/UserReducers";
import RNDDemo from "./RND/RNDDemo";
import Sidebar from "./layout/Sidebar";
import Overview from "./GOJS/Overview";
// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */

// render function...
function App() {
  const [userState, userDispatch] = useReducer(UserReducer, []);
  return (
    <>
      <UserDetailsContext.Provider value={{ userState, userDispatch }}>
        <div className="App">
          <Sidebar />
          <Routes>
            <Route path="/gojs" element={<Diagram />} />
            <Route path="/rnd" element={<RNDDemo />} />
            <Route path="/palatte" element={<Palatte />} />
            <Route path="/overview" element={<Overview />} />
          </Routes>
        </div>
      </UserDetailsContext.Provider>
    </>
  );
}
export default App;
