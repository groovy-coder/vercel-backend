import {commandOptions, createClient} from "redis";
import { downloadS3Folder } from "./aws";
import { buildProject } from "./utils";
import {copyFinalDist} from "./aws";

const subscriber = createClient();
subscriber.connect();

async function main(){
    while(1){
        const res = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        console.log(res);
        const id = res?res.element:null;
        await downloadS3Folder(`/output/${id}`)
        await buildProject(id?id:"");
        await copyFinalDist(id?id:"");
    }
}
main();