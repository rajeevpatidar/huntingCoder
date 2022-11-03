import * as fs from 'fs';
export default async function handler(req,res){
    if(req.method=='POST'){
        // console.log(req.body);
        const data = await fs.promises.readdir('contactdata');
        
        fs.promises.writeFile(`contactdata/${data.length+1}.josn`,JSON.stringify(req.body))
        res.status(200).json(["post request make"])
        // res.status(200).json(req)
    }
    else{
        res.status(200).json(["other request"])
    }
}