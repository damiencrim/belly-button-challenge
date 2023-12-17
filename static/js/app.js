
//  Set up URL for data import as a constant
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});
// Set up variables and pull data from JSON for plotting
var samples;
var meta_data;

// Use D3 to select data and populate menu
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

function optionChanged(value) {
    const idSelection = samples.find((item) => item.id === value);
    const demoInfo = meta_data.find((item) => item.id == value);

    // Insert Demographic Data
    metaData(demoInfo);

    // Bar Chart
    hbarChart(idSelection);

    // Bubble Chart
    bubbleChart(idSelection);

}

function metaData(demoInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${demoInfo.id} <br> 
      ethnicity: ${demoInfo.ethnicity} <br>
    gender: ${demoInfo.gender} <br>
    age: ${demoInfo.age} <br>
    location: ${demoInfo.location} <br>
    bbtype: ${demoInfo.bbtype} <br>
    wfreq: ${demoInfo.wfreq}`
    );
}
// Format Charts for Display
function hbarChart(idSelection) {
    let x_axis = idSelection.sample_values.slice(0, 10).reverse();
    let y_axis = idSelection.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = idSelection.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };

    Plotly.newPlot("bar", chart, layout);
}

function bubbleChart(idSelection) {
    let x_axis = idSelection.otu_ids;
    let y_axis = idSelection.sample_values;
    let marker_size = idSelection.sample_values;
    let color = idSelection.otu_ids;
    let text = idSelection.otu_labels;

    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Bluered",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID'S" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);
}