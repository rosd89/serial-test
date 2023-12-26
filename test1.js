const { SerialPort } = require('serialport');
const iconv = require('iconv-lite');

const port = new SerialPort({
  path: 'COM16',
  baudRate: 19200,
  stopBits: 1,
  parity: 'none',
  autoOpen: false,
  flowControl: false
});

const printWithSerialPort = () => {

  const printContent = async () => {
    var command = new Uint8Array( [
      84, 104, 101,  32, 105, 115,  32, 116, 104, 101,  32, 102,
      105, 114, 115, 116,  32, 108, 105, 110, 101,  10,  13,  65,
      110, 100,  32, 116, 104, 105, 115,  32, 105, 115,  32, 116,
      104, 101,  32, 115, 101,  99, 111, 110, 100,  10,  13,  84,
      104, 101,  32, 105, 115,  32, 116, 104, 101,  32, 102, 105,
      114, 115, 116,  32, 108, 105, 110, 101,  27,  45,   1,  29,
      86,   1
    ])

    port.write(command, 'ascii', (err) => {
      if (err) {
        console.error('Error on write: ', err.message);
        closePort()
      } else {
        closePort()
      }
    })
  }

  const openPort = () => {
    if (!port.isOpen) {
      port.open((err) => {
        if (err) {
          return console.error('Error opening port:', err.message);
        }
        console.log('Serial Port Opened');
        printContent();
      });
    } else {
      console.log('Port is already open')
      printContent()
    }
  }

  const closePort = () => {
    if (port.isOpen) {
      port.close((err) => {
        if (err) {
          return console.error('Error closing port:', err.message);
        }
        console.log('Serial Port Closed');
        port.removeAllListeners('open');
        port.removeAllListeners('data');
      });
    } else {
      console.log('Port is already closed');
    }
  }
  openPort()
}

printWithSerialPort()