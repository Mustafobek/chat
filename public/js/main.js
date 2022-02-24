const socket = io()

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

console.log(username, room)

// joining to the room
socket.emit('join-room', {username, room})

// sending messages
document.getElementById('chat-form').addEventListener('submit', ev => {
    ev.preventDefault()

    const messageInput = document.getElementById('msg')
    const message = messageInput.value.trim()

    if(!message) {
        return false
    }

    socket.emit('chat-message', message)

    // clean input and focus
    messageInput.value = ''
    messageInput.focus()
})

socket.emit()