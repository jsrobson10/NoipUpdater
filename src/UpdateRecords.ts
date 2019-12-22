
import axios from "axios";
import environment from "./environment";

const CLOUDFLARE_UPDATE_RECORD = (zone_id: string, record_id: string) => {
    return "https://api.cloudflare.com/client/v4/zones/"+zone_id+"/dns_records/"+record_id;
}

const CLOUDFLARE_QUERY_RECORD = (zone_id: string) => {
    return "https://api.cloudflare.com/client/v4/zones/"+zone_id+"/dns_records";
}

export interface Record {
    type: string;
    id: string;
    name: string;
};

export const UpdateRecords = async (ip: string, type: "A" | "AAAA") =>
{
    for(let account of environment.accounts) {
        for(const { name, zone_id } of account.domains) {
            try {
    
                let cloudflareHeaders = {
                    "X-Auth-Email": account.email,
                    "X-Auth-Key": account.apiKey,
                    "Content-Type": "application/json",
                };
    
                let queryResponse = await axios.get(
                    CLOUDFLARE_QUERY_RECORD(zone_id),
                    {
                        params: {
                            name: name
                        },
                        headers: cloudflareHeaders
                    }
                );
    
                let record: Record | undefined;
    
                for(let r of queryResponse.data.result as Record[]) {
                    if(r.type === type) {
                        record = r;
                    }
                }
    
                if(record) {
                    let updateResponse = await axios.put(
                        CLOUDFLARE_UPDATE_RECORD(zone_id, record.id),
                        {
                            type: record.type,
                            name: record.name,
                            content: ip,
                        }, {
                            headers: cloudflareHeaders
                        }
                    );
        
                    if(updateResponse.status !== 200) {
                        console.log("Domain "+name+" with record "+type+" failed with status "+updateResponse.status);
                    } else {
                        console.log("Updated "+name+" with record "+type+" to "+ip);
                    }
                } else {
                    console.log("record is undefined");
                }
    
            } catch(e) {
                console.log("Domain "+name+" with record "+type+" failed with error.");
                console.log(e);
            }
        }
    }
}