
import fs from 'fs';
import os from 'os';

const user = os.userInfo().username;
const directory = process.cwd() + "/build";

const SystemdConf = `
[Unit]
Description=Cloudflare Auto Updater
After=systemd-networkd-wait-online.service
Wants=systemd-networkd-wait-online.service

[Service]
User=`+user+`
Type=simple
WorkingDirectory=`+directory+`
ExecStart=/usr/bin/node `+directory+`/main.js
Restart=on-failure
RemainAfterExit=no

[Install]
WantedBy=multi-user.target
`;

fs.writeFileSync("./cloudflareupdater.service", SystemdConf);

console.log("To install:\nsudo npm run install");