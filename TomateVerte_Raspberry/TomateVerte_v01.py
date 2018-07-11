from flask import Flask, render_template
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)
GPIO.setup(23,GPIO.OUT)
GPIO.setup(24,GPIO.OUT)

app = Flask(__name__)

@app.route('/')
def index():
        return render_template('/index.html')

@app.route('/allumerLedRouge/')
def allumerLedRouge():
        print "Red LED on"
        GPIO.output(18,GPIO.HIGH)
        return "Rouge allumee"

@app.route('/eteindreLedRouge/')
def eteindreLedRouge():
        print "Red LED off"
        GPIO.output(18,GPIO.LOW)
        return "Rouge eteinte"

@app.route('/allumerLedOrange/')
def allumerLedOrange():
        print "Orange LED on"
        GPIO.output(23,GPIO.HIGH)
        return "Orange allumee"

@app.route('/eteindreLedOrange/')
def eteindreLedOrange():
        print "Orange LED of"
        GPIO.output(23,GPIO.LOW)
        return "Orange Eteinte"

@app.route('/allumerLedVerte/')
def allumerLedVerte():
        print "Green LED on"
        GPIO.output(24,GPIO.HIGH)
        return "Verte allumee"

@app.route('/eteindreLedVerte/')
def eteindreLedVerte():
        print "Green LED off"
        GPIO.output(24,GPIO.LOW)
        return "Verte eteinte"

if __name__ == '__main__':
        app.run(debug=True, host='0.0.0.0')
