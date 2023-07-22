import { useParams } from "react-router-dom";

const Diary = () => {
  //  라우터로 전달한 변수 꺼내오기 (path variable)
  const { id } = useParams();

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지 입니다</p>
    </div>
  );
};

export default Diary;
