// read date from input, draw calender
document.getElementById('openCal').addEventListener('click', openCalendar);

function openCalendar() {
    var getDat = document.querySelector('#inDob').value;
    // console.log(getDat);
    let dob = new Date(getDat);
    if (dob.getMonth() >= 0 && dob.getMonth() < 12 && dob.getDate() >= 1 && dob.getDate() < 32) {
        let yr = parseInt(dob.getFullYear());
        let mn = parseInt(dob.getMonth());
        let dt = parseInt(dob.getDate());
        var g = document.createElement('div');
        g.setAttribute("id", "cal");
        document.querySelector('#calendar').innerHTML = ``;
        document.querySelector('#calendar').appendChild(g);

        dycalendar.draw({
            target: "#cal",
            type: "month",
            year: yr,
            month: mn,
            date: dt,
            highlighttargetdate: true
        })

        // 1.give border when point on date 2. remove border when leave the date 
        // 3. update input when click the date and close calender on modal
        var calData = document.querySelectorAll('td');
        // console.log(calData);
        // console.log(calData[9].innerText);
        for (var i = 0; i < calData.length; i++) {
            if (isNaN(calData[i].innerText) == 0 && calData[i].innerText != "") {
                // console.log(calData[i].innerText);
                calData[i].addEventListener("mouseenter", function(e) {
                    // console.log(e.target);
                    e.target.style.border = '1px solid #333';
                });
                calData[i].addEventListener('mouseleave', e => {
                    e.target.style.border = 0;
                });
                calData[i].addEventListener('click', e => {
                    var g = document.createElement('div');
                    g.setAttribute("id", "cal");
                    document.querySelector('#calendar').appendChild(g);
                    var dat = parseInt(e.target.innerText);
                    dycalendar.draw({
                        target: "#cal",
                        type: "month",
                        year: yr,
                        month: mn,
                        date: dat,
                        highlighttargetdate: true
                    })
                    var newDat = (mn + 1) + "/" + dat + "/" + yr;
                    // console.log(newDat);
                    document.getElementById('inDob').value = newDat;
                    hide_modal();
                });
            }
        }
    } else {
        document.querySelector('#calendar').innerHTML = `
        <strong class = "text-danger py-5 px-5"> Input Date is not valid </strong>
        `
    }
}

function hide_modal() {
    $('#calModal').modal('hide');
}

// Calculate Age
function getAge(dateString) {
    var now = new Date();
    var today = new Date(now.getYear(), now.getMonth(), now.getDate());

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
    var dob = new Date(dateString);

    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";


    yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
        var monthAge = monthNow - monthDob;
    else {
        yearAge--;
        var monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
        var dateAge = dateNow - dateDob;
    else {
        monthAge--;
        var dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };

    if (age.years > 1) yearString = " years";
    else yearString = " year";
    if (age.months > 1) monthString = " months";
    else monthString = " month";
    if (age.days > 1) dayString = " days";
    else dayString = " day";


    if ((age.years > 0) && (age.months > 0) && (age.days > 0))
        ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
    else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
        ageString = "Only " + age.days + dayString + " old!";
    else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
        ageString = age.years + yearString + " old. Happy Birthday!!";
    else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
        ageString = age.years + yearString + " and " + age.months + monthString + " old.";
    else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
        ageString = age.months + monthString + " and " + age.days + dayString + " old.";
    else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
        ageString = age.years + yearString + " and " + age.days + dayString + " old.";
    else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
        ageString = age.months + monthString + " old.";
    else ageString = "Oops! Could not calculate age!";

    return ageString;
}
// calculate age DOM
var getDat = document.querySelector('#calculateButt').addEventListener('click', function() {
    let dateString = document.querySelector('#inDob').value;
    // console.log(dateString);
    let ageStatement = getAge(dateString);
    if (ageStatement == "Oops! Could not calculate age!") {
        document.querySelector('.ageState').innerHTML = `${ageStatement}`
        document.querySelector('#result-sec').style.display = 'block';
        document.querySelector('#result-sec').style.color = '#D8000C'
        dycalendar.draw({
            target: "#moreCal",
            type: "day",
            dayformat: "full",
            monthformat: "full"
        })
    } else if (ageStatement.substring(ageStatement.length - 16) == "Happy Birthday!!") {
        document.querySelector('.ageState').innerHTML = `You are ${ageStatement}`
        document.querySelector('#result-sec').style.display = 'block';
        document.querySelector('#result-sec').style.color = '#00529B';
        document.querySelector('#moreCal').innerHTML = `<img src = "img/Happy Birthday.png" class= "img-thumbnail rounded" style="background-color: #EEEEEE; border: none;"> `
    } else {
        var dob = new Date(document.querySelector('#inDob').value);
        var today = new Date();
        var monDiff = dob.getMonth() - today.getMonth();
        // console.log(monDiff);
        var yr = today.getFullYear();
        if (monDiff < 0) {
            yr += 1;
        }
        if (monDiff == 0) {
            var dayDiff = dob.getDate() - today.getDate();
            if (dayDiff < 0) {
                yr += 1;
            }
        }
        var mn = dob.getMonth();
        var dt = dob.getDate();

        dycalendar.draw({
                target: "#moreCal",
                type: "day",
                dayformat: "full",
                monthformat: "full",
                year: yr,
                month: mn,
                date: dt
            })
            // console.log(ageStatement);
        document.querySelector('.ageState').innerHTML = `You are ${ageStatement}`
        document.querySelector('#result-sec').style.display = 'block';
        document.querySelector('#result-sec').style.color = '#4F8A10'
    }
});

document.querySelector('#clearButt').addEventListener('click', function() {
    document.querySelector('#result-sec').style.display = 'none';
    document.querySelector('#inDob').value = "";
})