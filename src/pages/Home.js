import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  // context 받아오기
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);

  // 헤더
  // 날짜 저장
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  // 아이템
  // 날짜가 바뀔 때만 다이어리 아이템 리스트가 업데이트
  useEffect(() => {
    // 다이어리 리스트의 길이가 1 이상일 때만 업데이트
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData(diaryList.filter((it) => firstDay <= it.date <= lastDay));
    }
  }, [diaryList, curDate]);

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={
          <MyButton
            text={"<"}
            onClick={() => {
              decreaseMonth();
            }}
          ></MyButton>
        }
        rightChild={
          <MyButton
            text={">"}
            onClick={() => {
              increaseMonth();
            }}
          ></MyButton>
        }
      ></MyHeader>
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
};

export default Home;
