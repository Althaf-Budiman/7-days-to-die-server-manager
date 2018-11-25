class sdtdChat {
  constructor(serverId) {
    this.serverId = serverId;
    this.start();
  }


  start() {

    io.socket.on('chatMessage', (chatMessage) => {
      if (chatMessage.server.id === this.serverId) {
        addNewChatMessage(chatMessage);
      }
    });
    io.socket.on('playerConnected', (connectedMessage) => {
      if (connectedMessage.server.id === this.serverId) {
        addPlayerConnectedMessage(connectedMessage);
      }

    })
    io.socket.on('playerDisconnected', (disconnectedMessage) => {
      if (disconnectedMessage.server.id === this.serverId) {
        addPlayerDisconnectedMessage(disconnectedMessage);
      }
    })
    addSavedMessagesToChatWindow(this.serverId);
  }

  stop() {
    io.socket.removeListener('chatMessage', this.addNewChatMessage);
  }

  sendMessage(message, username) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/sdtdserver/sendMessage`,
        data: {
          serverId: this.serverId,
          message: `${username}: ${message}`
        },
        success: (data, status, xhr) => {
          resolve(data);
        },
        error: (xhr, status, error) => {
          showErrorModal(`${error} - ${xhr.responseText}`);
          resolve(error);
        }
      });
    });
  }
}

function addPlayerConnectedMessage(connectedMessage) {
  connectedMessage.playerName = _.escape(connectedMessage.playerName)
  $('.chat-window').append(`<li class=\"chat-message\">${connectedMessage.playerName} connected </li>`);
  $('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);
  addMessageToStorage(`${connectedMessage.playerName} connected`, this.serverId)
}

function addPlayerDisconnectedMessage(disconnectedMessage) {
  disconnectedMessage.playerName = _.escape(disconnectedMessage.playerName)
  $('.chat-window').append(`<li class=\"chat-message\">${disconnectedMessage.playerName} left </li>`);
  $('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);
  addMessageToStorage(`${disconnectedMessage.playerName} left`, this.serverId)
}

function addNewChatMessage(chatMessage) {
  chatMessage.messageText = _.escape(chatMessage.messageText);
  chatMessage.playerName = _.escape(chatMessage.playerName);

  if (chatMessage.playerName == 'Server') {
    $('.chat-window').append(`<li class=\"chat-message\">[${chatMessage.time}] ${chatMessage.messageText} </li>`);
    addMessageToStorage(`[${chatMessage.time}] ${chatMessage.messageText}`, this.serverId)

  } else {
    $('.chat-window').append(`<li class=\"chat-message\">[${chatMessage.time}] ${chatMessage.playerName}: ${chatMessage.messageText} </li>`);
    addMessageToStorage(`[${chatMessage.time}] ${chatMessage.playerName}: ${chatMessage.messageText}`, this.serverId)
  }
  $('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);

}

function addMessageToStorage(newMessage, serverId) {
  let storage = window.localStorage
  let savedMessages = JSON.parse(storage.getItem(`chatMessages-${serverId}`));

  if (!savedMessages) {
    savedMessages = new Array('Starting chat');
  }

  if (savedMessages.length > 50) {
    savedMessages.shift();
  }

  savedMessages.push(newMessage);
  storage.setItem(`chatMessages-${serverId}`, JSON.stringify(savedMessages));
}

function addSavedMessagesToChatWindow(serverId) {
  let savedMessages = JSON.parse(window.localStorage.getItem(`chatMessages-${serverId}`));
  if (savedMessages) {
    savedMessages.forEach(msg => {
      msg = _.escape(msg)
      $('.chat-window').append(`<li class=\"chat-message\">${msg} </li>`);
    })
  }
  $('.chat-window').scrollTop($('.chat-window')[0].scrollHeight);
}