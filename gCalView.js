     var CLIENT_ID = '935855233873-lj1dg1jvkis1npb7bpmlv8b8ksauqg03.apps.googleusercontent.com';
      var CALENDAR_ID = 'k2rb1nfsbkmli8uvqqh6ru465c@group.calendar.google.com';
      var SCOPES = ["https://www.googleapis.com/auth/calendar"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Init auth flow in response to user clicking authorize button.
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List events once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', loadEvents);
      }


	  /*
	  * Gets all the google calemdar events in the specified time range and loads them into the local calendar
	  */
      function loadEvents() {
		var request = getAllEvents();
		
		console.log(request);

        request.execute(function(resp) {
		  console.log(resp);

          var eventData = convertToLocalCalendarJson(resp.items);
          		  
		  var now = new Date();
		  var oneMonthLater = new Date().setMonth(now.getMonth+1);

		  $(document).ready(function() {
		  
			$('#calendar').weekCalendar({
			  data: eventData,
			  date: now,
			  minDate: now,
			  maxDate: oneMonthLater,
			  switchDisplay: {'1 day': 1,'3 days': 3,'Work week': 5, 'Full week': 7},
			  timeslotsPerHour: 4,
			  height: function($calendar) {
				return $(window).height() - $('h1').outerHeight() - $('.description').outerHeight();
			  },
			  eventRender: function(calEvent, $event) {
				if (calEvent.end.getTime() < new Date().getTime()) {
				  $event.css('backgroundColor', '#aaa');
				  $event.find('.time').css({
				    backgroundColor: '#999',
				    border:'1px solid #888'
				  });
				}
			  },
			  eventNew: function(calEvent, $event) {
			    var request = addEvent(calEvent);
    			request.execute(function(event) {
					displayMessage('<strong>Event created: '+ event.htmlLink + '</strong><br>');
				});
			  },
			  eventDrop: function(calEvent, $event) {
			    var request = deleteEvent('tmsf98ma3qiov5ierie14m66o0');
			    request.execute(function(response) {
					if(response.message) {
					  displayMessage('<strong>'+ response.message + '</strong><br>');
					}
					if(response.result) {
					  displayMessage('<strong>deletion succesfully performed</strong><br>');
					}
			    });
			  },
			  eventResize: function(calEvent, $event) {
				displayMessage('<strong>Resized Event</strong><br>Start: ' + calEvent.start + '<br>End: ' + calEvent.end);
			  },
			  eventClick: function(calEvent, $event) {
			    var request = getEvent('h1bmqriaepb4r4ho0ojgnkk02k');
				request.execute(function(response) {
					//... 
					//console.log(response);
				});
			  },
			  eventMouseover: function(calEvent, $event) {
				displayMessage('<strong>Mouseover Event</strong><br>Start: ' + calEvent.start + '<br>End: ' + calEvent.end);
			  },
			  eventMouseout: function(calEvent, $event) {
				displayMessage('<strong>Mouseout Event</strong><br>Start: ' + calEvent.start + '<br>End: ' + calEvent.end);
			  },
			  noEvents: function() {
				displayMessage('There are no events for this week');
			  },
			  reachedmindate: function($calendar, date) {
				displayMessage('You reached mindate');
			  },
			  reachedmaxdate: function($calendar, date) {
				displayMessage('You cannot go further');
			  }
			});

			function displayMessage(message) {
			  $('#message').html(message).fadeIn();
			}

			$('<div id="message" class="ui-corner-all"></div>').prependTo($('body'));
		  });
          
        });
      }
  


