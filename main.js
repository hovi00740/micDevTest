/*Global Variables */
var startIndex = 0;
var endIndex = startIndex + 10;
var startIndex2 = 0;
var endIndex2 = startIndex + 10;
var sortKey = 0; 


/*Helper functions*/
function sortByKey(array, key){
    return array.sort(function(a,b){
        var left = a[key]; 
        var right = b[key];
        return((left<right) ? -1 : ((left > right) ? 1:0)); 
    });
}
function isEndIndexValid(data){
    if(endIndex > data.length){
        return false; 
    }
    return true; 
}
function sortWords(){
    sortKey = 1;
}
function sortDate(){
    sortKey = 2;
}
function loadArticles(){
    $.getJSON("data/articles.json",function(data){
        //reformatDates(data);
        if(isEndIndexValid(data)){
            switch(sortKey){
                case 0:
                    break;
                case 1:
                    sortByKey(data,'words');
                    break;
                case 2:
                    sortByKey(data, 'publish_at');
                    break;
            }
            var items = [];
            for(var index = startIndex; index < endIndex; index++){
                var value = data[index];
                items.push("<tr>");
                items.push("<td id=''"+index+"''><img src="+value.image+"></td>");
                items.push("<td id=''"+index+"''>"+value.title+"</td>");
                items.push("<td id=''"+index+"''>"+value.profile.first_name+" "+value.profile.last_name+"</td>");
                items.push("<td id=''"+index+"''>"+value.words+"</td>");
                items.push("<td id=''"+index+"''>"+value.publish_at+"</td>");
                items.push("<tr>");
            }

            $("<tbody/>", {html: items.join("")}).appendTo("table"); 
        }
        else{
           var items = [];
            for(var index = startIndex; index < data.length; index++){
                var value = data[index];
                var className = "dark-grey";
                items.push("<tr class=''"+className+"''>");
                items.push("<td id=''"+index+"''><img src="+value.image+"></td>");
                items.push("<td id=''"+index+"''>"+value.title+"</td>");
                items.push("<td id=''"+index+"''>"+value.profile.first_name+" "+value.profile.last_name+"</td>");
                items.push("<td id=''"+index+"''>"+value.words+"</td>");
                items.push("<td id=''"+index+"''>"+value.publish_at+"</td>");
                items.push("<tr class=''"+className+"''>");
            }

            $("<tbody/>", {html: items.join("")}).appendTo("table"); 
        }
});
    
    
}
function loadMoreArticles(){
    
    $.getJSON("data/more-articles.json",function(data){
        if(isEndIndexValid(data)){
            //var wordsFirst = sortByKey(data, 'title');
            var items = [];
            for(var index = startIndex; index < endIndex; index++){
                var value = data[index];
                items.push("<tr>");
                items.push("<td id=''"+index+"''><img src="+value.image+"></td>");
                items.push("<td id=''"+index+"''>"+value.title+"</td>");
                items.push("<td id=''"+index+"''>"+value.profile.first_name+" "+value.profile.last_name+"</td>");
                items.push("<td id=''"+index+"''>"+value.words+"</td>");
                items.push("<td id=''"+index+"''>"+value.publish_at+"</td>");
                items.push("<tr>");
            }

            $("<tbody/>", {html: items.join("")}).appendTo("table"); 
        }
        else{
           var items = [];
            for(var index = startIndex; index < data.length; index++){
                var value = data[index];
                items.push("<tr>");
                items.push("<td id=''"+index+"''><img src="+value.image+"></td>");
                items.push("<td id=''"+index+"''>"+value.title+"</td>");
                items.push("<td id=''"+index+"''>"+value.profile.first_name+" "+value.profile.last_name+"</td>");
                items.push("<td id=''"+index+"''>"+value.words+"</td>");
                items.push("<td id=''"+index+"''>"+value.publish_at+"</td>");
                items.push("<tr>");
            }

            $("<tbody/>", {html: items.join("")}).appendTo("table"); 
        }
});
    
    
}
window.onload = function(){document.getElementById("load-button").onclick=function(){
    loadArticles(),
    addArticles()};}
function addArticles(){
    startIndex += 10;
    endIndex +=10;
    if(endIndex > 30){
        loadMoreArticles(); 
    }
    
}
function reformatDates(arrayOfData){
    for(i in arrayOfData){
        var date = arrayOfData[i].publish_at;
        var reformattedDate = moment(date,'YYYY-MM-DD hh:mm:ss').fromNow();
        arrayOfData[i].sumbitted = reformattedDate; 
    }
}

//Renders the html data 
loadArticles();








