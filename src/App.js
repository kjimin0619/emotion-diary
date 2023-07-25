import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

// components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

const reducer = (oldState, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...oldState];
      break;
    }
    case "REMOVE": {
      newState = oldState.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = oldState.map((it) =>
        it.td === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return oldState;
  }
  return newState;
};

export const DiaryStateContext = React.createContext(); // 데이터 공급
export const DiaryDispatchContext = React.createContext(); // 함수 공급

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1690283858420,
  },
  {
    id: 2,
    emotion: 4,
    content: "오늘의 일기 2번",
    date: 1690283858426,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1690283858432,
  },
  {
    id: 4,
    emotion: 2,
    content: "오늘의 일기 4번",
    date: 1690283858480,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1690283858489,
  },
];

function App() {
  // 일기 데이터 관리
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  // create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  // remove
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId: { targetId },
    });
  };

  // edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content: { content },
        emotion: { emotion },
      },
    });
  };

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
