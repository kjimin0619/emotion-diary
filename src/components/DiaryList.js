import { useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

// 정렬 기준 선택메뉴
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  // 보기 정렬기준
  const [sortType, setSortType] = useState("latest");
  // 감정 보기 기준
  const [filter, setFilter] = useState("all");

  // 정렬
  const getProcessedDiaryList = () => {
    // 생성일 비교 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date - a.date);
      } else {
        return parseInt(a.date - b.date);
      }
    };

    // 필터링 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // deep copy
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정 필터
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((it) => filterCallBack(it) === true);
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          ></ControlMenu>
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          ></ControlMenu>
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={" 새 일기 쓰기"}
            onClick={() => {
              navigate("/new");
            }}
          ></MyButton>
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          <DiaryItem
            id={it.id}
            emotion={it.emotion}
            content={it.content}
            date={it.date}
          ></DiaryItem>
        </div>
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
