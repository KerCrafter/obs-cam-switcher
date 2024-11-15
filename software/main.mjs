import { SerialPort } from 'serialport'
import OBSWebSocket, {EventSubscription} from 'obs-websocket-js';

const obs = new OBSWebSocket();


obs.connect('ws://192.168.1.59:4455').then((a) => {


  var port = "/dev/ttyACM0";

  var serialPort = new SerialPort({
    path: port,
    baudRate: 9600
  });

  serialPort.on("open", function() {
    console.log("-- Connection opened --");
    serialPort.on("data", function(data) {
      if(data.includes("J'arrive devant le PC")) {
        console.log('on')
	obs.call('SetCurrentProgramScene', {sceneName: 's1'});
      }

      if(data.includes("Je quite le PC !")) {
        console.log('off')
	obs.call('SetCurrentProgramScene', {sceneName: 's2'});
      }
    });
  });
})
