const {SerialPort} = require("serialport");
const EscPosEncoder = require('esc-pos-encoder');

const serialPort = new SerialPort({
  path: 'COM2',
  baudRate: 9600
});

let encoder = new EscPosEncoder();

serialPort.on("open", function() {
  console.log("-- Connection opened --");

  let result = encoder
    .text('The is the first line')
    .newline()
    .text('And this is the second')
    .newline()
    .text('The is the first line')
    .underline()
    .cut('partial')
    .encode()

  serialPort.write(result)

  serialPort.close()
});