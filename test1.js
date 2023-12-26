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
    var command = '';
    command += '\x1b@' // Reset Printer
    command += '\x1ba\x00' // 80mm paper size
    command += '\x1DL\x1D\x00' // 16mm left margin
    command += '\x1B\x02' // Initial Line Spacing
    command += '\x1b!FS' //COLLECTIVE SETTING OF KOREAN CHARACTER PRINTING_MODE
    command += '\x1b&FS' // SET KOREAN CHARACTER MODE EXTENDED GRAPHIC MODE

    command += iconv.encode('다른 사람들이 사용하기에 도움이 될 것입니다', 'euc-kr');

    command += "\n\n\n\n";
    command += '\x1bi'   // PAPER CUT FULL

    port.write(command, (err) => {
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