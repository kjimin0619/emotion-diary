import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

// components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"header"}
          leftChild={
            <MyButton
              text={"왼쪽"}
              onClick={() => alert("왼쪽 클릭")}
            ></MyButton>
          }
          rightChild={
            <MyButton
              text={"오른쪽"}
              onClick={() => alert("오른쪽 클릭")}
            ></MyButton>
          }
        ></MyHeader>

        <h2>App.js</h2>

        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"positive"}
        ></MyButton>
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"negative"}
        ></MyButton>
        <MyButton text={"버튼"} onClick={() => alert("버튼클릭")}></MyButton>

        <Routes>
          {/* path가 index.js를 가리키고 있으면 Home을 렌더링 */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
        {/* <RouteTest></RouteTest> */}
        {/* 페이지 이동 */}
      </div>
    </BrowserRouter>
  );
}

export default App;
