const {SerialPort} = require("serialport");

console.log(SerialPort)
const serialPort = new SerialPort({
  path: 'COM2',
  baudRate: 9600
});

serialPort.on("open", function() {
  console.log("-- Connection opened --");

  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')
  serialPort.write('123213123123123123\n')

  serialPort.close()
});