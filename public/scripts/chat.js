const socket = io()
let nickname = ""
let message=""

Swal.fire({
    title: 'write your Nickname',
    input: 'text',
    allowOutsideClick: false,
    inputValidator: value => !value && "PLEASE! write your nickname"


}).then(data => {
    nickname = data.value
    console.log(nickname)
    document.querySelector("#nickname").innerHTML = nickname;
    socket.emit('nickname', nickname)
})
socket.on("all messages", messages => {
    document.querySelector("#allMessages").innerHTML = messages.map(each => `<p>${each}</p>`).join("")
})
document.querySelector("#message").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        message = `<p> ${nickname} : ${e.target.value}  </p>`
        e.target.value=""
        socket.emit("message", message)
    }
    
})