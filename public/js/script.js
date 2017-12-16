
function menu(){

	var $btn = $('.menu'),
		$parent = $btn.parent(),
		$menu_list = $('.menu_list'),
		$cur = 'cur',
		$offsetX = 0,
		$animateX = '60%',
		$speed = 200;



	if(!$parent.hasClass($cur)){

		$btn.stop().animate({'left': $animateX}, $speed).parent().addClass($cur);
		$menu_list.animate({'left': $offsetX}, $speed);

	} else {

		$btn.stop().animate({'left': $offsetX}, $speed).parent().removeClass($cur);
		$menu_list.animate({'left': '-' + $animateX}, $speed);

	}

}



function reHeight(){

	var $menu_list = $('.menu_list'),
		$wHeight = $(window).height() + 88;
	$menu_list.height($wHeight);

}


// var call_array=[];
// function spam(show){
    // var mp3_url = "ogg/"+show+".ogg";
    // call_array.push(mp3_url);    
// }

// function playsound(){
    // var mp3_url ;

    // if( call_array.length > 0){
        // mp3_url = call_array.shift();
        // $("#music")[0].src = mp3_url;
        // $("#music")[0].load();        
        // $("#music")[0].play();        
    // }
// }

function callMumber(e){	

	var n = null;
	
	if(typeof(EventSource) !== "undefined"){
    
		var source = new EventSource(root+"plugins/server.php?id="+e);
		
		source.onmessage = function(event){
		
			var n1 = event.data;
			
			if(n1 != n ){  

				if(n != null){
					var dt = new Date();					
					$("#uptime").html(dt.toLocaleString());
					
					if(sound == e){						
						showVoice(n1);        
					}					
				}
				$("#number").html(n1);				
				n = n1;	
				
			}	
		};
	} else {
		 $("#number").html("Sorry, your browser does not support server-sent events...");
	}

}

function callMumber2(e){	

	var n = null;
		
	if(typeof(EventSource) !== "undefined"){				
			
			var source = new EventSource(root+"plugins/server.php?id="+e);		
			
			
			source.onmessage = function(event){
			
				var n1 = event.data;
				
				if(n1 != n ){						
					if(n != null){							
						
						if(sound == e){						
							showVoice(n1);        
						}					
					}						
					$("#led_"+e).html(n1);
					n = n1;						
				}	
			};
		
	} else {
		 $("#number").html("Sorry, your browser does not support server-sent events...");
	}
}

function notice(id){

	// number = '52'; //取設定通知號碼

	// var $notice = $('.notice'),
		// $person = prompt("請填入你的候診號碼", number);

	// if ($person != null) {

		// $notice.html("叫號通知：" + $person + "號");

	// }
	
	var $turn = $('.turn');
	
	if(sound > 0){
		setAudio(id,'0');
		sound = 0;		
		$turn.html("叫號通知已關閉").removeClass("notice_on").addClass("notice_off");		
	}else{		
		setAudio(id,'1');
		sound = id;		
		$turn.html("叫號通知已開啟").removeClass("notice_off").addClass("notice_on");		
	}

}

function showVoice(number){
    if(JSInterface){
        JSInterface.showVoice(number);
    }
}

function showToast(){
    if(JSInterface){
        JSInterface.shownotification();
    }
}

function setAudio(id,op){
	$.ajax({
		url:root+'index.php/store/audio',
		type:'post',
		data:{
			"id":id,
			"op":op
		},
		async:false,
		success:function(data){			
			console.log(data);
		},
		error:function(err){
			console.log('error');
		}
	})
}	

