
export interface Environment {
    updateIPv4: boolean;                        // Update and check IPv4 records
    updateIPv6: boolean;                        // Update and check IPv6 records
    getIPv4?: () => Promise<string>;            // Function for ipv4. Default is GetIP.ip4External
    getIPv6?: () => Promise<string>;            // Function for ipv6. Default is GetIP.ip6External
    interval?: number;                          // Check interval in seconds. Default is 60
    domains: {
        name: string,                           // Domain name to update on cloudflare
        zone_id: string,                        // Zone id to update on cloudflare
    }[];
    apiKey: string;                             // The API key for cloudflare
    email: string;                              // The email registered with cloudflare
}