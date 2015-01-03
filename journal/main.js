function formatDate(date){
    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][date.getDay()]
+", "+
["January","February","March","April","May","June","July","August","September","October","November","December"][date.getMonth()]
+" "+
(date.getDate()+1)
+", "+
date.getFullYear();
}

function lifts(){
    $('squat, benchpress, deadlift, powerclean').each(function(e){
	var parts = $(e).text().split("x");
	parts[2] = parts[2]*2;
	$(e).text(parts[0]+"x"+parts[1]+"x"+parts[2]);
    });
}

function bodyfat(){
    $('bodyfat').each(function(i,e){
	console.log($(e).text());
	$(e).text(_.reduce($(e).text().split(/\s+/),function(a,b){
	    return parseInt(b)+a;
	},0) + "mm");
    });

}

$(function(){
$('article>time:first-child').each(function(i,e){
    var date = new Date(Date.parse($(e).attr('datetime')));
   $(e).text(formatDate(date));
   
});
    lifts();
    bodyfat();
});
