import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import axios from "axios";
import "./Write.scss";

const WritePage = () => {
  const navigate = useNavigate();
  // const [form, setForm] = useState({
  //   title: "",
  //   content: "",
  //   tag: "",
  // });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState({
    file: "",
    url: "",
  });
  const [tag, setTag] = useState("");
  const saveImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = async () => {
      setFile({
        file: e.target.files[0],
        url: reader.result,
      });
    };
  };
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        //formData.append("form", JSON.stringify(form));
        formData.append("img", file.file);
        formData.append("tag", tag);
        const response = await axios.post("/api/post", formData);
        if (response.data === "Success") {
          navigate("/");
        } else {
          console.log("Error while posting");
        }
      } catch (e) {
        console.log(e);
      }
    },
    [file.file, title, content, tag, navigate]
  );
  return (
    <div className="contentWrapper">
      <h1>글 작성하기</h1>
      <hr />
      <form
        className="write"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label>제목</label>
        <input
          type="text"
          className="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        ></input>
        <label>게시판</label>
        <select
          className="tag"
          name="tag"
          onChange={(e) => setTag(e.target.value)}
          defaultValue={"healing"}
        >
          <option value="rest">휴식</option>
          <option value="healing">힐링</option>
          <option value="smile">웃음</option>
          <option value="praise">칭찬</option>
        </select>
        <label>내용</label>
        <input
          type="textarea"
          className="content"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        ></input>
        <label>파일 선택</label>
        <input
          type="file"
          className="img"
          accept="image/*"
          onChange={saveImage}
        />
        {file.file && (
          <div className="preview">
            <img src={file.url} alt="previewImg"></img>
          </div>
        )}
        <br />
        <button className="done">작성하기</button>
        <input id="cancel" type="button" value="취소" />
      </form>
    </div>
  );
};
export default WritePage;
