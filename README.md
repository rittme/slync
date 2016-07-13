# Slync: The slick sync

This is the repo for the slync web app.

## Requirements

* node 5.0+, npm 3.0+ (You can install both [here](https://nodejs.org))

## Installation

Just clone the repo and install the dependencies.

```sh
git clone https://github.com/rittme/slync.git
cd slync
npm install
```

## Running tasks

You may run `npm run help` to see a description of all commands available, which you can run via `npm run [command]`. Here are some important ones:

### Developing the web app

If you want to watch assets and compile them continuously, you will want to run
```sh
npm run start
```
This way, when you make changes to the `app` folder, they will be reflected immediately without needing to restart the add-on.
