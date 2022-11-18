// Create HTML for Inbox
const createInboxElement = function (message) {
  const $inbox = $(`
    <div class="message">
       <div class="contact-container">
       <div class="name-and-date">
         <div class="user-name"> ${message.first_name} ${message.last_name} </div>
         <date class="date"> ${timeago.format(message.created_at)} </date>
         </div>
         <article>${message.message}</article>
       </div>
     <form class="reply" action="/compose-message/${message.creator_id}" method="GET">
       <button type="submit" id="reply-button">Reply</button>
     </form>
    </div>
    `);
  return $inbox;
}

// Render the messages
const renderMessages = function (messages) {
  for (const message of messages) {
    $('.inbox-container').append(createInboxElement(message));
  }
};

$(() => {
  function loadMessages() {

    $.get('/api/messages').then((result) => {
      renderMessages(result.messages);
    });
  }

  loadMessages();
});


