// opening a websocket connection, we need to create new WebSocket using the special protocol ws in the url:
(() => {
    let socket = new WebSocket("ws://" + window.location.hostname + ":8000/");
    socket.onopen = function (e) {
      console.log("socket opened successfully");
    };

    // Whenever the server sends data, the onmessage event gets fired.
    socket.onmessage = function (event) {
      console.log("Message Received");
      console.log(event.data);
      createArc(JSON.parse(event.data)); 
    };
    
    // Close event marks the end of a communication between the server and the client. 
    // Closing a connection is possible with the help of onclose event.
    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`) + "<br>";
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died') + "<br>";
      }
    };
    // Error are generated for mistakes during connection, which take place during the communication. 
    // It is marked with the help of onerror event. Onerror is always followed by termination of connection.
    socket.onerror = function (error) {
      console.log(`[error] `, error, ` + "<br>"`);
    };
  })();
  