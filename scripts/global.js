
window.onload = function () {
    let url = "data.json";
    let request = new XMLHttpRequest();
    request.open("get", url);
    request.send(null);

    request.onload = function () {
        console.log(request.status);
        if (request.status == 200) {
            let json = JSON.parse(request.responseText);
            let spendBlock = document.createElement("div");
            const artiSpend = document.getElementById("spendingInfo");

            let viewHeight = 100;
            let weekSpend = 0;
            let maxDailySpend = "";
            
            let spendData = [];
     
            for (let i=0; i<json.length; i++) {
                weekSpend += json[i].amount;
                if (json[i].amount > maxDailySpend) {
                    maxDailySpend = json[i].amount;
                }
            }
            //console.log(maxDailySpend);
            let chartHeight = (viewHeight).toString() + "px";
            //console.log(chartHeight)
            

            //building a array which includes all data from json by using prototype chain
            for(let i=0; i<json.length; i++) {
                var cur = "";
                var height = (json[i].amount/maxDailySpend*viewHeight*0.95).toFixed(4);
                var heightString = height+"px";

                var cur = new DaySpend(json[i].day, json[i].amount, heightString, chartHeight, maxDailySpend);

                spendData.push(cur);
                var chartCol = cur.addChartCol();
                if (json[i] == maxDailySpend) {
                    chartCol.style.backgroundColor = "hsl(186, 34%, 60%)";
                }
                spendBlock.appendChild(chartCol);
            }
            //console.log(weekSpend);
            //console.log(spendData);
            //console.log(divSpend);

            artiSpend.appendChild(spendBlock);
            console.log(document.getElementById("spendingInfo"));
        }
    }
}

// building a prototype model
const DaySpend = function(day, amount, height, divSize, maxValue) {
    this.day = day;
    this.amount = amount;
    this.height = height;
    this.divSize = divSize;
    this.maxValue = maxValue;
}

DaySpend.prototype.addChartCol = function() {
    /* create the subtitle for col */
    let newSubs = document.createElement("div");
    let newContent = document.createTextNode(this.day);
    newSubs.appendChild(newContent);
    
    /* create the chart for col */
    let newChart = document.createElement("div");
    newChart.style.height = this.height;
    if (this.amount === this.maxValue) {
        newChart.style.backgroundColor = "hsl(186, 34%, 60%)";
    } else {
        newChart.style.backgroundColor = "hsl(10, 79%, 65%)";
    }

    /* create the amount info for col */
    let newAmountDiv = document.createElement("div");
    let newAmount = document.createTextNode("$" + this.amount);
    newAmountDiv.appendChild(newAmount);
    
    /* create the col which includes subtitle and chart */
    let newCol = document.createElement("div");
    newCol.appendChild(newSubs);
    newCol.appendChild(newChart);
    newCol.appendChild(newAmountDiv);
    
    return newCol;
}