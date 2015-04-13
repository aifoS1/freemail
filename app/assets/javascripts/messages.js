var currentUser;
var currentBox = 'inbox';

var $formTemplate = $('#compose').clone().hide();

function getInbox () {
 $.ajax({
   url: '/users/' + currentUser.id + '/messages',
   dataType: 'json',
   success: renderReceivedMessages
 });
};

function getOutbox () {
 $.ajax({
   url: '/users/' + currentUser.id + '/messages/sent', // this is not accurate
   dataType: 'json',
   success: renderSentMessages
 });
};

function setCurrentUser (callbackFunction) {
 $.ajax({
   url: '/users/current',
   dataType: 'json',
   success: function (data) {
     currentUser = data;

     if (callbackFunction) {
       callbackFunction();
     };
   }
 });
};

function createMessage (message) {
 $.ajax({
   url: '/users/' + currentUser.id + '/messages',
   method: 'post',
   data: message,
   success: clearAndFadeForm
 });
}

function renderReceivedMessages (messages) {
 var $messages = $('.messages ul');

 $(messages).each(function (index, message) {
   $messages.append( renderReceivedMessage(message) );
 });
};

function renderReceivedMessage (message) {
 // tack on sender name

 var $li = $('<li class="message">').data('id', message.id);
 // var $h4 = $('<h4>').text(message.subject);
 var $h4 = $('<h4>').html(message.subject + '<small>' + "  from: "+ message.sender.username +  '</small>');
 var $p = $('<p>').text(message.content);

 return $li.append($h4).append($p);
};

function renderSentMessages (messages) {
 var $messages = $('.messages ul');

 $(messages).each(function (index, message) {
   $messages.append( renderSentMessage(message) );
 });
};

function renderSentMessage (message) {
 // tack on sender name

 var $li = $('<li class="message">').data('id', message.id);
 // var $h4 = $('<h4>').text(message.subject);
 var $h4 = $('<h4>').html(message.subject + '<small>' + "  to: "+ message.recipient.username +  '</small>');
 var $p = $('<p>').text(message.content);

 return $li.append($h4).append($p);
};

function setHandlers () {
 setMessageHandlers();
 setComposeHandlers();
 setNavHandlers();
};

function setComposeHandlers () {
 $('body').on('click', '.close-window', clearAndFadeForm);

 $('body').on('click', '#send-message', submitMessage);
};

function submitMessage () {
 var $form = $('#compose');
 var formElements = $form[0].elements;

 var formData = {
   message: {
     recipient_id: formElements.recipient_id.value,
     subject: formElements.subject.value,
     content: formElements.content.value,
     important: formElements.important.checked
     }
 };

 createMessage( formData );
}

function setNavHandlers () {
 $('.inbox nav').on('click', 'li', function (event) {
   var method = $(this).data('method');

   if (method == "compose") {
     $("#compose").fadeIn('fast');
   }
   else if (method == "get-received") {
     emptyBox();
     getInbox();
     $('.currentbox').text('Inbox');
     currentBox = 'inbox'
   }
   else if (method == "get-sent") {
     emptyBox();
     getOutbox();
     $('.currentbox').text('Outbox');
     currentBox = 'outbox'
     // .removeClass('outbox')
     // .addClass('outbox')
   };
 });
};

function setMessageHandlers () {
 var $messages = $('.messages ul');

 $messages.on('click', 'h4', function (event) {
   $(this).siblings().slideDown(400, function () {
     $(this).addClass('open');
   });

   $('.open').slideUp(400, function () {
     $(this).removeClass('open');
   });
 });
}

function hideElements () {
 $('#compose').hide();
};

function emptyBox () {
 $('.messages').children().html('')
}

function clearAndFadeForm () {
 var $form = $('#compose');
 $form.fadeOut('fast', function () {
   $('#compose').remove();
   $('main').after( $formTemplate.clone() );
 });
};


function refreshInbox () {
  if (currentBox == 'inbox') {
    emptyBox();
    getInbox();
  } else {
    emptyBox();
    getOutbox();
  }

}


function initialize () {
 hideElements();
 setHandlers();
 setCurrentUser( getInbox );
 setCurrentUser( getOutbox );

  setInterval( refreshInbox, 500 );
};

initialize();