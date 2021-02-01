/** 
 * @file pxt-hiibot-rungo/rungo.ts
 * @brief HiiBot RunGo makecode library.
 * @n This is a MakeCode graphical STEAM education robot.
 * 
 * @copyright    HiiBot,2020
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](11417000@qq.com)
 * @date  2020-12-28
*/

// Servo
let __servo1Pin = AnalogPin.P0
let __servo2Pin = AnalogPin.P5
let __servo3Pin = AnalogPin.P11
// rgbled pin
let neopixelPin = DigitalPin.P1
// color sensor
let __colorSensorPin = AnalogPin.P2
// lighting sensor
let __leftLightingPin = AnalogPin.P3
let __rightLightingPin = AnalogPin.P4
// HeadLED
let __rightHeadLedPin = DigitalPin.P6
let __leftHeadLedPin = DigitalPin.P7
// ultrasonic pin
let __trig = DigitalPin.P8
let __echo = DigitalPin.P12
let distanceBuf = 0
// patrol pin
let __rightPatrol = DigitalPin.P9
let __leftPatrol = DigitalPin.P10
// motor pin 
let __leftMotor1IN = AnalogPin.P14
let __leftMotor2IN = AnalogPin.P16
let __rightMotor1IN = AnalogPin.P15
let __rightMotor2IN = AnalogPin.P13

enum PingUnit {
    //% block="cm"
    Centimeters,
}

//% color="#7BD239" weight=10 icon="\uf48b"
namespace rungo {

    export enum Servos {
        //% blockId="S1" block="S1"
        S1 = 0,
        //% blockId="S2" block="S2"
        S2 = 1,
        //% blockId="S3" block="S3"
        S3 = 2
    }

    export enum Motors {
        //% blockId="leftMotor" block="left"
        ML = 0,
        //% blockId="rightMotor" block="right"
        MR = 1,
        //% blockId="allMotors" block="all"
        MAll = 2
    }

    export enum Dir {
        //% blockId="CW" block="Forward"
        CW = 0,
        //% blockId="CCW" block="Backward"
        CCW = 1
    }

    export enum Patrol {
        //% blockId="leftPatrol" block="left"
        leftPatrol = 0,
        //% blockId="rightPatrol" block="right"
        rightPatrol = 1
    }

    export enum HeadLED {
        //% blockId="leftHeadLED" block="left"
        leftHeadLED = 0,
        //% blockId="rightHeadLED" block="right"
        rightHeadLED = 1,
        //% blockId="allHeadLED" block="all"
        allHeadLED = 2
    }

    export enum HeadLEDswitch {
        //% blockId="turnOn" block="ON"
        turnOn = 1,
        //% blockId="turnOff" block="OFF"
        turnOff = 0
    }

    /**
     * Different modes for RGB or RGB+W NeoPixel strips
     */
    export enum PixelsMode {
        //% block="GRB"
        RGB = 1,
        //% block="RGB"
        RGB_RGB = 3,
        //% block="RGB+W"
        RGBW = 2
    }

    export enum Pixels {
        //% blockId="frontPixel" block="front"
        frontPixel = 0,
        //% blockId="leftPixel" block="left"
        leftPixel = 1,
        //% blockId="rightPixel" block="right"
        righttPixel = 2,
        //% blockId="allPixel" block="all"
        allPixel = 3
    }
    /**
     * Pre-Defined RGB LED colours
     */
    export enum PixelsColors {
        //% block=red
        Red = 0xff0000,
        //% block=orange
        Orange = 0xffa500,
        //% block=yellow
        Yellow = 0xffff00,
        //% block=green
        Green = 0x00ff00,
        //% block=blue
        Blue = 0x0000ff,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xff00ff,
        //% block=white
        White = 0xffffff,
        //% block=black
        Black = 0x000000
    }

    /**
     * Turn on/off the Head LEDs on the RunGo.
     */
    //% weight=120
    //% blockId=writeLED block="HeadLED |%ledn turn |%ledswitch"
    //% ledn.fieldEditor="gridpicker" ledn.fieldOptions.columns=2 
    //% ledswitch.fieldEditor="gridpicker" ledswitch.fieldOptions.columns=2
    export function writeLED(ledn: HeadLED, ledswitch: HeadLEDswitch): void {
        if (ledn == HeadLED.leftHeadLED) {
            pins.digitalWritePin(__leftHeadLedPin, ledswitch);
        } else if (ledn == HeadLED.rightHeadLED) {
            pins.digitalWritePin(__rightHeadLedPin, ledswitch);
        } else if (ledn == HeadLED.allHeadLED){
            pins.digitalWritePin(__leftHeadLedPin, ledswitch);
            pins.digitalWritePin(__rightHeadLedPin, ledswitch);
        } else {
            return
        }
    }

    function clamp(value: number, min: number, max: number): number {
        return Math.max(Math.min(max, value), min);
    }

    /**
     * Set the direction and speed of RunGo motor.
     * @param index motor left/right/all
     * @param direction direction to turn
     * @param speed speed of motors (0 to 255). eg: 50
     */
    //% weight=90
    //% blockId=motor_MotorRun block="motor|%index|move|%direction|at speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=3
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function motorRun(index: Motors, direction: Dir, speed: number): void {
        if (index > 2 || index < 0)
            return

        speed = clamp(speed, 0, 255) * 4.01;  // 0~255 > 0~1023

        if (index == 0) {
            if (direction == 0) {
                pins.analogWritePin(__leftMotor1IN, speed);
                pins.analogWritePin(__leftMotor2IN, 0);
            } else {
                pins.analogWritePin(__leftMotor2IN, speed);
                pins.analogWritePin(__leftMotor1IN, 0);
            }
        } else if (index == 1) {
            if (direction == 0) {
                pins.analogWritePin(__rightMotor1IN, 0);
                pins.analogWritePin(__rightMotor2IN, speed);
            } else {
                pins.analogWritePin(__rightMotor2IN, 0);
                pins.analogWritePin(__rightMotor1IN, speed);
            }
        } else if (index == 2) {
            if (direction == 0) {
                pins.analogWritePin(__leftMotor1IN, speed);
                pins.analogWritePin(__leftMotor2IN, 0);
                pins.analogWritePin(__rightMotor1IN, 0);
                pins.analogWritePin(__rightMotor2IN, speed);
            } else {
                pins.analogWritePin(__leftMotor2IN, speed);
                pins.analogWritePin(__leftMotor1IN, 0);
                pins.analogWritePin(__rightMotor2IN, 0);
                pins.analogWritePin(__rightMotor1IN, speed);
            }
        }
    }

    /**
     * Stop the RunGo motor.
     */
    //% weight=89
    //% blockId=motor_motorStop block="motor |%motor stop"
    //% motor.fieldEditor="gridpicker" motor.fieldOptions.columns=3 
    export function motorStop(motor: Motors): void {
        motorRun(motor, 0, 0);
    }

    /**
     * Read line tracking sensor.
     */

    //% weight=20
    //% blockId=read_Patrol block="read |%patrol line tracking sensor"
    //% patrol.fieldEditor="gridpicker" patrol.fieldOptions.columns=2 
    export function readPatrol(patrol: Patrol): number {
        if (patrol == Patrol.leftPatrol) {
            return pins.digitalReadPin(__leftPatrol)
        } else if (patrol == Patrol.rightPatrol) {
            return pins.digitalReadPin(__rightPatrol)
        } else {
            return -1
        }
    }

    /**
     * Read RunGo ultrasonic sensor.
     */
    //% blockId=ultrasonic_sensor block="read ultrasonic sensor |%unit "
    //% weight=80
    export function Ultrasonic(unit: PingUnit, maxCmDistance = 400): number {
        let d
        pins.digitalWritePin(__trig, 1);
        basic.pause(1)
        pins.digitalWritePin(__trig, 0);
        if (pins.digitalReadPin(__echo) == 0) {
            pins.digitalWritePin(__trig, 0);
            //sleep_us(2);
            pins.digitalWritePin(__trig, 1);
            //sleep_us(10);
            pins.digitalWritePin(__trig, 0);
            d = pins.pulseIn(__echo, PulseValue.High, maxCmDistance * 58);//readPulseIn(1);
        } else {
            pins.digitalWritePin(__trig, 0);
            pins.digitalWritePin(__trig, 1);
            d = pins.pulseIn(__echo, PulseValue.Low, maxCmDistance * 58);//readPulseIn(0);
        }
        let x = d / 39;
        if (x <= 0 || x > 400) {
            return 0;
        }
        switch (unit) {
            case PingUnit.Centimeters: return Math.round(x);
            default: return Math.idiv(d, 2.54);
        }
    }
}
