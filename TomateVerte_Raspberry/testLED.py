
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)
GPIO.setup(23,GPIO.OUT)
print "Red LED on"
GPIO.output(18,GPIO.HIGH)
time.sleep(1)
print "Green LED on"
GPIO.output(23,GPIO.HIGH)
time.sleep(1)
print "Green LED off"
GPIO.output(23,GPIO.LOW)
time.sleep(1)
print "Red LED on"
GPIO.output(18,GPIO.LOW)
