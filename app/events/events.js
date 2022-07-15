const event =  require("events");
const myEvent =  new event();

// listener
myEvent.on("registerEvent", (data) => {
    // email event
    console.log("On connect event: ", data)
})
 
module.exports = myEvent;
