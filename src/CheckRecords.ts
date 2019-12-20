
//import fs from "fs";
import environment from "./environment";
import { UpdateRecords } from "./UpdateRecords";
import fs from "fs";

let IPs_dirty = false;
let IPs = {
    ipv4: "",
    ipv6: "",
}

try {
    IPs = JSON.parse(fs.readFileSync("./ips.json").toString());
}

catch {
}

setInterval(() => {
    if(IPs_dirty) {
        fs.writeFileSync("./ips.json", JSON.stringify(IPs));
        IPs_dirty = false;
    }
}, 1000);

export const CheckRecords = async () =>
{
    if(environment.updateIPv4 && environment.getIPv4) {
        let ip = await environment.getIPv4();
        if(ip !== IPs.ipv4) {
            IPs.ipv4 = ip;
            IPs_dirty = true;
            UpdateRecords(ip, "A");
        }
    }

    if(environment.updateIPv6 && environment.getIPv6) {
        let ip = await environment.getIPv6();
        if(ip !== IPs.ipv6) {
            IPs.ipv6 = ip;
            IPs_dirty = true;
            UpdateRecords(ip, "AAAA");
        }
    }
}