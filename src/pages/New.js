import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  // 마운트될 때 페이지 타이틀 변경
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
