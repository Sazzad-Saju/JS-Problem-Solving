// load modal
$(function() {
    $(".secondHTML").load("modal.html");
});

// ***   ***    ***
// sum of square series
document.getElementById('goButt').addEventListener('click', sumOfSeris);

function sumOfSeris() {
    var n = parseInt(document.getElementById('input').value);
    // console.log(n);
    if (isNaN(n) != true) {
        var series = "";
        var result = 0;
        for (var i = 1; i <= n; i++) {
            result += i * i;
            // series += i * i.toString();
            series += `${i}<sup>2</sup>`;
            if (i == n) {
                continue;
            }
            series += " + ";
        }
        // console.log(`${series} = ${result}`);
        document.getElementById('SoS').innerHTML = `
                Results: ${series} = ${result}
                `
    } else {
        document.getElementById('SoS').innerHTML = "";
    }
}

// ***   ***    ***
// factorial
// Calculate at most 170!
document.getElementById('factCal').addEventListener('click', calculate);

function calculate() {
    var n = parseInt(document.getElementById('factInp').value);
    // console.log(n);
    if (isNaN(n) != true) {
        var i = 1;
        var factorial = 1;
        while (i <= n) {
            factorial *= i;
            i++;
        }
        // console.log(factorial);
        // remove scientific notation
        factorial = BigInt(factorial).toString();
        document.getElementById('factRes').value = factorial;
    }
}
document.getElementById('factClear').addEventListener('click', function() {
    document.getElementById('factRes').value = "";
    document.getElementById('factInp').value = "";
});

// ***   ***    ***
// Check values of PI: PI Test!
document.getElementById('piSec').addEventListener('click', openPiSec);

function openPiSec(e) {
    // console.log(e.target.parentElement)
    e.target.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
            `
    setTimeout(function() {
        var insertionSec = e.target.parentElement;
        insertionSec.innerHTML = `
                    <div class="col my-4 text-center" id="insertedSec">
                `
        for (i = 0; i < 175; i++) {
            insertionSec.innerHTML += `
                    <input type="text" maxlength="1" class="text-center mx-3 mb-2 rounded">
                    `
        }
        insertionSec.innerHTML += `</div> <div class="mt-3"><small class="text-muted"> Note: Don't Press TAB</small> <small id = "totalMiss">Misstake: 0</small></div>`;
        var inp = document.querySelectorAll('input')[2];
        inp.value = 3;
        // inp1.setAttribute('readonly', true);
        inp.setAttribute('disabled', true);
        inp = document.querySelectorAll('input')[3];
        inp.value = ".";
        inp.setAttribute('disabled', true);
        inp = document.querySelectorAll('input')[4];
        inp.value = "1";
        inp.setAttribute('disabled', true);
        inp = document.querySelectorAll('input')[5];
        inp.value = "4";
        inp.setAttribute('disabled', true);
        inp = document.querySelectorAll('input')[6];
        inp.focus();
    }, 1000);
}
var ind = 0;
var tMistake = 0;
var container = document.getElementsByClassName("inpSec")[0];
container.onkeyup = function(e) {
    var target = e.srcElement || e.target;
    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    var myLength = target.value.length;
    var PiVal = "159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852";
    if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
            if (next == null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                if (PiVal[ind] == target.value) {
                    // target.classList.add("correct");
                    target.className = "text-center mx-3 mb-2 rounded correct";
                    ind++;
                    next.focus();
                    break;
                } else {
                    // target.classList.add("wrong");
                    target.className = "text-center mx-3 mb-2 rounded wrong";
                    tMistake++;
                    document.getElementById('totalMiss').innerHTML = `
                            <small id = "totalMiss">Misstake: ${tMistake}</small>
                            `
                        // console.log(ind);
                    break;
                }
            }
        }
        //CANNOT Evaluate Last Input//
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
        var previous = target;
        while (previous = previous.previousElementSibling) {
            if (previous == null)
                break;
            if (previous.tagName.toLowerCase() === "input") {
                if (ind > 0) {
                    previous.focus();
                    target.classList.add("neutral");
                    // target.className("text-center mx-3 mb-2 rounded neutral");
                    ind--;
                    break;
                }
            }
        }
    }
}

// ***   ***    ***
// Random and Pseudorandom Number Generator
document.querySelector('#rndGen').addEventListener('click', generate);

function generate(e) {
    document.querySelector('#Random-result').innerHTML = `
            <span class="spinner-border spinner-border-sm spinArea" role="status" aria-hidden="true"></span>
            `
    setTimeout(function() {
        var min = Math.ceil(document.querySelectorAll('.smallInp')[0].value);
        var max = Math.floor(document.querySelectorAll('.smallInp')[1].value);
        var date = new Date()
        today = "";
        today += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " ";
        date = today + date.toString().substr(16, 15);
        // console.log(date.substr(16, 15));
        if (min < max) {
            var randNum = Math.floor(Math.random() * (max - min + 1) + min);
            // console.log(randNum);
            var elem = document.querySelector('#Random-result');
            elem.classList.remove('danger');
            elem.classList.add('rng-res');

            elem.innerHTML = `<b>${randNum}</b>
            <p>
                <small>Min: ${min}, Max: ${max}</small>
                <small>${date}</small>
            </p>`
        } else {
            var elem = document.querySelector('#Random-result');
            elem.classList.remove('rng-res');
            elem.classList.add('danger');
            elem.innerHTML = `<b>ERROR</b>
            <p>
                <small>Min: ${min}, Max: ${max}</small>
                <small>Note: Max cannot be smaller than Min</small>
            </p>`

        }
    }, 500);
}

// pseu
function feedSeed(state1, state2) {
    var mod1 = 4294967087
    var mul1 = 65539
    var mod2 = 4294965887
    var mul2 = 65537
    if (typeof state1 != "number") {
        state1 = +new Date()
    }
    if (typeof state2 != "number") {
        state2 = state1
    }
    state1 = state1 % (mod1 - 1) + 1
    state2 = state2 % (mod2 - 1) + 1

    function random(limit) {
        state1 = (state1 * mul1) % mod1
        state2 = (state2 * mul2) % mod2
        if (state1 < limit && state2 < limit && state1 < mod1 % limit && state2 < mod2 % limit) {
            return random(limit)
        }
        return (state1 + state2) % limit
    }
    return random
}

document.querySelector('#pseuGen').addEventListener('click', pseurandGen);

function pseurandGen(e) {
    document.querySelector('#pseu-result').innerHTML = `
            <span class="spinner-border spinner-border-sm spinArea" role="status" aria-hidden="true"></span>
            `
    setTimeout(function() {
        var seed = Math.ceil(document.querySelectorAll('.smallInp')[2].value);
        var max = Math.floor(document.querySelectorAll('.smallInp')[3].value);
        // console.log(seed, max);
        var generateRandom = feedSeed(seed);
        var fixedRandom = generateRandom(max);
        // console.log(fixedRandom);
        var date = new Date()
        today = "";
        today += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " ";
        date = today + date.toString().substr(16, 15);
        if (seed != "" && max != "") {
            var elem = document.querySelector('#pseu-result');
            elem.classList.remove('danger');
            elem.classList.add('rng-res');

            elem.innerHTML = `<b>${fixedRandom}</b>
            <p>
                <small>Seed: ${seed}, Max: ${max}</small>
                <small>${date}</small>
            </p>`
        } else {
            var elem = document.querySelector('#pseu-result');
            elem.classList.remove('rng-res');
            elem.classList.add('danger');
            elem.innerHTML = `<b>ERROR</b>
            <p>
                <small>Seed: ${seed}, Max: ${max}</small>
                <small>Note: Seed or Max must not be blank</small>
            </p>`

        }
    }, 500);
}

// regular expression
document.querySelector('#newAC').addEventListener('click', function() {
    var nameCheck, postalCheck, emailCheck, passCheck, phoneCheck;
    document.getElementById('inName').addEventListener('input', function(e) {
        // console.log(e.target.value);
        re1 = /^([^0-9]*)$/
        re2 = /(.*[a-z]){3}/i
        str = e.target.value;
        if (re1.test(str) == true && re2.test(str) == true) {
            // console.log('true');
            nameCheck = true;
            e.target.className = "form-control correct";
            document.getElementById('nameErr').setAttribute("style", "display:none");

        } else {
            // console.log('false');
            e.target.className = "form-control wrong";
            document.getElementById('nameErr').setAttribute("style", "display:block");
        }
    })
    document.getElementById('inPostal').addEventListener('input', function(e) {
        re = /^[0-9]{4}$/;
        str = e.target.value;
        if (re.test(str) == true) {
            postalCheck = true;
            e.target.className = "form-control correct";
            document.getElementById('postalErr').setAttribute("style", "display:none");

        } else {
            e.target.className = "form-control wrong";
            document.getElementById('postalErr').setAttribute("style", "display:block");
        }
    })
    document.getElementById('inEmail').addEventListener('input', function(e) {
        re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        str = e.target.value;
        if (re.test(str) == true) {
            emailCheck = true;
            e.target.className = "form-control correct";
            document.getElementById('emailErr').setAttribute("style", "display:none");

        } else {
            e.target.className = "form-control wrong";
            document.getElementById('emailErr').setAttribute("style", "display:block");
        }
    })
    document.getElementById('inPass').addEventListener('input', function(e) {
        re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
        str = e.target.value;
        if (re.test(str) == true) {
            passCheck = true;
            e.target.className = "form-control correct";
            document.getElementById('passErr').setAttribute("style", "display:none");

        } else {
            e.target.className = "form-control wrong";
            document.getElementById('passErr').setAttribute("style", "display:block");
        }
    })
    document.getElementById('inPhone').addEventListener('input', function(e) {
        re = /^(\+)?(88)?01[0-9]{9}$/;
        str = e.target.value;
        if (re.test(str) == true) {
            phoneCheck = true;
            e.target.className = "form-control correct";
            document.getElementById('phoneErr').setAttribute("style", "display:none");

        } else {
            e.target.className = "form-control wrong";
            document.getElementById('phoneErr').setAttribute("style", "display:block");
        }
    })
    document.getElementById('signupButt').addEventListener('click', function() {
        if (nameCheck == true && postalCheck == true && emailCheck == true && passCheck == true && phoneCheck == true) {
            alert("You are elegible to open an account!");
        } else {
            alert("Please input correct information to procced!");
        }
    })
})