rungo.motorRun(rungo.Motors.MAll, rungo.Dir.CW, 50)
basic.pause(1000)
rungo.motorRun(rungo.Motors.MAll, rungo.Dir.CCW, 50)
basic.pause(1000)
rungo.motorStop(rungo.Motors.MAll)

rungo.Ultrasonic(0)