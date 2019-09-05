#!/usr/bin/python
from gpiozero import DistanceSensor
from time import sleep
import requests
import json

SERVER_ENDPOINT = "http://192.168.1.7:3000/sensor_data"

sensor_front = DistanceSensor(echo=18, trigger=17)
sensor_right = DistanceSensor(echo=26, trigger=19)
sensor_left = DistanceSensor(echo=13, trigger=6)
sensor_back = DistanceSensor(echo=21, trigger=20)

while True:
	sensor_data = {
			'front':round(sensor_front.distance * 100, 2),
			'back':round(sensor_back.distance * 100, 2),
			'left':round(sensor_left.distance * 100, 2),
			'right':round(sensor_right.distance * 100, 2),
	}
	requests.post(SERVER_ENDPOINT, headers = {u'content-type': u'application/json'}, data = json.dumps(sensor_data))
	sleep(0.3)