	$(document).ready(function(){
		
/*	alert("Doc Ready First");
	
	
	var date = new Date();
	alert("time zones"+date.toTimeString());
	var removev=date.toTimeString();
	var v=removev.replace(/\s/g, '');
	var zonetiming = v.substr(0,v.indexOf('G'));
	zone=v.match(/\((.*?)\)/)[1];
	alert("zone"+zone);*/
	
	
	
    document.addEventListener("deviceready",onDeviceReady,false);     

});
	
	function exit_app() {

		  navigator.app.exitApp();
		}
		 
	
	 function resolution_handling() 
	 {
	     //first way to implement
	     browser_width = $(window).width();
	     browser_height = $(window).height();
	     //alert('browser_width'+browser_width);
	     //alert('browser_height'+browser_height);
	 }

		
		    var device1;			

function success(uuid)		
{		
     device1 = {uuid:uuid,device_model:"",device_platform:"",device_version:""};
     index_page();
};		

function fail(uuid)		
{		alert("failure function reg");};	
    
    
		function onDeviceReady() {
                       window.plugins.uniqueDeviceID.get(success, fail);
    }
    function index_page(){
			
 		var element = document.getElementById('deviceProperties');
		var device_uuid = device1.uuid;
       
 	var networkState = navigator.connection.type;
    if (networkState == Connection.NONE)
    {
     
        
     
                window.location='./first_screen.html';
                return true;
    }
    else
{
    	
    	
		
		
		
		
		
		$.ajaxSetup({
        xhrFields: {
            withCredentials: true
        }
    });

		$.ajax({
          url:"http://183.82.96.212:8080/services/session/token",
          type:"get",
          dataType:"text",
          crossDomain: true,
          timeout: 20000,
          error:function (jqXHR, textStatus, errorThrown) {
        	  if(textStatus==="timeout") {
        		  bootbox.dialog({
        			  closeButton: false,
        			  message: "Problem connecting with server. Please try after sometime.",
        			  title: "Alert",
        			  buttons: {
        			    success: {
        			      label: "OK",
        			      className: "btn-danger",
        			      callback: function() {
        			    	  
        			    	  exit_app();
        			      }
        			    
        			    }
        			    
        			    
        			  }
        			});
		        } 
          },
          success: function (token) {   

   	var device_uuid = device1.uuid;
	var d = document.getElementById("device_uuid");
	var token =token;
	var header = "X-CSRF-TOKEN";
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
	

		
    		is_device_registered(device_uuid);
   
 function is_device_registered(device_uuid)
{
	             $.ajax({
              url: 'http://183.82.96.212:8080/m_service/m_resources/is_device_registered',
              type: "post",
      		  data: 'device_uuid='+device1.uuid,
              dataType: "json",
              timeout: 20000,
              crossDomain: true,
              
              
			  error: function (jqXHR, textStatus, errorThrown) {
				  if(textStatus==="timeout") {
					  bootbox.dialog({
						  closeButton: false,
	        			  message: "Problem connecting with server. Please try after sometime.",
	        			  title: "Alert",
	        			  buttons: {
	        			    success: {
	        			      label: "OK",
	        			      className: "btn-danger",
	        			      callback: function() {
	        			    	  
	        			    	  exit_app();
	        			      }
	        			    
	        			    }
	        			    
	        			    
	        			  }
	        			});
				  }
			        
             bootbox.dialog({
            	 closeButton: false,
  message: "Problem connecting with server. Please try after sometime.",
  title: "Alert",
  buttons: {
    success: {
      label: "OK",
      className: "btn-danger",
      callback: function() {
    	  
    	  exit_app();
      }
    
    }
    
    
  }
});
              },
			                success: function (data) {
							
			                	//data.logindata[0].is_security_question_answered;
							if(data.is_security_question_answered==1 && data.logindata[0].count>=1)
      {
   
      window.location='./log-in.html';
      return false;
      }
      else if(data.is_security_question_answered==0 && data.logindata[0].count>=1)
      {
      window.location='./portal_security_questions.html?user_id='+data.user_id;
      return false;
      }
      else
      {
      window.location='./registration.html';
      return false;
      }
										  }
            });

  return false;

}
}
			});
}
}
    			
