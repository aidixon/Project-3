var appToken = app_token;

// Query URL for the data 
var queryUrl = `https://opendata.fcgov.com/resource/8n27-taq6.json?$where=datenum%3E=20190101&$$app_token=${appToken}`;
console.log(queryUrl)

// Function to extract data and put into a visible table
function getWaterData() {
    queryUrl;
    // Variables for empty lists
    var all_dates = [];
    var all_poudre = [];
    var all_horsetooth = [];
    var all_finished = [];
    var water_data = [];

    response = d3.json(queryUrl, function(data) {
        console.log(data);

        // The data is callable 
        water_data.push(data);
        
        // For loop to loop through the data
        for (var i = 0; i < data.length; i++) {

            // Code to extract data and push into empty arrays
            var water_dates = data[i].date; 
            all_dates.push(water_dates);
                
            var poudreturb = data[i].poudre_turb_ntu;
            all_poudre.push(+poudreturb);

            var horsetoothturb = data[i].horsetooth_turb_ntu;
            all_horsetooth.push(+horsetoothturb);

            var finishedturb = data[i].finished_water_turb_ntu;
            all_finished.push(+finishedturb);

    }

    // console.log(all_dates);
    console.log(all_poudre);
    console.log(all_horsetooth);
    console.log(all_finished);
    console.log(water_data);
    console.log(all_dates);


    // Second chart 
    var trace4 = {
        type: "scatter",
        mode: "lines",
        x: all_dates,
        y: all_finished,
        line: {
            color: "#17BECF"
        }
    }

    var layout2 = {
        title: "Finished Water Closer Analysis",
        xaxis: {
            title: "Date",
        },
        yaxis: {
            title: "Turbidity Measurement (NTU)"
        },
        width: 1700,
        height: 600,
        margin: {
            l: 70,
            b: 120,
            t: 60,
        }
    }
    
    var data = [trace4];

    Plotly.newPlot("plot-2", data, layout2);


    // Lists for Jan 2019, 2020, 2021 data for comparing most recent full month
    var Jan2021F = [0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.03,0.03,
        0.03,0.03,0.02,0.03,0.03,0.03,0.03,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02];

    var Jan2021H = [2.41,2.38,2.44,2.41,2.47,2.45,2.48,2.44,2.47,2.53,2.51,2.52,2.48,2.56,2.86,
        2.99,2.9,3.03,3.06,2.92,2.68,2.63,2.63,2.63,2.61,2.58,2.46,2.41,2.4,2.39,2.48];

    var Jan2021P = [0.42,0.41,0.44,0.54,0.48,0.51,0.48,0.53,0.45,0.49,0.49,0.48,0.6,0.64,0.62,
        0.6,0.58,0.6,0.53,0.67,0.65,0.59,0.59,0.6,0.6,0.6,0.61,0.62,0.63,0.66,0.63];

    var Jan2020F = [0.02, 0.02,0.02,0.02,0.02,0.02,0.02,0.03,0.02,0.02,0.02,0.02,0.02,0.02,0.02,
        0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02,0.02];

    var Jan2020H = [2.22,2.21,2.26,2.19,2.13,2.35,2.25,3.12,2.14,2.19,2.19,2.13,2.22,2.06,2.05,
        2.05,2.06,2.16,2.2,2.17,2.11,2.03,1.95,1.98,1.94,1.86,1.81,1.74,1.77,1.92,1.85];

    var Jan2020P = [0.37,0.38,0.36,0.38,0.42,0.39,0.41,0.41,0.39,0.41,0.42,0.4,0.39,0.42,0.43,
        0.44,0.44,0.43,0.43,0.42,0.44,0.45,0.46,0.45,0.43,0.43,0.43,0.42,0.45,0.45,0.44];

    var Jan2019F = [0.02,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,
        0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.04,0.04,0.03,0.03];

    var Jan2019H = [2.97,2.97,2.95,2.95,2.92,2.86,2.67,2.66,2.72,2.71,2.65,2.64,2.69,2.61,2.51,
        2.47,2.44,2.42,2.45,2.37,2.34,2.75,2.7,2.62,2.66,2.83,2.88,2.97,3.02,2.87,2.79,2.72];

    var Jan2019P = [0.29,0.27,0.27,0.31,0.32,0.3,0.32,0.39,0.47,0.41,0.41,0.41,0.41,0.41,0.4,0.42,
        0.4,0.43,.41,0.41,0.41,0.41,0.4,0.41,0.4,0.41,0.4,0.66,0.56,0.39,0.38,];

    // Third chart using Highcharts.js
    Highcharts.chart('container', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Water Turbidity'
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value} NTU'
        },
        plotOptions: {
            packedbubble: {
                minSize: '20%',
                maxSize: '100%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    gravitationalConstant: 0.05,
                    splitSeries: true,
                    seriesInteraction: false,
                    dragBetweenSeries: true,
                    parentNodeLimit: true
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 250
                    },
                    style: {
                        color: 'black',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    }
                }
            }
        },
        series: [{
            name: 'January 2019 Finished Water Turbidity',
            data: [{
                name: "01-Jan-2019",
                value: Jan2019F[0]
            }, {
                name: "02-Jan-2019",
                value: Jan2019F[1]
            },
            {
                name: "03-Jan-2019",
                value: Jan2019F[2]
            },
            {
                name: "04-Jan-2019",
                value: Jan2019F[3]
            }, {
                name: "05-Jan-2019",
                value: Jan2019F[4]
            },
            {
                name: "06-Jan-2019",
                value: Jan2019F[5]
            },
            {
                name: "07-Jan-2019",
                value: Jan2019F[6]
            }, {
                name: "08-Jan-2019",
                value: Jan2019F[7]
            },
            {
                name: "09-Jan-2019",
                value: Jan2019F[8]
            },
            {
                name: "10-Jan-2019",
                value: Jan2019F[9]
            }, {
                name: "11-Jan-2019",
                value: Jan2019F[10]
            },
            {
                name: "12-Jan-2019",
                value: Jan2019F[11]
            },
            {
                name: "13-Jan-2019",
                value: Jan2019F[12]
            }, {
                name: "14-Jan-2019",
                value: Jan2019F[13]
            },
            {
                name: "15-Jan-2019",
                value: Jan2019F[14]
            },
            {
                name: "16-Jan-2019",
                value: Jan2019F[15]
            }, {
                name: "17-Jan-2019",
                value: Jan2019F[16]
            },
            {
                name: "18-Jan-2019",
                value: Jan2019F[17]
            },
            {
                name: "19-Jan-2019",
                value: Jan2019F[18]
            }, {
                name: "20-Jan-2019",
                value: Jan2019F[19]
            },
            {
                name: "21-Jan-2019",
                value: Jan2019F[20]
            },
            {
                name: "22-Jan-2019",
                value: Jan2019F[21]
            }, {
                name: "23-Jan-2019",
                value: Jan2019F[22]
            },
            {
                name: "24-Jan-2019",
                value: Jan2019F[23]
            },
            {
                name: "25-Jan-2019",
                value: Jan2019F[24]
            }, {
                name: "26-Jan-2019",
                value: Jan2019F[25]
            },
            {
                name: "27-Jan-2019",
                value: Jan2019F[26]
            },
            {
                name: "28-Jan-2019",
                value: Jan2019F[27]
            },
            {
                name: "29-Jan-2019",
                value: Jan2019F[28]
            },
            {
                name: "30-Jan-2019",
                value: Jan2019F[29]
            },
            {
                name: "31-Jan-2019",
                value: Jan2019F[30]
            }
            ]
        }, {
            name: 'January 2020 Finished Water Turbidity',
            data: [{
                name: "01-Jan-2020",
                value: Jan2020F[0]
            }, {
                name: "02-Jan-2020",
                value: Jan2020F[1]
            },
            {
                name: "03-Jan-2020",
                value: Jan2020F[2]
            },
            {
                name: "04-Jan-2020",
                value: Jan2020F[3]
            }, {
                name: "05-Jan-2020",
                value: Jan2020F[4]
            },
            {
                name: "06-Jan-2020",
                value: Jan2020F[5]
            },
            {
                name: "07-Jan-2020",
                value: Jan2020F[6]
            }, {
                name: "08-Jan-2020",
                value: Jan2020F[7]
            },
            {
                name: "09-Jan-2020",
                value: Jan2020F[8]
            },
            {
                name: "10-Jan-2020",
                value: Jan2020F[9]
            }, {
                name: "11-Jan-2020",
                value: Jan2020F[10]
            },
            {
                name: "12-Jan-2020",
                value: Jan2020F[11]
            },
            {
                name: "13-Jan-2020",
                value: Jan2020F[12]
            }, {
                name: "14-Jan-2020",
                value: Jan2020F[13]
            },
            {
                name: "15-Jan-2020",
                value: Jan2020F[14]
            },
            {
                name: "16-Jan-2020",
                value: Jan2020F[15]
            }, {
                name: "17-Jan-2020",
                value: Jan2020F[16]
            },
            {
                name: "18-Jan-2020",
                value: Jan2020F[17]
            },
            {
                name: "19-Jan-2020",
                value: Jan2020F[18]
            }, {
                name: "20-Jan-2020",
                value: Jan2020F[19]
            },
            {
                name: "21-Jan-2020",
                value: Jan2020F[20]
            },
            {
                name: "22-Jan-2020",
                value: Jan2020F[21]
            }, {
                name: "23-Jan-2020",
                value: Jan2020F[22]
            },
            {
                name: "24-Jan-2020",
                value: Jan2020F[23]
            },
            {
                name: "25-Jan-2020",
                value: Jan2020F[24]
            }, {
                name: "26-Jan-2020",
                value: Jan2020F[25]
            },
            {
                name: "27-Jan-2020",
                value: Jan2020F[26]
            },
            {
                name: "28-Jan-2020",
                value: Jan2020F[27]
            },
            {
                name: "29-Jan-2020",
                value: Jan2020F[28]
            },
            {
                name: "30-Jan-2020",
                value: Jan2020F[29]
            },
            {
                name: "31-Jan-2020",
                value: Jan2020F[30]
            }
            ]
        }, {
            name: 'January 2021 Finished Water Turbidity',
            data: [{
                name: "01-Jan-2021",
                value: Jan2021F[0]
            }, {
                name: "02-Jan-2021",
                value: Jan2021F[1]
            },
            {
                name: "03-Jan-2021",
                value: Jan2021F[2]
            },
            {
                name: "04-Jan-2021",
                value: Jan2021F[3]
            }, {
                name: "05-Jan-2021",
                value: Jan2021F[4]
            },
            {
                name: "06-Jan-2021",
                value: Jan2021F[5]
            },
            {
                name: "07-Jan-2021",
                value: Jan2021F[6]
            }, {
                name: "08-Jan-2021",
                value: Jan2021F[7]
            },
            {
                name: "09-Jan-2021",
                value: Jan2021F[8]
            },
            {
                name: "10-Jan-2021",
                value: Jan2021F[9]
            }, {
                name: "11-Jan-2021",
                value: Jan2021F[10]
            },
            {
                name: "12-Jan-2021",
                value: Jan2021F[11]
            },
            {
                name: "13-Jan-2021",
                value: Jan2021F[12]
            }, {
                name: "14-Jan-2021",
                value: Jan2021F[13]
            },
            {
                name: "15-Jan-2021",
                value: Jan2021F[14]
            },
            {
                name: "16-Jan-2021",
                value: Jan2021F[15]
            }, {
                name: "17-Jan-2021",
                value: Jan2021F[16]
            },
            {
                name: "18-Jan-2021",
                value: Jan2021F[17]
            },
            {
                name: "19-Jan-2021",
                value: Jan2021F[18]
            }, {
                name: "20-Jan-2021",
                value: Jan2021F[19]
            },
            {
                name: "21-Jan-2021",
                value: Jan2021F[20]
            },
            {
                name: "22-Jan-2021",
                value: Jan2021F[21]
            }, {
                name: "23-Jan-2021",
                value: Jan2021F[22]
            },
            {
                name: "24-Jan-2021",
                value: Jan2021F[23]
            },
            {
                name: "25-Jan-2021",
                value: Jan2021F[24]
            }, {
                name: "26-Jan-2021",
                value: Jan2021F[25]
            },
            {
                name: "27-Jan-2021",
                value: Jan2021F[26]
            },
            {
                name: "28-Jan-2021",
                value: Jan2021F[27]
            },
            {
                name: "29-Jan-2021",
                value: Jan2021F[28]
            },
            {
                name: "30-Jan-2021",
                value: Jan2021F[29]
            },
            {
                name: "31-Jan-2021",
                value: Jan2021F[30]
            }]
            }, {
                name: 'January 2019 Horsetooth Raw Water Turbidity',
                data: [{
                    name: "01-Jan-2019",
                    value: Jan2019H[0]
                }, {
                    name: "02-Jan-2019",
                    value: Jan2019H[1]
                },
                {
                    name: "03-Jan-2019",
                    value: Jan2019H[2]
                },
                {
                    name: "04-Jan-2019",
                    value: Jan2019H[3]
                }, {
                    name: "05-Jan-2019",
                    value: Jan2019H[4]
                },
                {
                    name: "06-Jan-2019",
                    value: Jan2019H[5]
                },
                {
                    name: "07-Jan-2019",
                    value: Jan2019H[6]
                }, {
                    name: "08-Jan-2019",
                    value: Jan2019H[7]
                },
                {
                    name: "09-Jan-2019",
                    value: Jan2019H[8]
                },
                {
                    name: "10-Jan-2019",
                    value: Jan2019H[9]
                }, {
                    name: "11-Jan-2019",
                    value: Jan2019H[10]
                },
                {
                    name: "12-Jan-2019",
                    value: Jan2019H[11]
                },
                {
                    name: "13-Jan-2019",
                    value: Jan2019H[12]
                }, {
                    name: "14-Jan-2019",
                    value: Jan2019H[13]
                },
                {
                    name: "15-Jan-2019",
                    value: Jan2019H[14]
                },
                {
                    name: "16-Jan-2019",
                    value: Jan2019H[15]
                }, {
                    name: "17-Jan-2019",
                    value: Jan2019H[16]
                },
                {
                    name: "18-Jan-2019",
                    value: Jan2019H[17]
                },
                {
                    name: "19-Jan-2019",
                    value: Jan2019H[18]
                }, {
                    name: "20-Jan-2019",
                    value: Jan2019H[19]
                },
                {
                    name: "21-Jan-2019",
                    value: Jan2019H[20]
                },
                {
                    name: "22-Jan-2019",
                    value: Jan2019H[21]
                }, {
                    name: "23-Jan-2019",
                    value: Jan2019H[22]
                },
                {
                    name: "24-Jan-2019",
                    value: Jan2019H[23]
                },
                {
                    name: "25-Jan-2019",
                    value: Jan2019H[24]
                }, {
                    name: "26-Jan-2019",
                    value: Jan2019H[25]
                },
                {
                    name: "27-Jan-2019",
                    value: Jan2019H[26]
                },
                {
                    name: "28-Jan-2019",
                    value: Jan2019H[27]
                },
                {
                    name: "29-Jan-2019",
                    value: Jan2019H[28]
                },
                {
                    name: "30-Jan-2019",
                    value: Jan2019H[29]
                },
                {
                    name: "31-Jan-2019",
                    value: Jan2019H[30]
                }
                ]
            }, {
                name: 'January 2020 Horsetooth Raw Water Turbidity',
                data: [{
                    name: "01-Jan-2020",
                    value: Jan2020H[0]
                }, {
                    name: "02-Jan-2020",
                    value: Jan2020H[1]
                },
                {
                    name: "03-Jan-2020",
                    value: Jan2020H[2]
                },
                {
                    name: "04-Jan-2020",
                    value: Jan2020H[3]
                }, {
                    name: "05-Jan-2020",
                    value: Jan2020H[4]
                },
                {
                    name: "06-Jan-2020",
                    value: Jan2020H[5]
                },
                {
                    name: "07-Jan-2020",
                    value: Jan2020H[6]
                }, {
                    name: "08-Jan-2020",
                    value: Jan2020H[7]
                },
                {
                    name: "09-Jan-2020",
                    value: Jan2020H[8]
                },
                {
                    name: "10-Jan-2020",
                    value: Jan2020H[9]
                }, {
                    name: "11-Jan-2020",
                    value: Jan2020H[10]
                },
                {
                    name: "12-Jan-2020",
                    value: Jan2020H[11]
                },
                {
                    name: "13-Jan-2020",
                    value: Jan2020H[12]
                }, {
                    name: "14-Jan-2020",
                    value: Jan2020H[13]
                },
                {
                    name: "15-Jan-2020",
                    value: Jan2020H[14]
                },
                {
                    name: "16-Jan-2020",
                    value: Jan2020H[15]
                }, {
                    name: "17-Jan-2020",
                    value: Jan2020H[16]
                },
                {
                    name: "18-Jan-2020",
                    value: Jan2020H[17]
                },
                {
                    name: "19-Jan-2020",
                    value: Jan2020H[18]
                }, {
                    name: "20-Jan-2020",
                    value: Jan2020H[19]
                },
                {
                    name: "21-Jan-2020",
                    value: Jan2020H[20]
                },
                {
                    name: "22-Jan-2020",
                    value: Jan2020H[21]
                }, {
                    name: "23-Jan-2020",
                    value: Jan2020H[22]
                },
                {
                    name: "24-Jan-2020",
                    value: Jan2020H[23]
                },
                {
                    name: "25-Jan-2020",
                    value: Jan2020H[24]
                }, {
                    name: "26-Jan-2020",
                    value: Jan2020H[25]
                },
                {
                    name: "27-Jan-2020",
                    value: Jan2020H[26]
                },
                {
                    name: "28-Jan-2020",
                    value: Jan2020H[27]
                },
                {
                    name: "29-Jan-2020",
                    value: Jan2020H[28]
                },
                {
                    name: "30-Jan-2020",
                    value: Jan2020H[29]
                },
                {
                    name: "31-Jan-2020",
                    value: Jan2020H[30]
                }
                ]
            }, {
                name: 'January 2021 Horsetooth Raw Water Turbidity',
                data: [{
                    name: "01-Jan-2021",
                    value: Jan2021H[0]
                }, {
                    name: "02-Jan-2021",
                    value: Jan2021H[1]
                },
                {
                    name: "03-Jan-2021",
                    value: Jan2021H[2]
                },
                {
                    name: "04-Jan-2021",
                    value: Jan2021H[3]
                }, {
                    name: "05-Jan-2021",
                    value: Jan2021H[4]
                },
                {
                    name: "06-Jan-2021",
                    value: Jan2021H[5]
                },
                {
                    name: "07-Jan-2021",
                    value: Jan2021H[6]
                }, {
                    name: "08-Jan-2021",
                    value: Jan2021H[7]
                },
                {
                    name: "09-Jan-2021",
                    value: Jan2021H[8]
                },
                {
                    name: "10-Jan-2021",
                    value: Jan2021H[9]
                }, {
                    name: "11-Jan-2021",
                    value: Jan2021H[10]
                },
                {
                    name: "12-Jan-2021",
                    value: Jan2021H[11]
                },
                {
                    name: "13-Jan-2021",
                    value: Jan2021H[12]
                }, {
                    name: "14-Jan-2021",
                    value: Jan2021H[13]
                },
                {
                    name: "15-Jan-2021",
                    value: Jan2021H[14]
                },
                {
                    name: "16-Jan-2021",
                    value: Jan2021H[15]
                }, {
                    name: "17-Jan-2021",
                    value: Jan2021H[16]
                },
                {
                    name: "18-Jan-2021",
                    value: Jan2021H[17]
                },
                {
                    name: "19-Jan-2021",
                    value: Jan2021H[18]
                }, {
                    name: "20-Jan-2021",
                    value: Jan2021H[19]
                },
                {
                    name: "21-Jan-2021",
                    value: Jan2021H[20]
                },
                {
                    name: "22-Jan-2021",
                    value: Jan2021H[21]
                }, {
                    name: "23-Jan-2021",
                    value: Jan2021H[22]
                },
                {
                    name: "24-Jan-2021",
                    value: Jan2021H[23]
                },
                {
                    name: "25-Jan-2021",
                    value: Jan2021H[24]
                }, {
                    name: "26-Jan-2021",
                    value: Jan2021H[25]
                },
                {
                    name: "27-Jan-2021",
                    value: Jan2021H[26]
                },
                {
                    name: "28-Jan-2021",
                    value: Jan2021H[27]
                },
                {
                    name: "29-Jan-2021",
                    value: Jan2021H[28]
                },
                {
                    name: "30-Jan-2021",
                    value: Jan2021H[29]
                },
                {
                    name: "31-Jan-2021",
                    value: Jan2021H[30]
                }]            
                }, {
                    name: 'January 2019 Poudre Raw Water Turbidity',
                    data: [{
                        name: "01-Jan-2019",
                        value: Jan2019P[0]
                    }, {
                        name: "02-Jan-2019",
                        value: Jan2019P[1]
                    },
                    {
                        name: "03-Jan-2019",
                        value: Jan2019P[2]
                    },
                    {
                        name: "04-Jan-2019",
                        value: Jan2019P[3]
                    }, {
                        name: "05-Jan-2019",
                        value: Jan2019P[4]
                    },
                    {
                        name: "06-Jan-2019",
                        value: Jan2019P[5]
                    },
                    {
                        name: "07-Jan-2019",
                        value: Jan2019P[6]
                    }, {
                        name: "08-Jan-2019",
                        value: Jan2019P[7]
                    },
                    {
                        name: "09-Jan-2019",
                        value: Jan2019P[8]
                    },
                    {
                        name: "10-Jan-2019",
                        value: Jan2019P[9]
                    }, {
                        name: "11-Jan-2019",
                        value: Jan2019P[10]
                    },
                    {
                        name: "12-Jan-2019",
                        value: Jan2019P[11]
                    },
                    {
                        name: "13-Jan-2019",
                        value: Jan2019P[12]
                    }, {
                        name: "14-Jan-2019",
                        value: Jan2019P[13]
                    },
                    {
                        name: "15-Jan-2019",
                        value: Jan2019P[14]
                    },
                    {
                        name: "16-Jan-2019",
                        value: Jan2019P[15]
                    }, {
                        name: "17-Jan-2019",
                        value: Jan2019P[16]
                    },
                    {
                        name: "18-Jan-2019",
                        value: Jan2019P[17]
                    },
                    {
                        name: "19-Jan-2019",
                        value: Jan2019P[18]
                    }, {
                        name: "20-Jan-2019",
                        value: Jan2019P[19]
                    },
                    {
                        name: "21-Jan-2019",
                        value: Jan2019P[20]
                    },
                    {
                        name: "22-Jan-2019",
                        value: Jan2019P[21]
                    }, {
                        name: "23-Jan-2019",
                        value: Jan2019P[22]
                    },
                    {
                        name: "24-Jan-2019",
                        value: Jan2019P[23]
                    },
                    {
                        name: "25-Jan-2019",
                        value: Jan2019P[24]
                    }, {
                        name: "26-Jan-2019",
                        value: Jan2019P[25]
                    },
                    {
                        name: "27-Jan-2019",
                        value: Jan2019P[26]
                    },
                    {
                        name: "28-Jan-2019",
                        value: Jan2019P[27]
                    },
                    {
                        name: "29-Jan-2019",
                        value: Jan2019P[28]
                    },
                    {
                        name: "30-Jan-2019",
                        value: Jan2019P[29]
                    },
                    {
                        name: "31-Jan-2019",
                        value: Jan2019P[30]
                    }
                    ]
                }, {
                    name: 'January 2020 Poudre Raw Water Turbidity',
                    data: [{
                        name: "01-Jan-2020",
                        value: Jan2020P[0]
                    }, {
                        name: "02-Jan-2020",
                        value: Jan2020P[1]
                    },
                    {
                        name: "03-Jan-2020",
                        value: Jan2020P[2]
                    },
                    {
                        name: "04-Jan-2020",
                        value: Jan2020P[3]
                    }, {
                        name: "05-Jan-2020",
                        value: Jan2020P[4]
                    },
                    {
                        name: "06-Jan-2020",
                        value: Jan2020P[5]
                    },
                    {
                        name: "07-Jan-2020",
                        value: Jan2020P[6]
                    }, {
                        name: "08-Jan-2020",
                        value: Jan2020P[7]
                    },
                    {
                        name: "09-Jan-2020",
                        value: Jan2020P[8]
                    },
                    {
                        name: "10-Jan-2020",
                        value: Jan2020P[9]
                    }, {
                        name: "11-Jan-2020",
                        value: Jan2020P[10]
                    },
                    {
                        name: "12-Jan-2020",
                        value: Jan2020P[11]
                    },
                    {
                        name: "13-Jan-2020",
                        value: Jan2020P[12]
                    }, {
                        name: "14-Jan-2020",
                        value: Jan2020P[13]
                    },
                    {
                        name: "15-Jan-2020",
                        value: Jan2020P[14]
                    },
                    {
                        name: "16-Jan-2020",
                        value: Jan2020P[15]
                    }, {
                        name: "17-Jan-2020",
                        value: Jan2020P[16]
                    },
                    {
                        name: "18-Jan-2020",
                        value: Jan2020P[17]
                    },
                    {
                        name: "19-Jan-2020",
                        value: Jan2020P[18]
                    }, {
                        name: "20-Jan-2020",
                        value: Jan2020P[19]
                    },
                    {
                        name: "21-Jan-2020",
                        value: Jan2020P[20]
                    },
                    {
                        name: "22-Jan-2020",
                        value: Jan2020P[21]
                    }, {
                        name: "23-Jan-2020",
                        value: Jan2020P[22]
                    },
                    {
                        name: "24-Jan-2020",
                        value: Jan2020P[23]
                    },
                    {
                        name: "25-Jan-2020",
                        value: Jan2020P[24]
                    }, {
                        name: "26-Jan-2020",
                        value: Jan2020P[25]
                    },
                    {
                        name: "27-Jan-2020",
                        value: Jan2020P[26]
                    },
                    {
                        name: "28-Jan-2020",
                        value: Jan2020P[27]
                    },
                    {
                        name: "29-Jan-2020",
                        value: Jan2020P[28]
                    },
                    {
                        name: "30-Jan-2020",
                        value: Jan2020P[29]
                    },
                    {
                        name: "31-Jan-2020",
                        value: Jan2020P[30]
                    }
                    ]
                }, {
                    name: 'January 2021 Poudre Raw Water Turbidity',
                    data: [{
                        name: "01-Jan-2021",
                        value: Jan2021P[0]
                    }, {
                        name: "02-Jan-2021",
                        value: Jan2021P[1]
                    },
                    {
                        name: "03-Jan-2021",
                        value: Jan2021P[2]
                    },
                    {
                        name: "04-Jan-2021",
                        value: Jan2021P[3]
                    }, {
                        name: "05-Jan-2021",
                        value: Jan2021P[4]
                    },
                    {
                        name: "06-Jan-2021",
                        value: Jan2021P[5]
                    },
                    {
                        name: "07-Jan-2021",
                        value: Jan2021P[6]
                    }, {
                        name: "08-Jan-2021",
                        value: Jan2021P[7]
                    },
                    {
                        name: "09-Jan-2021",
                        value: Jan2021P[8]
                    },
                    {
                        name: "10-Jan-2021",
                        value: Jan2021P[9]
                    }, {
                        name: "11-Jan-2021",
                        value: Jan2021P[10]
                    },
                    {
                        name: "12-Jan-2021",
                        value: Jan2021P[11]
                    },
                    {
                        name: "13-Jan-2021",
                        value: Jan2021P[12]
                    }, {
                        name: "14-Jan-2021",
                        value: Jan2021P[13]
                    },
                    {
                        name: "15-Jan-2021",
                        value: Jan2021P[14]
                    },
                    {
                        name: "16-Jan-2021",
                        value: Jan2021P[15]
                    }, {
                        name: "17-Jan-2021",
                        value: Jan2021P[16]
                    },
                    {
                        name: "18-Jan-2021",
                        value: Jan2021P[17]
                    },
                    {
                        name: "19-Jan-2021",
                        value: Jan2021P[18]
                    }, {
                        name: "20-Jan-2021",
                        value: Jan2021P[19]
                    },
                    {
                        name: "21-Jan-2021",
                        value: Jan2021P[20]
                    },
                    {
                        name: "22-Jan-2021",
                        value: Jan2021P[21]
                    }, {
                        name: "23-Jan-2021",
                        value: Jan2021P[22]
                    },
                    {
                        name: "24-Jan-2021",
                        value: Jan2021P[23]
                    },
                    {
                        name: "25-Jan-2021",
                        value: Jan2021P[24]
                    }, {
                        name: "26-Jan-2021",
                        value: Jan2021P[25]
                    },
                    {
                        name: "27-Jan-2021",
                        value: Jan2021P[26]
                    },
                    {
                        name: "28-Jan-2021",
                        value: Jan2021P[27]
                    },
                    {
                        name: "29-Jan-2021",
                        value: Jan2021P[28]
                    },
                    {
                        name: "30-Jan-2021",
                        value: Jan2021P[29]
                    },
                    {
                        name: "31-Jan-2021",
                        value: Jan2021P[30]
                    }]
        }]
        }
    );

})};
getWaterData();
