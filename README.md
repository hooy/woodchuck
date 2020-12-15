# woodchuck
Flask + SocketIO + React examle app

# Installation

## Server

Good idea is to use virtual environments for python, you need python3 on your system

Create env: `python3 -m venv /path/to/new/virtual/environment`
```bash
$ python3 -m venv venv/
```
Activate it (now all dependencies will be installed on that env only)
```bash
$ source venv/bin/activate
```

install requirements via pip:
```bash
$ pip install -r requirements.txt
```

specify config file (via envrc) *or* just create environment variable that indicates where configuration file is:
```bash
export WOODCHUCK_SETTINGS=/path/to/woodchuck/server.cfg
```

Run:
```bash
python server/app.py
```

