import environment from "./environment";
import { GetIP } from "./GetIP";
import { CheckRecords } from "./CheckRecords";

if(!environment.getIPv4) {
    environment.getIPv4 = GetIP.ip4External;
}

if(!environment.getIPv6) {
    environment.getIPv6 = GetIP.ip6External;
}

if(!environment.interval) {
    environment.interval = 60;
}

console.log("CloudflareUpdater Started");
setInterval(() => CheckRecords(), environment.interval * 1000);
CheckRecords();