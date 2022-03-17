# AREA

## HOW TO LAUNCH THE PROJECT

Make sure to have a Firebase database project, node installed and Flutter SDK too.

### INSTALLATION WEB

To launch web app, in the /web folder :

```
- cd ./server
- npm install
- npm start
```
These commands will start the server, now let's start the client, in the /web folder :

```
- cd ./client
- npm install
- npm start
```

Easy !

### INSTALLATION APP

More difficult, you need to start the server from the /web folder. Then, in the /app folder :

```
flutter pub get
flutter run
```
It's possible Flutter won't compile because of compilerSDKversion. If you get this error, modify the variable in the build.gradle in /android

### SIMPLE INSTALLATION WITH DOCKER

Do you have Docker installed ? This project is fully dockerised but can take more than 8Gb of storage. To launch Docker :

```
- docker-compose build
- docker-compose up
```

Done !

## LANGUAGES USED

<p>Application -> Flutter</p>

<p>Website -> React + node.js</p>

<p>Database -> Firebase</p>

## CREATORS

All informations about the project is accessible in [Quentin Tréheux](https://github.com/LuciferBahamut/Area) repository. This repository contains all test (Github Actions), contributors and more !
