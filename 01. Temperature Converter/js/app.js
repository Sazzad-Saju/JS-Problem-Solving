let inputs = document.querySelectorAll('.input');
const celInput = inputs[0]
const fahrInput = inputs[1];
const kelInput = inputs[2];

for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', function(e) {
        let tempVal = parseFloat(e.target.value);
        // console.log(tempVal);
        switch (e.target.name) {
            case "celcius":
                fahrInput.value = ((tempVal * 1.8) + 32).toFixed(2);
                kelInput.value = (tempVal + 273.15).toFixed(2);
                break;
            case "fahrenheit":
                celInput.value = ((tempVal - 32) / 1.8).toFixed(2);
                kelInput.value = (((tempVal - 32) / 1.8) + 273.15).toFixed(2);
                break;
            case "kelvin":
                celInput.value = (tempVal - 273.15).toFixed(2);
                fahrInput.value = (((tempVal - 273.15) * 1.8) + 32).toFixed(2);
                break;
        }
    })
}