
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './containers/about/About'
import Blog from './containers/blog/Blog'
import Contact from './containers/contact/Contact'
import Header from './containers/header/Header'
import Project from './containers/projects/Project'
import ParticleBg from './component/ParticleBg'

import './App.css'
import Home from './containers/home/Home'
import BlogPost from './containers/blog/blog_components/BlogPost'
import Login from './containers/login/Login'
import AdminAbout from './containers/admin/AdminAbout'
import AdminProject from './containers/admin/AdminProject'
import AdminBlog from './containers/admin/AdminBlog'
import AdminDashboard from './containers/admin/AdminDashboard'
import axios from 'axios'
import Sidebar from './component/Sidebar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [auth , setAuth] = useState(false);
  useEffect(()=>{
    const checkAuth = async()=> {
      try{
       await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/admin_user/isLoggedIn`, {withCredentials:true});
      //  console.log(response.data)
        setAuth(true);
      }catch(err){
        setAuth(false);
      }
    };

    checkAuth();
  },[]);

  return (
    <>
    <main className='app'>
      <ParticleBg/>
      <BrowserRouter>
      {auth && <Sidebar setAuth={setAuth} />}
      {!auth && <Header />}
        <Routes>
          <Route path='/login' element = {<Login setAuth={setAuth}/>}/>
          <Route path='/adminDashboard' element={auth ? <AdminDashboard/> : <Login setAuth={setAuth}/>}/>
          <Route path='/adminBlog' element={auth ? <AdminBlog/> : <Login setAuth={setAuth}/>}/>
          <Route path='/adminAbout' element = {auth ? <AdminAbout/> : <Login setAuth={setAuth}/>}/>
          <Route path='/adminProject' element = {auth ? <AdminProject/> : <Login setAuth={setAuth}/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/blogpost' element={<BlogPost/>}/>
          <Route path='/project' element={<Project/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </main>
    <ToastContainer/>
    </>
  )
}

export default App
