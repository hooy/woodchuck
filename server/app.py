"""
Woodchuck backend
Flask application with socket.io

Aim is to create a webpage that is constantly updated with random numbers from a background python process.
PEP8 is ensured by using black <https://black.readthedocs.io/en/stable/index.html>
"""
__author__ = "maxwell"

from flask_socketio import SocketIO, emit
from flask import Flask, render_template, url_for, copy_current_request_context
from random import randint
from threading import Thread, Event
from flask_cors import CORS


app = Flask(__name__)
app.config.from_envvar("WOODCHUCK_SETTINGS")

socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

thread = Thread()
thread_stop_event = Event()


def random_hit_generator():
    """
    Generate a random number every 5 seconds and broadcast to socketio instance
    """

    print("Making random coords")
    while not thread_stop_event.isSet():
        x = get_random_coordinate()
        y = get_random_coordinate()
        socketio.emit("coords", {"x": x, "y": y}, broadcast=True)
        random_delay()


def random_delay():
    socketio.sleep(randint(app.config.HIT_DELAY_RANGE_FROM, HIT_DELAY_RANGE_TO))


def get_random_coordinate():
    return randint(COORDINATE_RANGE_FROM, COORDINATE_RANGE_TO)


@socketio.on("connect")
def hit_connect():
    """
    Starts sending random coords after socketio connection
    """
    # need visibility of the global thread object
    global thread
    print("Client connected")

    # Start the random number generator thread only if the thread has not been started before.
    if not thread.is_alive():
        thread = socketio.start_background_task(target=random_hit_generator)
        print("Starting thread: %s", thread)


@socketio.on("disconnect")
def hit_disconnect():
    """
    Stops sending random hits
    """
    print("Client disconnected")
    thread_stop_event.set()


if __name__ == "__main__":
    socketio.run(app, debug=True)
