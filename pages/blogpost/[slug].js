import React, { useState,useEffect } from 'react'
import {useRouter} from 'next/router';
import styles from '../../styles/BlogPost.module.css'
import * as fs from 'fs';

const Slug = (props) => {
  const [blog,setBlogs] = useState(props.myBlog);
  // const {blog} = props.myBlog;
  // console.log(props.myBlog);
  // console.log(blog);
  function createMarkup(c) {
    return {__html: c};
  }
    return <div className={styles.container}>
    <main className={styles.main}>
      <h1>{blog && blog.title}</h1>
      <hr />
      { blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)} ></div>}
    </main>
    </div>
}
export async function getStaticPaths(){
  return{
    paths:[
      {params:{slug:'how-to-learn-flask'}},
      {params:{slug:'how-to-learn-javascript'}},
      {params:{slug:'how-to-learn-next.js'}}
    ],
    fallback:true
  }
}
export async function getStaticProps(context){
  const {slug} = context.params;
  console.log(context.params);
  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`,"utf-8")
  // let myBlog = await data.json();
  return {
    props:{myBlog:JSON.parse(myBlog)},
  }
}




// export async function getServerSideProps(context){
 
//   const {slug} = context.query;
//   const data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//   const myblog = await data.json()
//   return{
//     props:{myblog}
//   }
// }
export default Slug