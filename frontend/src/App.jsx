import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import WritePage from "./pages/Write";
import PostDetail from "./pages/PostDetail";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="signUP" element={<SignUpPage></SignUpPage>} />
        <Route path="/write" element={<WritePage></WritePage>} />
        <Route
          path={`/detail/:postId`}
          element={<PostDetail></PostDetail>}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
