import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import WritePage from "./pages/Write";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import PrivateRoute from "./lib/PrivateRoute";
import ProfilePage from "./pages/Profile";

function App() {
  // const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<HomePage user={user}></HomePage>} />
        <Route path="signUp" element={<SignUpPage></SignUpPage>} />
        <Route
          path="/write"
          element={
            <PrivateRoute
              path="/write"
              component={<WritePage />}
            ></PrivateRoute>
          }
        />
        <Route
          path={`/detail/:postId`}
          element={<PostDetail user={user}></PostDetail>}
        ></Route>
        <Route
          path={`/edit/:postId`}
          element={
            <PrivateRoute
              path={`${location.pathname}`}
              component={<EditPost user={user}></EditPost>}
            />
          }
        ></Route>
        <Route
          path={`/profile/:userId`}
          element={
            <PrivateRoute
              path="/profile/:userId"
              component={<ProfilePage user={user} />}
            ></PrivateRoute>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
