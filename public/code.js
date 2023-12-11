// const { render } = require("express/lib/response");

(function () {

    const app = document.querySelector(".app");
    const socket = io();

    let uname;

    app.querySelector(".join-screen #join-user").addEventListener("click", function () {
        let username = app.querySelector(".join-screen #username").value;
        if (username.length == 0) {
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click", function () {
        let message = app.querySelector(".chat-screen #message-input").value;
        if (message.length == 0) {
            return;
        }
        renderMessage("my", {
            type : "text",
            username: uname,
            text: message
        });
        socket.emit("chat", {
            type : "text",
            username: uname,
            text: message
        });
        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #send-image").addEventListener("click", () => {
        renderImage("my", {
            type : "image",
            username : uname,
            image : 'Furina.png'
        });
        socket.emit("chat", {
            type : "image",
            username: uname,
            image: 'Furina.png'
        });

        app.querySelector(".chat-screen #message-input").value = "";
    })

    app.querySelector(".chat-screen #send-image2").addEventListener("click", () => {
        renderImage("my", {
            type : "image",
            username : uname,
            image : 'Furina.png'
        });
        socket.emit("chat", {
            type : "image",
            username: uname,
            image: 'Furina.png'
        });

        app.querySelector(".chat-screen #message-input").value = "";
    })

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function () {
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    })

    socket.on("update", function (update) {
        renderMessage("update", update);
    });
    socket.on("chat", function (message) {
        if (message.type === "text") {
            renderMessage("other", message);
        } else if (message.type === "image") {
            renderImage("other", message);
        }
    });

    function renderImage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");

        console.log("Image path:", message.image);

        if(type == "my") {
            let el = document.createElement("div");
                el.setAttribute("class", "image my-image");
                el.innerHTML = `
                        <div class="name">You</div>
                        <img class="image my-image" src="/${message.image}" alt="Image">
                `;
                messageContainer.appendChild(el);
        } else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "image other-image");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <img class="image" src="/${message.image}" alt="Image">
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }
    }

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");

        console.log(type);
        if (type == "my") {
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageContainer.appendChild(el);
        } else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        //scroll chat
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

})();