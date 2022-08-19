import { Routes, Route } from "react-router-dom";
import './App.css';
import CreateItem from "./pages/CreateItem/CreateItem";
import ListItems from "./pages/ListItems/ListItems";
import UpdateItem from "./pages/UpdateItem/UpdateItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListItems />} />
        <Route path="/update/:itemId" element={<UpdateItem />} />
        <Route path="/createItem" element={<CreateItem />} />
      </Routes>
    </div>
  );
}

export default App;
