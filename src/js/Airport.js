import {EventManager} from "./tools/EventManager";
import * as d3 from "d3";

const Airport = {
    init(){
        EventManager.addEventListener("UFO::AirportDataReady", (data) => this.displayAirport(data))
    },

    displayAirport(data){
        const projection = d3.geoMercator().scale(550).translate([1650, 620]);

        let observations = d3.select("#usaMap")
            .selectAll("g")
            .data(data.detail)
            .enter()
            .append("g")
            .attr("class", "airport")
            .attr("transform", function(d){
                return "translate("+ projection([d.longitude, d.latitude]) +")";
            });

        observations.append("circle")
            .attr("r", 0)
            .attr("fill", "#F98F23")
            .attr("opacity", 0.8);

        EventManager.addEventListener("UFO::Zoom", () => {})
    }
};
export  {Airport}
