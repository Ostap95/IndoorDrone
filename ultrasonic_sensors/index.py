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
        'front':round(sensor_front.distance * 100, 2),
        'back':round(sensor_back.distance * 100, 2),
        'left':round(sensor_left.distance * 100, 2),
        'right':round(sensor_right.distance * 100, 2),
        'top':round(sensor_top.distance * 100, 2)
    }
    requests.post(SERVER_ENDPOINT, headers = {u'content-type': u'application/json'}, data = json.dumps(sensor_data))