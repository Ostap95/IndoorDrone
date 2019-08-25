#!/usr/bin/python
from gpiozero import DistanceSensor
from time import sleep
import requests
import json

SERVER_ENDPOINT = "http://192.168.1.7:3000/sensor_data"

sensor_front = DistanceSensor(echo=5, trigger=4)
sensor_right = DistanceSensor(echo=6, trigger=17)
sensor_top = DistanceSensor(echo=13, trigger=27)
sensor_left = DistanceSensor(echo=19, trigger=22)
sensor_back = DistanceSensor(echo=26, trigger=23)

while True:
    # print("Front distance: ", sensor_front.distance)
    # print("Back distance: ", sensor_back.distance)
    # print("Left distance: ", sensor_left.distance)
    # print("Right distance: ", sensor_right.distance)
    # print("Top distance: ", sensor_top.distance)

    sensor_data = {
        'front':sensor_front.distance,
        'back':sensor_back.distance,
        'left':sensor_left.distance,
        'right':sensor_right.distance,
        'top':sensor_top.distance
    }
    requests.post(SERVER_ENDPOINT, headers = {u'content-type': u'application/json'}, data = json.dumps(sensor_data))