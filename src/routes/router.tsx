import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import RunListPage from "../pages/Runlist";
import Errorpage from "../pages/errorPage";
import App from "../App";
import Blog from "../pages/Blog/Blog";
import WriteBlogCard from "../pages/Blog/WriteBlogCard";
import BlogDetail from "../pages/Blog/BlogDetail";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: 'runList',
        element: <RunListPage />
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path: 'writeBlogCard',
        element: <WriteBlogCard />
      },
      {
        path: 'blog/:id',
        element: <BlogDetail />
      }
    ],
    errorElement: <Errorpage />,
  },
]);

export default router;
