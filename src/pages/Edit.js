import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // query string 꺼내쓰기 : useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  // 페이지 이동함수 navigate
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지</p>
      <button onClick={() => setSearchParams({ who: "jimin" })}>
        QS change
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        {" "}
        home으로 이동{" "}
      </button>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
    </div>
  );
};

export default Edit;
