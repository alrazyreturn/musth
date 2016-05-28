/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
	
	
	
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      //  app.receivedEvent('deviceready');
		app.alertFunction();
			 
		  if(window.localStorage.getItem("loggedIn") == 1) 
		    {				 
			  app.getnotify();
			}
    },
	
	alertFunction :function () {
				function alertDismissed() {
			alert('welcome');
		}
		
		navigator.notification.alert(
			'You are the winner!',  // message
			alertDismissed,         // callback
			'Game Over',            // title
			'Done'                  // buttonName
		);
	},
    // Update DOM on a Received Event
	
	localNotificationTest :function () {
		var now                  = new Date().getTime(),
    _30_seconds_from_now = new Date(now + 30*1000);
/*
window.plugin.notification.local.add({
    id:      1, // is converted to a string
    title:   'Reminder',
    message: 'Dont forget to buy some flowers.',
    repeat:  'weekly',
    date:    _60_seconds_from_now
});
*/


 // Schedule notification for tomorrow to remember about the meeting
    cordova.plugins.notification.local.schedule({
        id: 10,
        title: "Welcome Back",
        text: "Welcome at MUST",
        firstAt: _30_seconds_from_now ,
	    every: "minute" ,
		sound: "file://beep.caf",
        data: { meetingId:"#123FG8" }
		
    });

    // Join BBM Meeting when user has clicked on the notification 
    cordova.plugins.notification.local.on("click", function (notification) {
        if (notification.id == 10) {
            joinMeeting(notification.data.meetingId);
        }
    });

    // Notification has reached its trigger time (Tomorrow at 8:45 AM)
    cordova.plugins.notification.local.on("trigger", function (notification) {
		
		/*
        if (notification.id != 10)
            return;
			*/
			
			
			
		
		 app.getnotify();
       
			 
        
		
 		/*
        // After 10 minutes update notification's title 
        setTimeout(function () {
            cordova.plugins.notification.local.update({
                id: 10,
                title: "Meeting in 5 minutes!"
            });
        }, 10000);
		*/
		
    });
	
 
	 
	},
	 checkNotify:  function ()
		{
				var std_id=window.localStorage.getItem("std_id");
				alert(std_id);
				
			$.ajax({ 
			type: 'POST', 
			url: 'http://www.must.edu.eg/intranet/ios/inbox_notify.php', 
			data: { std_id: std_id }, 
			dataType: 'json',
			success: function (data) { 
			 
				 
				 /*
				$.each(data, function(index, element) {
					$('body').append($('<div>', {
						text: element.name
						alert(element.name);
						 }));
				 });
				   */ 
	
				$.each(data.inbox, function(index, element) { 
				    
						 var inboxTitle= element.subject;
						 var inboxBody= element.body;
						 alert (inboxBody);
						if(element.success == 1)
						{
								var now                  = new Date().getTime(),
					    _60_seconds_from_now = new Date(now + 10*1000);
							 setTimeout(function () { 
							 
				    		  window.plugin.notification.local.add({
								id:     2, // is converted to a string
								title:   inboxTitle,
								message: inboxBody,
								date:    _60_seconds_from_now
								}); 
								
							  app.checkNotify(); }, 20000);
						}
						else
						{
							alert("we check data");
						}
					 });
			   
				}
	
			 });
		} ,
	test :function (title) {
		 
		 /*
		 
		 	var now                  = new Date().getTime(),
    _20_seconds_from_now = new Date(now + 20*1000);
		  setTimeout(function () {
             cordova.plugins.notification.local.schedule({
        id: 10,
        title: "hello data",
        text: "welcoem to new dat",
        at: _20_seconds_from_now,// tomorrow_at_8_45_am,
        data: { meetingId:"#123FG8" }
    });
        }, 10000);
		
		*/
		
	//	var now                  = new Date().getTime(),
    //_20_seconds_from_now = new Date(now + 20*1000);
		  setTimeout(function () { alert (title); app.getnotify();}, 10000);
		 
		
		
	},
	
	notifyFunc :function () {
		 
		 
		 var now = new Date().getTime(),
                    _5_sec_from_now = new Date(now + 5 * 1000);

          var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
		 cordova.plugins.notification.local.schedule({
    			    id: '1',
                    title: 'Scheduled with delay',
                    text: 'Test Message 1',
                    at: _5_sec_from_now,
                    sound: sound,
                    badge: '12'
});
 
cordova.plugins.notification.local.on("click", function (notification) {
   // joinMeeting(notification.data.meetingId);
});
		
	 
	},
	
		notifyFuncWithtitle :function (title,data,id) {
		 
		 
		 var now = new Date().getTime(),
                    _5_sec_from_now = new Date(now + 5 * 1000);

          var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
		 cordova.plugins.notification.local.schedule({
    			    id: '1',
                    title: title,
                    text: data,
                    at: _5_sec_from_now,
                    sound: sound,
                    badge: '12'
});
 
cordova.plugins.notification.local.on("click", function (notification) {
   // joinMeeting(notification.data.meetingId);
});
		
	 
	},
	
	   getnotify :  function ()
			
			{
			//	alert("welcome1");
			var std_id=window.localStorage.getItem("std_id");
			//alert(std_id);
			var count=0;
			var inbox_count=0;
        $.ajax({ 
        type: 'POST', 
        url: 'http://www.must.edu.eg/studentszone/ios/inbox_notify.php', 
        data: { std_id: std_id }, 
        dataType: 'json',
        success: function (data) { 
	//	alert("welcome2");
        //    alert(data);
             
             /*
            $.each(data, function(index, element) {
                $('body').append($('<div>', {
                    text: element.name
                    alert(element.name);
                     }));
             });
               */ 

 			 var news_output=   "";
			  var title="";
			  var abody="";
            $.each(data.inbox, function(index, element) {
                 
                   
                 //  alert(element.Message);
				  //  alert(element.body);
				   // alert(element.read);
                   
				  title = element.subject;
				  
				  abody +=title +"\n>";// element.body;
					
				  id=element.id;
				  
				  inbox_count++;
				  /*
					 	var now                  = new Date().getTime(),
          _20_seconds_from_now = new Date(now + 20*1000);
		  setTimeout(function () { alert (title); inbox.getnotify();}, 10000);
				    */
					
					
					window.plugin.notification.local.add({
					id:      id, // is converted to a string
					title:   title,
					message: abody,
					 sound: "file://beep.caf",
					every:  'minute' 
					});
									
				  
			   
				  
				  
 
		
                    } 
					
						 );
				//	  alert (title);
               
				//setTimeout(function () { alert (title);  app.test(title);}, 10000);
			    //alert ("goood");    
				
		    /*
				window.plugin.notification.local.add({
					id:      1, // is converted to a string
					title:   title,
					message: abody,
					 sound: "file://message.mp3",
					every:  'minute' 
					});
					 
				*/
				
				/*
				title= inbox_count  + " New Message";
		        cordova.plugins.notification.local.update({
                id: 10,
                title:   title ,
			    text: abody ,
			    sound: "file://beep.caf"
				
            });	
				*/
				  
					
             //  alert(title);
        
	

				count=100;
				 
					 
            }
			
			 

         });
		 
		 /*
		 if(count ==0)
		 {
			  app.test('agaaaaaaaaaaaaaain');
		 }
		 else
		 {
			 alert("aaaaaaaaaaaa");
		 }
		 */
		 
}
,
	
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
