radio.onReceivedValueDeprecated(function (name, value) {
    if (name == "Roll") {
        RawRoll = value
        MappedRoll = Math.map(RawRoll, -90, 90, 0, 180)
        RollLeft = MappedRoll
        RollRight = MappedRoll
    }
    if (name == "Pitch") {
        RawPitch = value
        MappedPitch = Math.map(RawPitch, -90, 90, 0, 180)
        PitchLeft = MappedPitch
        PitchRight = 180 - MappedPitch
    }
    LeftOutput = Math.idiv(PitchLeft + RollLeft, 2)
    RightOutput = Math.idiv(PitchRight + RollRight, 2)
    if (RawPitch == 0 && RawRoll == 0) {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    } else {
        pins.servoWritePin(AnalogPin.P1, LeftOutput)
        pins.servoWritePin(AnalogPin.P2, RightOutput)
    }
    if (name == "cut") {
        pins.servoWritePin(AnalogPin.P0, 180)
    }
})
input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P1, 180)
    pins.servoWritePin(AnalogPin.P2, 0)
})
input.onButtonPressed(Button.AB, function () {
    pins.servoWritePin(AnalogPin.P1, 90)
    pins.servoWritePin(AnalogPin.P2, 90)
})
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P1, 0)
    pins.servoWritePin(AnalogPin.P2, 180)
})
let RightOutput = 0
let LeftOutput = 0
let PitchRight = 0
let PitchLeft = 0
let MappedPitch = 0
let RawPitch = 0
let RollRight = 0
let RollLeft = 0
let MappedRoll = 0
let RawRoll = 0
basic.pause(200)
let Pixel_Array = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
Pixel_Array.setBrigthness(55)
Pixel_Array.showRainbow(1, 360)
basic.pause(200)
radio.setGroup(4)
for (let index = 0; index < 2; index++) {
    basic.showIcon(IconNames.Happy)
    basic.pause(100)
    basic.showIcon(IconNames.SmallDiamond)
    basic.pause(100)
    basic.showIcon(IconNames.Happy)
}
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    Pixel_Array.show()
    Pixel_Array.rotate(1)
    basic.pause(500)
})
