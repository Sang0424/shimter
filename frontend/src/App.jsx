import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import WritePage from "./pages/Write";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage user={user}></HomePage>} />
        <Route path="signUp" element={<SignUpPage></SignUpPage>} />
        <Route path="/write" element={<WritePage user={user}></WritePage>} />
        <Route
          path={`/detail/:postId`}
          element={<PostDetail user={user}></PostDetail>}
        ></Route>
        <Route
          path={`/edit/:postId`}
          element={<EditPost user={user}></EditPost>}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
