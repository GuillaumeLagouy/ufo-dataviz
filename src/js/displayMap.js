import * as d3 from "d3";
import Observations from "./Observations"
import {EventManager} from "./tools/EventManager";
import {Airport} from "./Airport";

const projection = d3.geoMercator().scale(550).translate([1650, 620]);
const path = d3.geoPath().projection(projection);
const canvas = d3.select("#map_container").append("svg")
    .attr("width", 750)
    .attr("height", 400)
    .attr("id", "usaMap");

canvas.append("rect")
    .attr("class", "background")
    .attr("width", 1000)
    .attr("height", 800)
    .attr("fill", "transparent")
    .attr("cursor", "pointer")
    .on("click", zoomed);

let areas, group;

function displayMap() {
    d3.json("./mapjson/geojson_USA.json")
        .then(data => {
            group = canvas.selectAll("g")
                .data(data.features)
                .enter()
                .append("g");

            areas = group.append("path")
                .attr("d", path)
                .attr("class", "area")
                .attr("id", function(d){
                    let state = d.properties.NAME;
                    let stateF = state.replace(/\s/g,'');
                    return stateF;
                })
                .attr("cursor", "pointer")
                .attr("fill", "transparent")
                .attr("stroke", "#00FFF5")
                .attr("stroke-width", 1.5)
                .attr("stroke-opacity", 0.5)
                .on('click', zoomed)
                .on("mouseover", function(){
                    d3.select(this)
                        .attr("fill", "rgba(172,171,255, 0.3)");
                })
                .on("mouseout", function(){
                    d3.select(this)
                        .attr("fill", "transparent");
                });

            Observations.init();
            Airport.init()
        })
}
export {displayMap};

function zoomed(d) {
    let x, y, k, centered;
    const width = 820, height= 500;
    if (d && centered !== d) {
        let centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 2.5;
        centered = d;
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }

    group.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");

    //Delete all observations
    let observations = document.getElementsByClassName("observation");
    Array.from(observations).map(item => {
        item.parentNode.removeChild(item);
    });

    if(d !== undefined){
        EventManager.dispatchEvent(new CustomEvent("UFO::Zoom", {detail: d}));
    }else{
        EventManager.dispatchEvent(new CustomEvent("UFO::Dezoom"));
    }
}
