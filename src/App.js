import { Routes, Route } from "react-router-dom";
import './App.css';
import ListItems from "./pages/ListItems/ListItems";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListItems />} />
      </Routes>
    </div>
  );
}

export default App;
