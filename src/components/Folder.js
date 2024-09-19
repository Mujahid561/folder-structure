import React, { useState} from "react";

function Folder({ data, handleData }) {
  const [showChildren, setShowChildren] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newFolder, setnewFolder] = useState(false);
  const [text, settext] = useState("");


  const handleVisiblity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowChildren(!showChildren);
  };

  const handleInput = (id, isFolder) => {
    
    if (data?.id === id) {
      setShowInput(true);
      setShowChildren(true)
    }
    if (isFolder === "folder") {
      setnewFolder(true);
    } else {
      setnewFolder(false);
    }
  };



  const handleEnter = (e) => {
    if (e.keyCode === 13 && text!=="") {
      setShowInput(false);

    handleData(data?.id, text, newFolder);
    setShowChildren(true);
    settext("");
    }
  };

  return (
    <div className="ml-3">
      <div className="w-[30%] pl-2 pr-8 my-1 flex justify-between">
        <div >
          <span className=" " onClick={(e) => handleVisiblity(e)}>
            { data?.isFolder===true ? showChildren ===false ? "▶️ " : "🔽 ":""}{data?.isFolder === true ? "📁" : "📄"} {data.name}
          </span>
        </div>
        <div>
          {data?.isFolder === true ? (
            <>
              <button
                className="bg-gray-500 text-white px-2 py-1 text-xs"
                onClick={() => handleInput(data?.id, "folder")}
              >
                Folder +
              </button>
              <button
                className="bg-gray-500 text-white px-2 py-1 text-xs ml-1"
                onClick={() => handleInput(data?.id, "file")}
              >
                File +
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="ml-3">
        {showInput && (
          <div>
        
            <input
            
              className="border px-2 ml-4 "
               autoFocus
              onBlur={() => setShowInput(false)}
              value={text}
              onChange={(e) => settext(e.target.value)}
              onKeyDown={(e) => handleEnter(e)}
            />
          </div>
        )}
      </div>
      {showChildren && (
        <div className="ml-3 mt-1">
          {data.items.map((elem, index) => {
            return <Folder data={elem} key={index} handleData={handleData} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Folder;
