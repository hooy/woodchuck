# woodchuck
Flask + SocketIO + React examle app

# Installation
## Docker
simply run in root directory of the project
```bash
docker-compose up
```
:exclamation: Note: 3000 (React) and 5000 (Flask) ports must be free

## Manual
If for some reason you don't want to use docker, or docker is not available in your system, project can be set up manually, follow server and client sections.

### Server

Good idea is to use virtual environments for python, you need python3 on your system

Create env: `python3 -m venv /path/to/new/virtual/environment`
```bash
$ python3 -m venv venv/
```
Activate it (now all dependencies will be installed on that env only)
```bash
$ source venv/bin/activate
```

install requirements (from server directory) via pip:
```bash
$ pip install -r requirements.txt
```

specify config file (via envrc) *or* just create environment variable that indicates where configuration file is:
```bash
$ export WOODCHUCK_SETTINGS=/path/to/woodchuck/server.cfg
```

Run:
```bash
$ python server/app.py
```


## Client
Install dependencies:
```bash
$ npm install
```

Run:
```bash
$ npm start
```
