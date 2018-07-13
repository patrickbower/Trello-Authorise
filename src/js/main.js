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

/*
 * Steps to auth user and allow interactions
 * 
 * 1.  Wait for scripts to load
 * 2.  Run window.Trello.authorize function
 * 3a. If authenticationFailure - handle error and show to user
 * 3b. If authenticationSuccess - continue...
 * 4.  Store token and key
 * 5.  Get array of boards
 * 6.  Find board with name of 'Forty40' and store board id
 * 7.  Test for access to board using board id, token and key
 * 8a. If boardFailure - handle error and show to user
 * 8b. If boardSuccess - display content to user
 * 
 */

function run() {  
  var authenticationSuccess = function() {
    console.log('Successful authentication');

    // get private token
    var token = window.localStorage.trello_token;

    // get private public key (should be global for both 
    // Trello's client.js inital call and ongoing calls).
    
    // var list = `5b45ea4aecc023a9fbb7ee01`;
    var key = `bb6807f13b020310a0543a81ebf10765`;
    var vaidation = `?key=${key}&token=${token}`;
    // var board_id = `5b45ea4aecc023a9fbb7ee01`;
    
    var url = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
    // var boardsURL = `https://api.trello.com/1/boards/${board_id}` + `${vaidation}`;
    
    $.ajax({
      url: url
    }).done(function(data) {
      var board = data.find(board => board.name = 'Forty40');
      var board_id = board.id;
      console.log(board_id);
      // reuse the ajax function to call the board data

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
