
import os from "os";
import Axios from "axios";

export type GetIPFunction = () => Promise<string>;

export const GetIfaceIP = (iface_name: string, family: "IPv4" | "IPv6") => {
    let ifaces = os.networkInterfaces();
    let iface = ifaces[iface_name];
    if(iface) {
        for(let i of iface) {
            if(i.family === family) {
                return i.address;
            }
        }
    }
    return "";
}

export class GetIP
{
    static ip4Local(iface: string) {
        return async () => {
            return GetIfaceIP(iface, "IPv4");
        };
    }
    
    static ip6Local(iface: string) {
        return async () => {
            return GetIfaceIP(iface, "IPv6");
        };
    }
    
    static async ip4External() {
        return (await Axios.get("https://api.ipify.org/")).data as string;
    }
    
    static async ip6External() {
        return (await Axios.get("https://api6.ipify.org/")).data as string;
    }
}