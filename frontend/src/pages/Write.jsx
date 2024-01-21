import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import instance from "../lib/axios.js";
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
  const [files, setFiles] = useState([]);
  const [tag, setTag] = useState("healing");
  // const saveImage = (e) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   const selectedFiles = Array.from(e.target.files); // 선택된 모든 파일을 배열로 변환
  //   const previewUrls = [];

  //   // 각 파일에 대한 미리보기 URL 생성
  //   selectedFiles.forEach((file) => {
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       previewUrls.push(reader.result);
  //       // 모든 미리보기 URL을 상태에 업데이트
  //       if (previewUrls.length === selectedFiles.length) {
  //         setFiles({
  //           files: selectedFiles,
  //           urls: previewUrls,
  //         });
  //       }
  //     };
  //   });
  // };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tag", tag);
        // formData.append("userId", user.id);
        files.forEach((file) => {
          formData.append("img", file);
        });
        await instance.post("/api/post", formData);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    },
    [files, title, content, tag, navigate]
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
          multiple // 여러 파일 선택을 허용
          onChange={handleFileChange}
        />
        {files && (
          <div className="preview">
            {files.map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`previewImg-${index}`}
                />
                <button onClick={() => handleRemoveFile(index)}>삭제</button>
              </div>
            ))}
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
