import {Endpoint, S3} from "aws-sdk";
import {dir} from "console";
import fs from "fs";
import path from "path";

 const s3 = new S3({
    accessKeyId:"askjd",
    secretAccessKey:"asiuhzdj",
    endpoint:"https://"
 });
 export async function downloadS3Folder(prefix:string){
    console.log(prefix)
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel",
        Prefix: prefix
    }).promise();
    const allPromises = allFiles.Contents?.map(async ({Key})=>{
        return new Promise(async (resolve)=>{
            if(!Key){
                resolve ("");
                return;
            }
            const finalOutputPath = path.join(__dirname,Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName= path.dirname(finalOutputPath);
            if(!fs.existsSync(dirName)){
                fs.mkdirSync(dirName,{recursive :true})
            }
            s3.getObject({
                Bucket : "vercel",
                Key
            }).createReadStream().pipe(outputFile)
            .on("finish",()=> {
                resolve("");
            })
        })
    }) || []
    await Promise.all(allPromises?.filter(x=>x !=undefined));
}
export function copyFinalDist(id: string ){
    const folderPath = path.join(__dirname,`output/${id}/dist`);
    const allFiles=getAllFiles(folderPath);
    allFiles.forEach(File =>{
        uploadFile(`dist/${id}/`+(File+"").slice(folderPath.length+1),File);
    })
}
const getAllFiles=(folderPath: string)=>{
    let response :string []=[];
    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file=>{
        const fullFilePath = path.join(folderPath,file);
        if(fs.statSync(fullFilePath).isDirectory()){
            response=response.concat(getAllFiles(fullFilePath))
        }else{
            response.push(fullFilePath);
        }
    });
    return response;
}
const uploadFile= async(fileName:string ,localFilePath:string)=>{
    const fileContent=fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body:fileContent,
        Bucket:"vercel",
        Key:fileName,
    }).promise();
    console.log(response);
}