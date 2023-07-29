const url = "wss://echo-ws-service.herokuapp.com";
const field = document.querySelector(".echochat")
const textbox = document.querySelector(".textbox");
const text = document.querySelector(".text");
const btnSend = document.querySelector(".sendmessage");
const btnLoc = document.querySelector(".location");

let websocket = new WebSocket(url);

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  textbox.appendChild(pre);
};
websocket.onopen = function(evt) {
  writeToScreen("CONNECTED");
};

websocket.onmessage = function(evt) {
    writeToScreen(`<span style = "margin-right: 0px; padding-left: 50%;">Сервер: ${evt.data}</span>`);
};

btnSend.addEventListener("click", () => {
    message = text.value;
    writeToScreen(`Вы: ${message}`);
    websocket.send(message);
    text.value = '';
  if(message === "stop") {
    websocket.close();
    writeToScreen("DISCONNECTED")
    }
});
//geo-location

btnLoc.addEventListener('click', () => {    
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            const geoLink = `https://www.openstreetmap.org/#map=14/${coords.latitude}/${coords.longitude}`;
            const geoLinkMessage = `<a href="${geoLink}">Гео-локация</a>`;
            websocket.send(geoLinkMessage, 'client'); 
        })
    }
});