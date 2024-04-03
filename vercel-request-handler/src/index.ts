import express from "express";
import {S3} from "aws-sdk";
 const s3= new S3({
    accessKeyId: "ewiuahsjd",
    secretAccessKey:"dskjh",
    endpoint:"sdkijhu"
 });

const app = express();

app.get("/*",async (req,res)=>{
    const host = req.hostname;
    console.log(host);
    const id = host.split(".")[0];
    const filePath=req.path;
    const contents = await s3.getObject({
        Bucket:"vercel",
        Key:`dist/${id}/${filePath}`

    }).promise();
    const type=filePath.endsWith("html")?"text/html":(filePath.endsWith("css")?"text/css":"application/javascript");
    res.set("Content-type",type);
    res.send(contents.Body);
});
app.listen(3001);