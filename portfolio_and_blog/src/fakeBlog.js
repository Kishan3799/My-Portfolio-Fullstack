// fakeBlogs.js

import { images } from "./constants";
const fakeBlogs = [
    {
      blog_id: 1,
      blog_title: 'Introduction to ReactJS',
      blog_author: 'John Doe',
      created_at: '2023-01-01',
      contents: [
        {
          heading:"Introduction to ReactJS: Building Dynamic and Engaging User Interfaces" , paragraph: "Welcome to the world of ReactJS, a powerful and versatile JavaScript library designed to simplify the creation of interactive and dynamic user interfaces (UIs). In this beginner-friendly guide, we'll delve into the fundamentals of ReactJS, explore its key features and benefits, and get you started with building your first React application."
        },
        {
          heading:"What is ReactJS?" , paragraph: "ReactJS is an open-source JavaScript library created by Facebook in 2011. It's widely adopted by developers around the globe for building complex and scalable web applications. React takes a component-based approach, where complex UIs are broken down into smaller, reusable components, making code development and maintenance more efficient and manageable."
        },
        {
          heading:"What is ReactJS?" , paragraph: "ReactJS is an open-source JavaScript library created by Facebook in 2011. It's widely adopted by developers around the globe for building complex and scalable web applications. React takes a component-based approach, where complex UIs are broken down into smaller, reusable components, making code development and maintenance more efficient and manageable."
        },
        {
          heading:"Code" , paragraph: `class Post:
          def __init__(self, title, content, creation_date):
            self.id = None  # Auto-generated during database insertion
            self.title = title
            self.content = content
            self.creation_date = creation_date.`
        },
      ],
      blog_short_summary: 'Learn the basics of ReactJS and how to build interactive user interfaces.',
      blog_image: images.projectImage,
    },
    {
      blog_id: 2,
      blog_title: 'Getting Started with Node.js',
      blog_author: 'Jane Smith',
      created_at: '2023-02-15',
      blog_short_summary: 'Explore the fundamentals of Node.js and build scalable server-side applications.',
      blog_image: images.projectImage,
    },
    {
      blog_id: 3,
      blog_title: 'Responsive Web Design Techniques',
      blog_author: 'Bob Johnson',
      created_at: '2023-03-10',
      blog_short_summary: 'Learn strategies to create responsive and mobile-friendly web designs.',
      blog_image: images.projectImage,
    },
    {
      blog_id: 4,
      blog_title: 'JavaScript ES6 Features',
      blog_author: 'Alice Brown',
      created_at: '2023-04-05',
      blog_short_summary: 'Explore the new features introduced in ECMAScript 2015 (ES6) for modern JavaScript development.',
      blog_image: images.projectImage,
    },
    {
      blog_id: 5,
      blog_title: 'Diving into GraphQL',
      blog_author: 'Charlie Green',
      created_at: '2023-05-20',
      blog_short_summary: 'Discover the benefits of GraphQL and how to use it to efficiently fetch data for your applications.',
      blog_image: images.projectImage,
    },
    {
      blog_id: 6,
      blog_title: 'CSS-in-JS: Styling in React Applications',
      blog_author: 'Eva White',
      created_at: '2023-06-12',
      blog_short_summary: 'Learn about different approaches to styling in React, including CSS-in-JS libraries.',
      blog_image: images.projectImage,
    },
    {
      blog_id: 7,
      blog_title: 'The Power of Redux in State Management',
      blog_author: 'David Black',
      created_at: '2023-07-03',
      blog_short_summary: 'Understand how Redux can help manage the state in your React applications efficiently.',
      blog_image: images.projectImage,
    },
  ];

  export const getItemId = (blogId)=>{
      return fakeBlogs.find((blog)=> blog.blog_id === blogId)
  }
  
  export default fakeBlogs;
  