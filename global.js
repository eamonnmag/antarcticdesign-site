var intImgIndex = 0;
var intAntal = 0;

var mouseX = 0;
var leftMargin = 0;
var scrollWidth = 0;
var winWidth = 0;
var winHeight = 0;

var posHome = 0;
var posPortfolio = 450;
var posContact = 960;
var posPlupp = 0;

var Layer0MaxLeft = 5000;
var Layer1MaxLeft = 3504;
var Layer2MaxLeft = 5000;
var Layer4MaxLeft = 5000;
var Layer5MaxLeft = 5000;

var Flare1MaxLeft = 2000;
var Flare2MaxLeft = 1560;
var Flare3MaxLeft = 900;
var Flare4MaxLeft = 1950;

var startPos = 0;
var endPos = 0;
var newPos = 0;

var PortfTop = 0;
var PortfBottom = 0;

$(document).ready(function () {
    CalculateWindow();
    $("#dragBtn").draggable({ axis: "x", containment: "parent", drag: function (e) {
        MoveContainer(e)
    }, stop: function () {
        $("#layer3").css("background", "url('img/penguin.png') right no-repeat");
    } });
    $("#dimmer").click(function () {
        CloseDims();
    });
    $("#dimmercontent").click(function () {
        CloseDims();
    });
    $("#ahome").click(function () {
        MoveContainerClick('home');
    });
    $("#aportfolio").click(function () {
        MoveContainerClick('portfolio');
    });
    $("#acontact").click(function () {
        MoveContainerClick('contact');
    });
});

window.onload = function () {
    $("#preloader").fadeOut();
    showTwitterFeeds();
    loadPortfolio();
}

$(window).bind("resize", function () {
    CalculateWindow();
});

function CloseDims() {
    $("#dimmercontent").fadeOut(function () {
        $("#dimmer").fadeOut(function () {
            $("#dimmercontent").html("");
        });
    });
}

function ShowBigImage(imgName) {
    $("#dimmer").fadeIn(function () {
        $("#dimmercontent").html("<img src=\"img/portfolio/" + imgName + "\" alt\=\"\"/><br />Click anywhere to close");
    });
    $("#dimmercontent").fadeIn();
}

function ShowHTML(html) {
    $("#dimmer").fadeIn(function () {
        $("#dimmercontent").html(html);
    });
    $("#dimmercontent").fadeIn();
}


function showTwitterFeeds() {
    twitterFetcher.fetch('357843678779289603', 'twitter', 1, true, false, false);
}

function CalculateWindow() {
    $("#portfoliofilm").draggable("destroy");
    if (jQuery.browser.msie) {
        winWidth = document.documentElement.offsetWidth;
        winHeight = document.documentElement.offsetHeight;
    } else {
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
    }
    scrollWidth = $("#scrollbar").width();
    leftMargin = (winWidth - scrollWidth) / 2;
    startPos = leftMargin;
    endPos = leftMargin + scrollWidth;

    PortfTop = winHeight - 786;
    PortfBottom = winHeight - 466;


    portfCont = [0, PortfTop, 0, PortfBottom];
    $("#portfoliofilm").draggable({ axis: "y", containment: portfCont });

}


function MoveContainerClick(toWhat) {
    $("#logo").css("z-index", "18");

    if (toWhat == "portfolio") {
        var L0 = "-3000px"
        var L1 = "-1700px"
        var L2 = "-3000px"
        var L4 = "-3000px"
        var L5 = "-3000px"

        var F1 = "1010px"
        var F2 = "788px"
        var F3 = "455px"
        var F4 = "-985px"

        var P = "450px"
        var newPoss = 450;
    }
    if (toWhat == "contact") {
        var L0 = "-5000px"
        var L1 = "-3000px"
        var L2 = "-5000px"
        var L4 = "-5000px"
        var L5 = "-5000px"

        var F1 = "1976px"
        var F2 = "1541px"
        var F3 = "889px"
        var F4 = "-1926px"

        var P = "950px"
        var newPoss = 950;
    }
    if (toWhat == "home") {
        var L0 = "0px"
        var L1 = "0px"
        var L2 = "0px"
        var L4 = "0px"
        var L5 = "0px"

        var F1 = "0px"
        var F2 = "0px"
        var F3 = "0px"
        var F4 = "0px"

        var P = "0px"

        var newPoss = 0;
    }

    currPos = $("#dragBtn").css("left");
    if (currPos == 'auto') {
        currPos = '0px';
    }
    currPosPx = parseInt(currPos);


    if (newPoss > currPosPx) {
        diffPos = newPoss - currPosPx;
    } else {
        diffPos = currPosPx - newPoss;
    }


    anSpeed = diffPos * 10
    if (anSpeed < 1000) {
        anSpeed = 1000
    }

    if (currPos != P) {
        if(P < currPos) {
            $("#layer3").css("background", "url('img/_penguin.png') right no-repeat");
        } else {
            $("#layer3").css("background", "url('img/penguin_.png') right no-repeat");
        }


        $("#layer0").animate({left: L0}, anSpeed);
        $("#layer1").animate({left: L1}, anSpeed);
        $("#layer2").animate({left: L2}, anSpeed);
        $("#layer4").animate({left: L4}, anSpeed);
        $("#layer5").animate({left: L5}, anSpeed);

        $("#flare1").animate({left: F1}, anSpeed);
        $("#flare2").animate({left: F2}, anSpeed);
        $("#flare3").animate({left: F3}, anSpeed);
        $("#flare4").animate({left: F4}, anSpeed);

        $("#dragBtn").animate({left: P}, anSpeed, function () {
            $("#layer3").css("background", "url('img/penguin.png') right no-repeat");
        });

    }

}

function MoveContainer(e) {
    $("#logo").css("z-index", "18");
    if (e.pageX > startPos && e.pageX < endPos) {

        if(endPos > e.pageX) {
            $("#layer3").css("background", "url('img/_penguin.png') right no-repeat");
        } else {
            $("#layer3").css("background", "url('img/penguin_.png') right no-repeat");
        }

        $("#layer3").css("background", "url('img/penguin_.png') right no-repeat");

        Layer0NewPos = Math.round((Layer0MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#layer0").css("left", "-" + Layer0NewPos + "px");

        Layer1NewPos = Math.round((Layer1MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#layer1").css("left", "-" + Layer1NewPos + "px");

        Layer2NewPos = Math.round((Layer2MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#layer2").css("left", "-" + Layer2NewPos + "px");

        Layer4NewPos = Math.round((Layer4MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#layer4").css("left", "-" + Layer4NewPos + "px");

        Layer5NewPos = Math.round((Layer5MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#layer5").css("left", "-" + Layer5NewPos + "px");

        Flare1NewPos = Math.round((Flare1MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#flare1").css("left", Flare1NewPos + "px");

        Flare2NewPos = Math.round((Flare2MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#flare2").css("left", Flare2NewPos + "px");

        Flare3NewPos = Math.round((Flare3MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#flare3").css("left", Flare3NewPos + "px");

        Flare4NewPos = Math.round((Flare4MaxLeft / (endPos - startPos)) * (e.pageX - startPos));
        $("#flare4").css("left", "-" + Flare4NewPos + "px");


    }
}


