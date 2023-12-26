const {SerialPort} = require("serialport");

// const EscPosEncoder = require('esc-pos-encoder');
// let encoder = new EscPosEncoder();
// let result = encoder
//   .text('The is the first line')
//   .newline()
//   .text('And this is the second')
//   .newline()
//   .text('The is the first line')
//   .underline()
//   .cut('partial')
//   .encode()
// console.log(result)

const serialPort = new SerialPort({
  path: 'COM2',
  baudRate: 19200,
  stopBits: 1,
  parity: 'none',
  autoOpen: false,
  flowControl: false
});


serialPort.on("open", function() {
  console.log("-- Connection opened --");

  serialPort.write(new Uint8Array( [
      84, 104, 101,  32, 105, 115,  32, 116, 104, 101,  32, 102,
      105, 114, 115, 116,  32, 108, 105, 110, 101,  10,  13,  65,
      110, 100,  32, 116, 104, 105, 115,  32, 105, 115,  32, 116,
      104, 101,  32, 115, 101,  99, 111, 110, 100,  10,  13,  84,
      104, 101,  32, 105, 115,  32, 116, 104, 101,  32, 102, 105,
      114, 115, 116,  32, 108, 105, 110, 101,  27,  45,   1,  29,
      86,   1
    ]
  ), (err) => {
    console.log(err)
  })

  serialPort.close()
});