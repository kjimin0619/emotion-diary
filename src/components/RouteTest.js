import { Link } from "react-router-dom";
const RouteTest = () => {
  return (
    <>
      {/* home 으로 이동하는 링크 */}
      <Link to={"/"}>Home</Link>
      <br></br>
      <Link to={"/diary"}>Diary</Link>
      <br></br>
      <Link to={"/new"}>New</Link>
      <br></br>
      <Link to={"/edit"}>Edit</Link>
      <br></br>
    </>
  );
};

export default RouteTest;
