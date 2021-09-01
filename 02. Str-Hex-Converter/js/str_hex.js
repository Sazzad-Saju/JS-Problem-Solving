const inpStr = document.getElementById('inputStr');
const outHex = document.getElementById('outputHex');

const txts = document.getElementsByClassName('txtbox');

function toHex(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16).toUpperCase();
    }
    return result;
}

function toTxt(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

for (i = 0; i < txts.length; i++) {
    let tmptxt = txts[i];
    tmptxt.addEventListener('input', function(e) {
        // console.log(e.target.name + ":" + tmptxt.value);
        switch (e.target.name) {
            case "plaintext":
                // console.log(tmptxt.value);
                outHex.value = toHex(tmptxt.value);
                break;
            case "hexadecimal":
                // console.log(tmptxt.value);
                let contain;
                if (tmptxt.value != "") {
                    contain = tmptxt.value[tmptxt.value.length - 1].toUpperCase();
                }
                var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                // console.log(contain);
                if (contain > "F" && contain <= "Z" || format.test(contain) == true) {
                    tmptxt.value = tmptxt.value.slice(0, -1);
                    // console.log(tmptxt.value);
                }
                inpStr.value = toTxt(tmptxt.value);
                break;
        }
    })
}

document.getElementById("clearBtn").addEventListener("click", function() {
    inpStr.value = "";
    outHex.value = "";
});