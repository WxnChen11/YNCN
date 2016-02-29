/**
 * Created by Wenxin on 2/28/2016.
 */

/**
 * Extendable code. - Should work with any number of students and courses -
 */
 
$.getJSON("/scripts/student_courses.json", function(data) {

    var arrStudents = data.students; //array of students
    var arrCourses = data.courses; //array of courses
    
    var courses = [];
    
    for(i = 0; i < arrCourses.length; i++){
    
        courses[i] = [arrCourses[i].name]; //2D array, first element of each secondary array is the course name
        // REMINDER - COURSE ID IS ONE GREATER THAN COURSE INDEX - //
    }
    
    for(i = 0; i < arrStudents.length; i++){
    
        for(z = 0; z < arrStudents[i].courses.length; z++){
    
            courses[(arrStudents[i].courses)[z]-1].push(arrStudents[i].name);
        }
    }
    
    var Professors = [];
    
    for(i=0; i< arrCourses.length; i++){
    
        var ind = inListProfs(Professors, arrCourses[i].professor);
    
        if (ind == -1) { //avoiding use of indexOf
    
            Professors.push([arrCourses[i].professor]); //add professor name as 1st element of list
    
        }
    
    }
    
    for (i = 0; i < arrStudents.length; i++){
    
        for (q = 0; q < arrStudents[i].courses.length; q++){
            
            //finding index of prof for course
            var insertIndex = inListProfs(Professors, arrCourses[(arrStudents[i].courses)[q]-1].professor); //Must subtract 1 from Course ID!
    
            //checking to see if student is already in the prof list. If not, push
            if(inList(Professors[insertIndex], arrStudents[i].name) == -1){
                Professors[insertIndex].push(arrStudents[i].name);
            }
        }
    }

//console.log(Professors);
//console.log(courses);


//Display in Website

for (x = 0; x < courses.length; x++){

    if(x == 0){ //append with offset to fit 5 columns. no closing </div> needed for previous row

        $('#main').append("\
        <h3 class='sectionHead'>Course List</h3>\
        <div class='row' id='C_row" + Math.floor(x/5) + "'>\
            <div class='col-md-2 col-md-offset-1'>\
                <ul class='list-group' id='clist" + (x) + "'>");

        addNames(x,courses, "c");

        $('#main').append("</ul></div>");

    }

    else if(x%5 == 0) { //same code as above but with </div> to close off previous row

        $('#main').append("\
        </div><div class='row' id='C_row" + Math.floor(x/5) + "'>\
            <div class='col-md-2 col-md-offset-1'>\
                <ul class='list-group' id='clist" + (x) + "'>");

        addNames(x,courses, "c");

        $('#main').append("</ul></div>");

    }

    else{ //regular column of width 2

        $('#C_row' + Math.floor(x/5)).append("\
            <div class='col-md-2'>\
                <ul class='list-group' id='clist" + (x) + "'>");

        addNames(x,courses, "c");

        $('#main').append("</ul></div>");

    }


}

for(x=0; x<Professors.length; x++){

    if(x == 0){ //same as above

        $('#main').append("\
        <h3 class='sectionHead'>Professor List</h3>\
        <div class='row' id='P_row" + Math.floor(x/5) + "'>\
            <div class='col-md-2 col-md-offset-1'>\
                <ul class='list-group' id='plist" + (x) + "'>");

        addNames(x, Professors, "p");

        $('#main').append("</ul></div>");

    }

    else if(x%5 == 0) { //same code as above but with </div> to close off previous row

        $('#main').append("\
        </div><div class='row' id='P_row" + Math.floor(x/5) + "'>\
            <div class='col-md-2 col-md-offset-1'>\
                <ul class='list-group' id='plist" + (x) + "'>");

        addNames(x,Professors, "p");

        $('#main').append("</ul></div>");

    }

    else{ //regular column of width 2

        $('#P_row' + Math.floor(x/5)).append("\
            <div class='col-md-2'>\
                <ul class='list-group' id='plist" + (x) + "'>");

        addNames(x,Professors, "p");

        $('#main').append("</ul></div>");

    }


}

});

//add names as <li> to <ul>, first element has additional class "title"
function addNames(id,list, type){

    $('#' + type + 'list' + id).append("\
        <li class='list-group-item title' >" + list[id][0] + "</li>");

    for(g = 1; g < list[x].length; g++){

        $('#' + type + 'list' + id).append("\
            <li class='list-group-item'>" + list[id][g] + "</li>");
    }
}

//function for finding index of professor in list, if it exists
function inListProfs(list, e){

    for(z = 0; z < list.length; z++){

        if ((list[z])[0] == e){
            return z;
        }
    }

    return -1;
}

//function for finding index of student in list of Professors
function inList(list, e){

    for(a = 0; a < list.length; a++){

        if ((list[a]) == e){
            return a;
        }
    }

    return -1;
}






















