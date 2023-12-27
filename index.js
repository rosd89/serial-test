const {SerialPort} = require("serialport");
const {encode: _encode} = require('iconv-lite');
const _ = require('underscore')

const korea = 'EUC-KR'
const KR = 0x0d;
const LF = 0x0a;
const ESC = 0x1b;
const GS = 0x1d;

const initialize = () => {
  return [ESC, 0x40];
}
const cut = (m, n) => {
  const cmd = [GS, 0x56, m];
  if (n != null) cmd.push(n);
  return cmd;
};

const textUnderline = (n) => {
  return [ESC, 0x2d, n];
}

const newLine = (n = 1) => {
  const cmd = [];
  for (let i = 0; i < n; i++) cmd.push(LF);
  return cmd;
}


const encode = (text) => {
  return Array.from(_encode(text, korea));
}

const port = new SerialPort({
  path: 'COM2',
  baudRate: 9600,
  stopBits: 1,
  parity: 'none',
  autoOpen: false,
  flowControl: false
});

const printWithSerialPort = () => {

  const printContent = () => {
    let command = [
      initialize(),

      textUnderline(),

      encode('안녕하세요.'),

      textUnderline(),

      encode('안녕하세요.'),

      textUnderline(),

      encode('안녕하세요.'),

      textUnderline(),

      encode('안녕하세요.'),

      textUnderline(),

      encode('안녕하세요.'),

      textUnderline(),

      encode('안녕하세요.'),

      textUnderline(),

      newLine(8),

      cut()
    ]

    port.write(new Uint8Array(_.flatten(command)), (err) => {
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
