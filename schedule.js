/**
 * Run this function while navigating HoBLotH schedule page (https://www.hearthofbritannia.com/events/HoBLotH3/schedule.php)
 * then copy the html in the console to schedule.html
 */

function generateTable (){
	var tds = document.querySelectorAll('.schedule td');
	var newDay = false;
	var day = 1;
	var schedule = {};
	for (var i = 0; i < tds.length; i++){
		var timeElement = tds[i++].querySelector('.displayNumber');
		var time = timeElement ? timeElement.innerHTML : 'All day';
		var event = tds[i].querySelector('.scheduleEntryTitle a').innerHTML;
		var url = tds[i].querySelector('.scheduleEntryTitle a').href;
		var id = url.substr(url.indexOf('=')+1);
		var location = tds[i].querySelector('.scheduleEntryLocation span').innerText;
		if (time === 'All day'){
			if (newDay == false){
				newDay = true;
				day++;
			}
		} else {
			newDay = false;
		}
		if (!schedule[day]){
			schedule[day] = {};
		}
		startTime = time.split(" ")[0];
		endingTime = time.split(" ")[2];
		if (!schedule[day][startTime]){
			schedule[day][startTime] = [];
		}
		schedule[day][startTime].push({event: event, location: location, ends: endingTime, id: id});
	}
	// Get all keys
	var hours = [];
	for (day in schedule){
		for (hour in schedule[day]){
			if (hours.indexOf(hour) == -1){
				hours.push(hour);
			}
		}
	}
	var html = '<table id = "scheduleTable">';
	html += '<tr><td>Hour</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td><td>Sunday</td></tr>';
	hours.sort();
	for (var i = 0; i < hours.length; i++){
		var hour = hours[i];
		html += '<tr><td>'+hour+'</td>';
		for (day in schedule){
			if (day == 1)
				continue;
			var events = schedule[day][hour];
			html += '<td>';
			if (events) for (var j = 0; j < events.length; j++){
				var event = events[j];
				if (event.ends){
					html+= '<p id = "ev'+event.id+'" onclick="toogle(this);">'+event.event+' at '+event.location+' (to '+event.ends+')</p>';
				} else {
					html+= '<p id = "ev'+event.id+'" onclick="toogle(this);">'+event.event+' at '+event.location+'</p>';
				}
			}
			html += '</td>';
		}
		html += '</tr>';
	}
	html += '</table>';
	console.log(html);
}

/**
 * Run this function while navigating HoBLotH registration page (https://www.hearthofbritannia.com/events/HoBLotH3/registration.php)
 * then copy the list of ids into the migration page at ./migrate.html to generate a schedule code
 */

function myIds(){
	var elements = document.querySelectorAll(".questTitle");
	var ids = '';
	for (var i = 3; i < elements.length; i++){
		var href = elements[i].parentNode.href;
		if (href){
			var id = href.substr(href.indexOf("=")+1);
			ids += id + ',';
		}
	}
	console.log(ids);
}