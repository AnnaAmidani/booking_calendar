/**

Js Wrapper to Google Calendar API

@author Anna Amidani 
@date   April 2016

API https://developers.google.com/google-apps/calendar/v3/reference/

**/


   /** 
	*   Utility method to handle cors request on all browsers (with auth token)
	*   Original code written and explained by C.Zackas: https://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/
	*	Adapted by Anna Amidani: add an authorization token to the http header in order to perform asynchronous calls
	*/
	function createAuthCORSRequest(httpMethod, url, oauthToken){
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr){
			xhr.open(httpMethod, url, true);
			xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token);
		} else if (typeof XDomainRequest != "undefined"){
			xhr = new XDomainRequest();
			xhr.open(httpMethod, url);
			xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token);
		} else {
			xhr = null;
		}
		return xhr;
	}
		
	
   /**
	*  Retrieve an event by id.
	*  GET https://www.googleapis.com/calendar/v3/calendars/calendarId/events/eventId
	*/
	function getEvent(eventGoogleId) {
		var request = gapi.client.calendar.events.get({
			  'calendarId': CALENDAR_ID,
			  'eventId': eventGoogleId
		});
		return request;
	}		

	/**
	* Retrieve the list of events starting from a given datetime. Returns an array of events objects.
	* GET https://www.googleapis.com/calendar/v3/calendars/calendarId/events
	*/
      function getAllEvents() {
        var request = gapi.client.calendar.events.list({
          'calendarId': CALENDAR_ID,
          'timeMin': (new Date(2016, 1, 4)).toISOString(),
//          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 100,
          'orderBy': 'startTime'
        });
        return request;
      }
      
      

 /**
   * Add an event, print the response (success/fail) 
   * POST https://www.googleapis.com/calendar/v3/calendars/calendarId/events/insert
   */
	function addEvent(calEvent) {		
		var event = {
		  'summary': 'Lesson with Anna',
		  'description': 'A lesson with Anna',
		  'start': {
			'dateTime': '2016-04-14T11:00:00+02:00'
		  },
		  'end': {
			'dateTime': '2016-04-14T11:30:00+02:00'
		  },
//			  'recurrence': [
//				'RRULE:FREQ=DAILY;COUNT=2'
//			  ],
		  'attendees': [
			{'email': 'anna.amidani@hotmail.it'},
			{'email': 'an5tash@gmail.com'}
		  ],
		  'reminders': {
			'useDefault': false,
			'overrides': [
			  {'method': 'email', 'minutes': 24 * 60},
			  {'method': 'popup', 'minutes': 10}
			]
		  }
		};
	

		var request = gapi.client.calendar.events.insert({
		  'calendarId': CALENDAR_ID,
		  'resource': event,
		  'sendNotifications': false
		});
	
		return request;
	}
		
	

 /**
   * Retrieve the given event by Id and update it with the provided information in the event obj; print the response (success/fail) 
   * POST https://www.googleapis.com/calendar/v3/calendars/calendarId/events/update
   */		
	function updateEvent(eventGoogleId, calEvent) {
		var event = {
		  'summary': 'Lesson with Jonas',
		  'description': 'A lesson with Jonas',
		  'start': {
			'dateTime': '2016-04-15T18:00:00+02:00'
		  },
		  'end': {
			'dateTime': '2016-04-15T19:00:00+02:00'
		  },			
		};
		/*
		var event = {
		  'summary': calEvent.title,
		  'description': calEvent.description,
		  'start': {
			'dateTime': calEvent.start
		  },
		  'end': {
			'dateTime': calEvent.end
		  }
		};
		*/

		var request = gapi.client.calendar.events.update({
		  'calendarId': CALENDAR_ID,
		  'eventId': eventGoogleId,
		  'resource': event,
		  'sendNotifications': true
		});
		return request;

		//request.execute(function(event) {
		  //console.log('Event updated: ' + event.htmlLink);
		//});
	}
      
      
		  
  /**
   * Delete an event by Id, print the response (success/fail) 
   * POST https://www.googleapis.com/calendar/v3/calendars/calendarId/events/delete
   */		
	function deleteEvent(eventGoogleId) {	
		var request = gapi.client.calendar.events.delete({
			  'calendarId': CALENDAR_ID,
			  'eventId': eventGoogleId,
			  'sendNotifications': false
			});
		return request;
	}



	/** 
	*   Utility method to convert google events array to the local json format needed by the local calendar.
    */
	function convertToLocalCalendarJson(jsonArray) {
		  var jsonToCal = '[';
		  for(var i = 0; i < jsonArray.length; i++ ) {
			  jsonToCal += '{';
			  jsonToCal += '\"id\":' + (i+1);
			  jsonToCal += ',';
			  jsonToCal += '\"start\":\"' + jsonArray[i].start.dateTime + '\"';
			  jsonToCal += ',';
			  jsonToCal += '\"end\":\"' + jsonArray[i].end.dateTime + '\"';
			  jsonToCal += ',';
			  jsonToCal += '\"title\":\"' + jsonArray[i].summary + '\"'; 
			  jsonToCal += '}';
			  if(i < jsonArray.length-1) 
				  jsonToCal += ',';
		  }
		  jsonToCal += ']';
		  return JSON.parse(jsonToCal);
	}



	 /**
	   * CORS version - enable if you want/need to use cors
       * Delete an event by Id, print the response (success/fail) 
       * POST https://www.googleapis.com/calendar/v3/calendars/calendarId/events/delete
       * /		
		function deleteEvent(eventGoogleId) {
			var restCall = "https://www.googleapis.com/calendar/v3/calendars/"+CALENDAR_ID+"/events/delete";
			var params = getCommons(eventGoogleId);
			var xhRequest = createAuthCORSRequest("POST", restCall + params, gapi.auth.getToken());
			if (xhRequest){
				xhRequest.onload = function(){
				  console.log('Deletion result: '+ xhRequest.responseText);
				};
				xhRequest.send();
			}
		}
      */
		
		
		
		
		/** 
		*   Utility method to create the standard set of params for rest calls.
		*   Change the sendNotifications value in order to enable/disable standard Google notifications 
       * /
		function getCommons(eventId) {
			var commonParameters = "?";
			commonParameters += "eventId";
			commonParameters += "=";
			commonParameters += eventId;
			commonParameters += "&";
			commonParameters += "sendNotifications";
			commonParameters += "=";
			commonParameters += "true";
			return commonParameters;
		}
		
		*/



