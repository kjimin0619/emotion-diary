import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
