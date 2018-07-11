/*
 * npm managed scripts
 */

 /*
 * Custom scripts
 */

// import one from './hello-world';
// one();

/* jQuery */
import $ from "jquery";

$('document').ready(function(){
  run();
})

function run() {  
  var authenticationSuccess = function() {
    console.log('Successful authentication');

    // get private token
    var token = window.localStorage.trello_token;

    // get private public key (should be global for both 
    // Trello's client.js inital call and ongoing calls).
    
    var list = `5b45ea4aecc023a9fbb7ee01`;
    var key = `bb6807f13b020310a0543a81ebf10765`;
    var vaidation = `?key=${key}&token=${token}`;
    
    
    var board_id = `5b45ea4aecc023a9fbb7ee01`;
    
    // var url = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
    var boardsURL = `https://api.trello.com/1/boards/${board_id}` + `${vaidation}`;
    
    $.ajax({
      url: boardsURL
    }).done(function(data) {
      console.log(data);
    }).fail(function(err) {
      error('Trello board', err.responseText);
    });
  };
  
  var authenticationFailure = function() {
    error('Trello user');
  };

  var error = function(errorType, errorMsg) {
    console.error(errorType, errorMsg || 'Failed authentication');
  }
  
  window.Trello.authorize({
    type: 'popup',
    name: 'Trello Authorize Sandbox',
    scope: {
      read: 'true',
      write: 'true' },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
  });
}


/*
 * Steps to auth user and allow interactions
 * 
 * 1.  Wait for scripts to load
 * 2.  Run window.Trello.authorize function
 * 3a. If authenticationFailure - handle error and show to user
 * 3b. If authenticationSuccess - continue...
 * 4.  Store token and key
 * 5.  Test for access to board using board id, token and key
 * 6a. If boardFailure - handle error and show to user
 * 6b. If boardSuccess - display content to user
 * 
 * /