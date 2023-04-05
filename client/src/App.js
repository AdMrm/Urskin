import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import IndexPage from './pages/indexPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import PostPage from './pages/postPage';
import {UserContextProvider} from './userContext'
import CreatePost from './pages/createPost';
import EditPost from './pages/editPost';
import AboutPage from './pages/aboutPage';
function App() {

  return (
   
      <UserContextProvider>
        <Routes >
        <Route path='/' element={ <Layout/>} >
           <Route path='/' element ={ <IndexPage />} />
           <Route path={'/login'} element={<LoginPage/>} />
           <Route path={'/register'} element={<RegisterPage/>} />
           <Route path={'/create'} element={<CreatePost/>} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={"/edit/:id"} element={<EditPost />} />
          <Route path={'/about'} element={<AboutPage/>} />
        </Route>
      </Routes>
      </UserContextProvider>
      
   
    
  )
}
export default App;