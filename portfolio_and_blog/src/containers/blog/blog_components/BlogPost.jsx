import React from 'react'

import { getItemId } from '../../../fakeBlog'
import { useLocation, useParams } from 'react-router-dom'
import {dateFormatter} from '../../../utils/DateFormater'
const BlogPost = () => {
  const location = useLocation();
  console.log(location.state.blogData)
  const currentBlogData = location.state.blogData
  

  if(!currentBlogData){
    return <div>Blog not found</div>;
  }

  return (
    <div className="app_blog_content">
      <div className='blog_intro'>
        <h1>{currentBlogData.blog_title}</h1>
        <p>Author: {currentBlogData.blog_auther.name} | Created at:  { dateFormatter(currentBlogData.createdAt)} </p>
      <div>

      <div className='blog_content'>
       <div dangerouslySetInnerHTML={{ __html: currentBlogData.blog_content}} />
      </div>
    </div> 
      
    </div>
    </div>
  )
}

export default BlogPost
