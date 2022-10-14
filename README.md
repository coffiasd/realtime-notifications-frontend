## Overview

This is gitcoin hackathon project.We built an algoland blockchain realtime notifications server.

## flow-chart

![alt Flowchart](public/Flowchart.jpg "Flowchart")

## front-end

![alt Flowchart](public/Frontend.png "Flowchart")

We built frontend page using next.js and tailwindcss.After all job done we will deploy frontend codes on vercel platform.

Step by step to subscribe the blockchain events.

-1.Connect Wallet(WalletConnect && Pera Algo Wallet)
-2.Save Notify Device ID(see the details below)
-3.Subscribe Events
-4.Wait for Notifications

Afert all steps done when you trigger events like send token or receive token from faucet you will receive pushed notifications in your mobile app, it's realtime.

[clike me to view the front-end website](https://realtime-notifications-frontend-7ml7r55hk-ayden-lee.vercel.app "subscribe")

### How do i get the notify device ID ?

We push message to our user via a mobile app named pushover.
You can download the app through the links below.
[Andriod](https://play.google.com/store/apps/details?id=net.superblock.pushover)
[IOS](https://apps.apple.com/us/app/pushover-notifications/id506088175?ls=1)
[Website](https://pushover.net/)
After you download the app go to setting page you will find the "PUSHOVER USER KEY".
This key is actually what we want.
We will use this key on our front-end page so you need to copy it down anyway.

## back-end

[click me to view back-end sourcecode](https://github.com/coffiasd/realtime-notifications-backend "sourcecode")

### teck stack

-golang
-gin framework

Below is a document tree of my golang back-end sourcecode.

```
├─api(http protocol)
├─conf(toml config file)
├─config(parse config file)
├─cron(fetch blockchain server)
├─events(some events)
├─logs(server logs)
├─middleware(redis middleware)
├─router(router)
└─utils(common functions)
```

We built back-end using golang and gin framework at the same time.This golang server provide a http protocol for our front-end clients to subcribe events or unsubcribe events.
It's very convenient.All our users need to do is just login via mobile wallet like "Pera" and click some buttons.

## youtube

[click me to view a video on youtube of how to use it](https://www.google.com "sourcecode")
