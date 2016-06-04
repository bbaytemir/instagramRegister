/*
*
* Burak Baytemir (bbaytemir@gmail.com)
* register to instagram
*
*/


var system = require('system');
var _mail,_pass,_uname,_fname;
var _arg = false;
var _datax;
var attempt = true;
if(system.args.length==2){
    switch (system.args[1]){
        case "!":
            console.log("instagramRegister.js mail pass name username false");
            phantom.exit();
            break;
        default:
            break;
    }
}else if(system.args.length==5){
    _mail = system.args[1];
    _pass = system.args[2];
    _uname = system.args[3];
    _fname = system.args[4];
    _datax = {
        email: _mail,
        password: _pass,
        username: _uname,
        fullName: _fname
    };
    _arg = true;
}else if(system.args.length==6){
    _mail = system.args[1];
    _pass = system.args[2];
    _uname = system.args[3];
    _fname = system.args[4];
    _datax = {
        email: _mail,
        password: _pass,
        username: _uname,
        fullName: _fname
    };
    _arg = true;
    attempt = system.args[5];
}
var steps = [];
var testindex = 0;
var loadInProgress = false;//This is set to true when a page is still loading
/*********SETTINGS*********************/
var webPage = require('webpage');
var page = webPage.create();

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;
phantom.clearCookies();
/*********SETTINGS END*****************/

page.onConsoleMessage = function (msg) {
    console.log(msg);
};
/**********DEFINE STEPS THAT FANTOM SHOULD DO***********************/
steps = [

    //Step 1 - Open Amazon home page
    function () {
        page.open("https://instagram.com", function (status) {
        });
    },
    //Step 2 - Click on the Sign in button
    function () {

        page.evaluate(function (_arg) {
            var _data = {
                email: "ubesuddiru-8103@yopmail.com",
                password: "asdasdasd",
                username: "ubesuddiru8103",
                fullName: "xxx asdasx"
            };
            if(_arg[0]==true){
                _data = _arg[1];
            }
            var _url="https://www.instagram.com/accounts/web_create_ajax/attempt/";
            if(_arg[2]=="false")
                _url="https://www.instagram.com/accounts/web_create_ajax/";
            $.ajax({
                async: false,
                type: "post",
                url: _url,
                data: _data,
                success: function (dat) {
                    console.log(JSON.stringify(dat));
                }
            });

        },{0:_arg,1:_datax,2:attempt});

    },

];
/**********END STEPS THAT FANTOM SHOULD DO***********************/
//Execute steps one by one
interval = setInterval(executeRequestsStepByStep, 50);

function executeRequestsStepByStep() {
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        phantom.exit();
    }
}


/**
 * These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */
page.onLoadStarted = function () {
    loadInProgress = true;
};
page.onLoadFinished = function () {
    loadInProgress = false;
};
page.onConsoleMessage = function (msg) {
    console.log(msg);
};


