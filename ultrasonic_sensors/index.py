#!/usr/bin/python
import RPi.GPIO as GPIO
from gpiozero import DistanceSensor
from time import sleep

sensor_front = DistanceSensor(echo=7, trigger=11)
sensor_back = DistanceSensor(echo=13, trigger=15)
sensor_left = DistanceSensor(echo=16, trigger=18)
sensor_right = DistanceSensor(echo=29, trigger=31)
sensor_top = DistanceSensor(echo=33, trigger=35)

while True:
    print("Front distance: ", sensor_front.distance * 100)
    print("Back distance: ", sensor_back.distance * 100)
    print("Left distance: ", sensor_left.distance * 100)
    print("Right distance: ", sensor_right.distance * 100)
    print("Top distance: ", sensor_top.distance * 100)
    sleep(1)


