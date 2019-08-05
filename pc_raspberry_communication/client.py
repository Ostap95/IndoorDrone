#!/usr/bin/python
from gpiozero import DistanceSensor
from time import sleep
import requests
import json

SERVER_ENDPOINT = "http://192.168.1.6:3000/sensor_data"

sensor_front = DistanceSensor(echo=18, trigger=17, max_distance=2)

while True:
	sensor_data = {
		'front':round(sensor_front.distance * 100, 2),
	}
	requests.post(SERVER_ENDPOINT, headers = {u'content-type': u'application/json'}, data = json.dumps(sensor_data))
	sleep(1)