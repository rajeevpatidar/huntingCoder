// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';
import { parse } from 'path';
export default async function  handler(req, res) {
  let data =await fs.promises.readdir("blogdata")
  data = data.slice(0,parseInt(req.query.count))
  let  myFile ;
  let allBlog = [];
  for(let i=0;i<2;i++){
      const item = data[i];
      myFile = await fs.promises.readFile(('blogdata/'+item),'utf-8');
      allBlog.push(JSON.parse(myFile));
  }
  res.status(200).json(allBlog);
  }
  