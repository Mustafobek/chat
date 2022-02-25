const socket = io()

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});


const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


console.log(username, room)

// joining to the room
socket.emit('join-room', {username, room})

// OUTPUT MESSAGE
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


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

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}


// socket.emit()

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
    }
});
