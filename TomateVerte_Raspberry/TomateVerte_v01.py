
from flask import Flask #, request
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)
GPIO.setup(23,GPIO.OUT)

app = Flask(__name__)

@app.route('/')
def index():
        return "Hello!"

@app.route('/allumerLedRouge')
def allumerLedRouge():
        print "Red LED on"
        GPIO.output(18,GPIO.HIGH)
        return "LED Rouge Allumee"

@app.route('/eteindreLedRouge')
def eteindreLedRouge():
        print "Red LED off"
        GPIO.output(18,GPIO.LOW)
        return "LED Rouge Eteinte"

@app.route('/allumerLedVerte/')
def allumerLedVerte():
        print "Green LED on"
        GPIO.output(23,GPIO.HIGH)
        return "LED Verte Allumee"

@app.route('/eteindreLedVerte/')
def eteindreLedVerte():
        print "Green LED off"
        GPIO.output(23,GPIO.LOW)
        return "LED Verte Eteinte"		

if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0')


