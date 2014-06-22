var horizon=0;
var textHeight;
var beat=400;
var wait=0;
var stop=false;
var dead = false;
var testing = false;
var $lines;
var interval;
    var letters=["A","S","D","F"];
if(!window.actions)window.actions=[];
var off=4-actions.length;


$(function(){
    $('body').append("<div id='blackout'>Press Spacebar to Retry...</div>");
    $("<div id='red'></div>").appendTo('body').hide();
    $("<div id='grey'></div>").appendTo('body').hide();
    $('body').append("<div id='weapons-holder'><span id='weapons'>Weapons</span></div>");
    $('#holder').offset({left:$(window).width()/2-200});
    for(var i=0;i<4;i++){
	$("<div class='action'>"+(
	  ((i-off)>=0)?("<div class='word'>"+actions[i-off].name+"</div>"):"")+
	 "<div class='letter'>["+letters[i]+"]</div></div>").appendTo("body").css({left:(25*i)+'%'});
    }
    $(".challenge").each(function(i,el){
	var test = tests[Math.floor(Math.random()*tests.length)%tests.length];
	$(el).after("<p b='2' test='"+test.needs+"' class='new s'>"+test.start+"</p><p b='2' class='e'>"+test.end+"</p>").remove();
    });
    $lines = $("#holder").children();
    $lines.each(function(i,line){process(line);});
    $(document).keyup(function(evt){$('#red').hide(); $('#grey').hide();});
    $(document).keydown(function(evt){
		var action = actions[letters.indexOf(String.fromCharCode(evt.keyCode).toUpperCase())-off];
		console.log(JSON.stringify(action));

	if(dead && evt.keyCode==32)
	{
	    evt.preventDefault();
	    location.reload();
	    return;
	}
	if(evt.keyCode==32){
	    evt.preventDefault();
	    reset();
	    tick();
	}
	if(testing && action){
	    if(testing==action.name){
		$('#grey').show();
		 var $action = $("<p b='2'>"+action.text+"</p>").insertAfter($lines[horizon-1]);
		$($lines[horizon]).remove();
	    process($action);
		$lines = $("#holder").children();

	    }else{
		$('#red').show();
		 var $action = $("<p b='2'>"+action.text+"</p>").insertAfter($lines[horizon-1]);
		
		process($action);
		 $action = $("<p b='2'>"+action.fail+"</p>").insertAfter($action);
		
		process($action);
		$lines = $("#holder").children();

	    }
	    testing=null;
	}
    });
    textHeight = 30;
    reset();
});

function reset(){
    if(interval)clearInterval(interval);
    wait=0;
    interval = setInterval(tick,beat);
}

function process(line){
    var $line = $(line);
    $line.css({opacity:0,display:'none'});
    if($line.is("a")){
	$line.click(function(evt){
	    evt.preventDefault();
	    stop=true;

	    $('body').fadeOut(1000,function(){
		window.location = $line.attr("href");
	    });
	});
    }
}


function tick(){
    if(stop)return;

    if(wait<1){

	var $line = $($lines[horizon]);
	var b = $line.attr("b");
	if(!b)b=4;
	wait=b;
	testing = $line.attr("test");
	
	var margin = $line.hasClass("new")?textHeight:0;
	$line.css({display:'block','line-height':0,'marginTop':0});
	if(testing){
	    $line.animate({opacity:1,'line-height':textHeight,'marginTop':margin},50);
	}
	else $line.animate({opacity:1,'line-height':textHeight,'marginTop':margin}, beat);
		if($line.hasClass("e")){
	    $('#blackout').fadeIn(3000);
	    stop=true;
		    dead=true;
	    return;
	}
	horizon++;
    }else{
	wait--;
    }
}

