/*!
* Start Bootstrap - Bare v5.0.7 (https://startbootstrap.com/template/bare)
* Copyright 2013-2021 Start Bootstrap
* Copyright 2022 ndtn97 (Modified)
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/

let minvals = [];
let maxvals = [];

function viewvals() {
    vals = getValues();

    console.log("minval: ", vals["minval"]);
    console.log("maxval: ", vals["maxval"]);
    console.log("sens: ", vals["sens"]);
}

function getValues() {
    let minval = parseFloat(document.getElementById("minval").value);
    let maxval = parseFloat(document.getElementById("maxval").value);
    let sens = parseFloat(document.getElementById("sens").value);
    return { minval, maxval, sens };
}

function setValid(id, is_valid) {
    let setClass;
    let remClass;
    if (is_valid) {
        setClass = "is-valid";
        remClass = "is-invalid"
    }else {
        setClass = "is-invalid";
        remClass = "is-valid";
    }
    obj = document.getElementById(id)
    obj.classList.remove(remClass);
    obj.classList.add(setClass);
}

function setButton(flag) {
    document.getElementById("btn_lower").disabled = flag;
    document.getElementById("btn_higher").disabled = flag;
}

function onPushed(btn) {
    if (minvals.length == 0){
        vals = getValues();
        let minval = vals["minval"];
        let maxval = vals["maxval"];
        document.getElementById("minval").readOnly = true;
        document.getElementById("maxval").readOnly = true;
        minvals.push(minval);
        maxvals.push(maxval);
    }

    let minval = minvals[minvals.length - 1];
    let maxval = maxvals[maxvals.length - 1];

    if (btn == 'L'){
        // Lower
        maxval = (minval+maxval)/2
    }else if(btn == 'H'){
        // Higher
        minval = (minval+maxval)/2
    }else{
        // Undo
        minvals.pop();
        maxvals.pop();
        minval = minvals.pop();
        maxval = maxvals.pop();
    }

    if (minvals.length == 0){
        document.getElementById("btn_undo").disabled = true;
    }else{
        document.getElementById("btn_undo").disabled = false;
    }
    
    minvals.push(minval);
    maxvals.push(maxval);

    document.getElementById("sens").value = ((minval + maxval) / 2).toFixed(10);

}

function onPushedL() {
    onPushed('L');
}

function onPushedH() {
    onPushed('H');
}

function onPushedU() {
    onPushed('U');
}

function onInputChange() {
    vals = getValues();
    let minval = vals["minval"];
    let maxval = vals["maxval"];

    if (isNaN(minval)) {
        setValid("minval", false);
    } else {
        setValid("minval", true);
    }
    if (isNaN(maxval)) {
        setValid("maxval", false);
    } else {
        setValid("maxval", true);
    }

    if (!(isNaN(minval) || isNaN(maxval))) {
        if (minval >= maxval) {
            setValid("minval", false);
            setValid("maxval", false);
            setButton(true);
        } else {
            setValid("minval", true);
            setValid("maxval", true);
            setButton(false);
            document.getElementById("sens").value = ((minval + maxval) / 2).toFixed(10);
        }
    }

}
