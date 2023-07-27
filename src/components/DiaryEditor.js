import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";

// 감정 배열
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  // 감정 클릭시 이미지 변경 함수
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  // 일기 작성 데이터 state
  const [content, setContent] = useState("");
  const contentRef = useRef();
  // 선택한 감정 정보 state
  const [emotion, setEmotion] = useState(3);
  // 날짜 state
  const [date, setDate] = useState(getStringDate(new Date()));

  // 작성 완료 함수
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true }); // home으로 이동
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새로운 일기쓰기"}
        leftChild={
          <MyButton
            text={"뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          ></MyButton>
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            ></MyButton>
          )
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
              ref={contentRef}
              value={content}
              placeholder="오늘은 어땠나요"
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
