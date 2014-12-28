function formatDate(date){
    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][date.getDay()]
+", "+
["January","February","March","April","May","June","July","August","September","October","November","December"][date.getMonth()]
+" "+
(date.getDate()+1)
+", "+
date.getFullYear();
}

$(function(){
$('article>time:first-child').each(function(i,e){
    var date = new Date(Date.parse($(e).attr('datetime')));
   $(e).text(formatDate(date));
});
});
