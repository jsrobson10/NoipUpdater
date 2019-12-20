import { Environment } from "./environment.types";
import { GetIP } from "./GetIP";

export default <Environment> {
    updateIPv4: true,
    updateIPv6: false,
    getIPv4: GetIP.ip4Local("enp6s0"),
    interval: 1,
    apiKey: "03816e305daf422ffaf296b9d139c694b88d1",
    email: "jsrobson10@gmail.com",
    domains: [
        {
            name: "onewaycoding.com",
            zone_id: "97d6a942829f6cf64b184f0d7cfb228c",
        },
    ]
}