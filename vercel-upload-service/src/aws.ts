import {S3} from "aws-sdk";
import fs from "fs";

const s3= new S3({
    accessKeyId:"hidj",
    secretAccessKey:"kdsj",
    endpoint:"dsjhug"
});

export const uploadFile = async (filename:string, localFilePath:string)=>{
    const filecontent = fs.readFileSync(localFilePath);
    console.log("called");
    const response= await s3.upload({
        Body: filecontent ,
        Bucket:"VERCEL",
        Key: filename
    }).promise();
    console.log(response);
}