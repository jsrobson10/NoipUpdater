
import fs from 'fs';
import os from 'os';
import { exec } from 'child_process';

const execute = (command: string, type: "OUT" | "ERR" = "OUT") => {
    return new Promise<string>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if(error) {
                reject(error);
            } else {
                if(type === "OUT") {
                    resolve(stdout);
                }

                if(type === "ERR") {
                    resolve(stderr);
                }
            }
        })
    });
}


if(os.userInfo().username === "root") {
    (async () => {

        fs.copyFileSync("./cloudflareupdater.service", "/etc/systemd/system/cloudflareupdater.service");
        console.log("Copied cloudflareupdater.service to /etc/systemd/system/cloudflareupdater.service");
        
        console.log("Enabling cloudflareupdater.service");
        await execute("systemctl enable cloudflareupdater.service", "ERR");
        console.log("Enabled cloudflareupdater.service");

        console.log("Stopping cloudflareupdater.service");
        await execute("systemctl stop cloudflareupdater.service", "ERR");
        console.log("Stopped cloudflareupdater.service");

        console.log("Starting cloudflareupdater.service");
        await execute("systemctl start cloudflareupdater.service", "ERR");
        console.log("Started cloudflareupdater.service");
    
        console.log("Installed Cloudflare Updater. Make sure to keep this folder here.");
    
    })();
}

else {
    console.log("You must be root.");
}