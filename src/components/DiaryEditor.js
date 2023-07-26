import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

// 감정 배열
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];
const DiaryEditor = () => {
  const navigate = useNavigate();

  // 날짜 형식 변환 함수
  const getStringDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  // 감정 클릭시 이미지 변경 함수
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  // 일기 작성 데이터 state
  const [content, setContent] = useState("");
  const contentRef = useRef();
  // 선택한 감정 정보 state
  const [emotion, setEmotion] = useState(3);
  // 날짜 state
  const [date, setDate] = useState(getStringDate(new Date()));

  // 작성 완료 함수
  const { onCreate } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true }); // home으로 이동
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새로운 일기쓰기"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          ></MyButton>
        }
      ></MyHeader>

      <div>
        <section>
          <h4>오늘의 날짜</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </div>
        </section>

        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                emotion_id={it.emotion_id}
                emotion_descript={it.emotion_descript}
                emotion_img={it.emotion_img}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              ></EmotionItem>
            ))}
          </div>
        </section>

        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)}></MyButton>
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            ></MyButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
