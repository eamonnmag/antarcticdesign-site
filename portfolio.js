var portfolio = {}

function loadPortfolio() {
    $.ajax({
        type: "GET",
        url: "portfolio.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            portfolioList = response.portfolio;

            html = '';
            for (portfolioItemIndex in portfolioList) {

                portfolioItem = portfolioList[portfolioItemIndex];
                portfolio[portfolioItem.id] = portfolioItem

                html += '<span onclick="renderPortfolioItem(\'' + portfolioItem.id + '\')" class="case">';
                html += '<img src="img/portfolio/' + portfolioItem.logo + '" alt="' + portfolioItem.project + '">';
                html += '</span>';
            }

            $("#layerPortfolio").html(html);

        },
        error: function (msg) {
            if (msg.statusText != "OK") {
                alert("Error occured while retriving data. :(");
            }
        }
    });
}

function renderPortfolioItem(portfolioId) {
    if (portfolioId in portfolio) {

        html = '<div class="portfolio-detail">';
        var portfolioItem = portfolio[portfolioId];
        html += '<p class="portfolio-header">' + portfolioItem.project + '</p>';
        html += '<p style="color:#1c75bc; font-weight: normal">' + portfolioItem.client + '</p>';
        html += '<div class="portfolio-top">';
        html += '<div><img src="img/portfolio/' + portfolioItem.screenshot + '" height="300" /></div>';
        html += '<div class="clearfix"></div>';
        html += '<div style="float:right"><br/><a href="' + portfolioItem.url + '" target="_blank" class="view-button">View Live</a></div>';
        html += "</div>";

        html += '<div class="clearfix"></div>';
        html += '<div class="portfolio-bottom">';
        html += '<div class="portfolio-description">';
        html += '<p>' + portfolioItem.description + '</p>';
        html += "</div>";

        html += '<div class="portfolio-services">';
        html += '<p><span style="font-weight: normal">Services Provided</span></p>';
        for (task in portfolioItem.tasks) {
            html += '<span class="tag tag-white">' + portfolioItem.tasks[task] + '</span>';
        }

        html += '<p><span style="font-weight: normal">Technologies/Frameworks Used</span></p>';

        for (technology in portfolioItem.technologies) {
            html += '<span class="tag tag-orange">' + portfolioItem.technologies[technology] + '</span>';
        }
        html += "</div>";
        html += '</div>';
        html += '</div>';

        $("#dimmer").fadeIn(function () {
            $("#dimmercontent").html(html);
        });
        $("#dimmercontent").fadeIn();

    } else {
        alert("Nothing here!")
    }
}
