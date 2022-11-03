import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Blog.module.css'
import slug from './blogpost/[slug]'
import InfiniteScroll from 'react-infinite-scroll-component';
import * as fs from 'fs'
const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs)
  const [count,setCount] = useState(2);
  const fetchMoreData = async() => {
    let d= await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`)
    setCount(count+2)
    let data = await d.json();
          setBlogs(data)
  };
  return (
    <div className={styles.blogs}>
      <main className={styles.main}>

        <InfiniteScroll
          dataLength={2} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={props.allCount!==blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
         {blogs.map((data, index) => {
          return (

            <div className={styles.blogitem} key={index}>
              <Link href={`/blogpost/${data.slug}`}>
                <h3 className={styles.blogItemh3}>{data.title}</h3>
              </Link>
              <p className={styles.blogItemp}>{data.metadesc.substr(0, 140)}...</p>
            </div>
          )
        })}
        </InfiniteScroll>

        
      </main>
    </div>
  )
}

// export async function getServerSideProps(context){
//   const response =await fetch("http://localhost:3000/api/blogs")
//   const allBlogs =await response.json();
//   return{
//     props:{allBlogs}
//   }
// }


// getStaticProps doest support the api thats why we need to extract the data through hardcoding
export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata")
  let allCount = data.length;
  let myFile;
  let allBlogs = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    myFile = await fs.promises.readFile(('blogdata/' + item), 'utf-8');
    allBlogs.push(JSON.parse(myFile));
  }
  return {
    props: { allBlogs,allCount }
  }
}
export default Blog