# CloudflareUpdater
Auto-update your cloudflare A and AAAA records.

## Simple usage

To configure domains to be automatically updated, you will
need to create `environment.ts`. You can copy/paste this sample
and modify it to your needs:
```
export default <Environment> {
    updateIPv4: true,
    updateIPv6: true,
    getIPv4: GetIP.ip4External,
    getIPv6: GetIP.ip6External,
    interval: 1,
    accounts: [
        {
            apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            email: "email@example.com",
            domains: [
                {
                    name: "example.com",
                    zone_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                },
            ]
        }
    ]
}
```

## Customising the IP getter function

You can use your own functions to get an IP address
in `getIPv4` and `getIPv6` in the JSON file,
but it will have to return a `Promise<string>` or
be of type `Environment`.

You can also use the included default IP getters:
```
GetIP.ip4Local(interface: string)
GetIP.ip6Local(interface: string)
GetIP.ip4External
GetIP.ip6External
```

Note that `ip4Local` and `ip6Local` get the ip from the
network interface specified, so this is recommended if
the server is the router. It's recommended to use a custom
IP getter function if you have some other way of getting
the global IP address (like a http request to the router
server).

## Libraries
To install all the required libraries, you can run
```
npm install
```

## Testing

To test you can run
```
npm run start
```

## Building

To build you can run
```
npm run build
```

## Production

For production you can either:

- Cd to the build dir and execute `node main.js`
- Run `npm run production:start`

## Installation

For installation you can either:

- Copy the generated `cloudflareupdater.service` to `/etc/systemd/system`
and enable it with `sudo systemctl enable cloudflareupdater.service` and
start it with `sudo service cloudflareupdater start`.
- Run `sudo npm run install`

Note: for installation you must have run the
build command.
```
npm run build
```
This will also generate `cloudflareupdater.service`.
You must keep these files here otherwise the cloudflare
updater daemon won't work.