import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  // 원본 데이터
  const [originData, setOriginData] = useState();

  // 마운트될 때 페이지 타이틀 변경
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  // 페이지 이동함수 navigate
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList);

  // 현재 아이템의 id와 일치하는 다이어리 리스트 원소 가져오기
  // 이건 마운트 시점에 수행
  // 이후 diaryList가 변화하거나 id가 달라지면 다시 접근수행
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      // 잘못된 페이지(없는 일기) 접근 처리
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      <h2>
        {originData && (
          <DiaryEditor isEdit={true} originData={originData}></DiaryEditor>
        )}
      </h2>
    </div>
  );
};

export default Edit;
