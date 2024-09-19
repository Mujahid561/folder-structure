import "./App.css";
import { data } from "./data";
import Folder from "./components/Folder.js";
import React, { useState } from "react";

function App() {
  const [treeData, setTreeData] = useState(data);

  const insertNode = (elem, id, text, isFolder) => {
    if (elem?.id === id) {
      elem.items.unshift({
        id: new Date().getTime(),
        name: text,
        isFolder,
        items: [],
      });

      return elem;
    } else {
      elem?.items.map((elem) => {
        insertNode(elem, id, text, isFolder);
      });
    }
    return elem;
  };

  const handleData = (id, text, isFolder) => {
    let latest = insertNode(data, id, text, isFolder);
    setTreeData(latest);
  };

  return (
    <div className="App">
      <Folder data={treeData} handleData={handleData} />
    </div>
  );
}

export default App;
