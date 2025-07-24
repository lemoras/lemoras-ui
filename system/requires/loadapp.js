var app = window.location.pathname.split('/')[2]; // >?
var template = window.location.pathname.split('/')[3];

if (window.localStorage.getItem("template") != template) {
    if ( window.localStorage.getItem("template") === null) {
        window.location.replace("../../../index.html");    // >?    
    }
    else {
        window.location.replace("#!/home");
    }
}


var result = window.localStorage.getItem("app");

if (result == null) {
    window.location.replace("#!/home");
}
else {
    var script = document.createElement("script");  // create a script DOM node
    var url = '../../../system/requires/main.js';
    script.src =  url;
    document.head.appendChild(script);	   
}

        // Update the count down every 1 second
        var x = setInterval(function() {
            var closeConfig =  window.localStorage.getItem("config");
            var closeConfigType = window.localStorage.getItem("configType");
            var closeAppId = window.localStorage.getItem("appId");

            if ((closeConfig == null || closeConfig == undefined  || closeConfig == "" || closeConfig.length == 0)
                && (closeConfigType == null  || closeConfigType == undefined  || closeConfigType == "" || closeConfigType.length> 0)
                && (closeAppId == null  || closeAppId == undefined  || closeAppId == ""  || closeAppId.length == 0))
                window.location.replace(window.location.origin);
        }, 5000);
