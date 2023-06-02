var path = require('path');
var express = require('express');
const bodyParser = require("body-parser");
const geoip = require("geoip-lite");

//Code for websockets

const WebSocket = require("ws");
const { Server } = require('http');
const PORRT = 8000;
const wsServer = new WebSocket.Server({
  port: PORRT
});



// sending the information the connected clients
function sendInfoToClients(info) {
  wsServer.clients.forEach(function (client) {
    client.send(JSON.stringify(info));
  });
}

// onconnection of a new client
wsServer.on('connection', function (socket) {
  console.log("A client just connected");
});

// Express Server
const app = express();
app.use(bodyParser.json());


// GET method route
app.get("/new_request", async (req, res) => {
  var ipAddr = req.query.ip;
  try {
    var geo = geoip.lookup(ipAddr);
    if (geo) {
      const { ll } = geo;
      const country = geo.country;
      const lat = geo.latitude; // store latitude value from the response into lat variable
      const lon = geo.longitude; // store longitude value from the response into lon variable
      console.log(ll, country);
      console.log("Sending result");
      // createArc(lat, lon);
      sendInfoToClients({ lat: ll[0], long: ll[1], country });
      res.send({ lat: ll[0], long: ll[1], country });
    } else {
      throw new Error("No location data found for the given IP address.");
    }
  } catch (e) {
    console.log("Sending error");
    console.error(e);
    res.status(500).send(e.message);
  }
});


app.get('/', (req, res, next) => {
	res.sendFile('index.html', {
	  root: path.join(__dirname, '../client/')
	});
});

app.use(express.static(path.join(__dirname, '../client/')))
  const PORT = process.env.PORT || 3000
  
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
	console.log('Press Ctrl+C to quit.')
});


