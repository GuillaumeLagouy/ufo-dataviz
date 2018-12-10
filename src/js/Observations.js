import * as d3 from "d3";
import {EventManager} from "./tools/EventManager";
import {dictonaryState} from "./tools/listUsaStates";
import {loadData} from "./loadData";

const Observations = {
    init(){
        loadData();
        EventManager.addEventListener("UFO::DataReady", (data) => {
            this.displayAllObs(data);
            EventManager.addEventListener("UFO::Zoom", (state)=> {this.displayObsByState(data, state.detail)});
            EventManager.addEventListener("UFO::Dezoom", ()=> {this.displayAllObs(data)});
        });
    },

    displayAllObs(data){
        const projection = d3.geoMercator().scale(550).translate([1400, 600]);
        const path = d3.geoPath().projection(projection);

        let obsByState = d3.nest()
            .key(function(d){ return d.state})
            .entries(data.detail);

        let total = 53508;

        obsByState.forEach( value => {
            if(dictonaryState[value.key] !== undefined){
                d3.select("#" + dictonaryState[value.key]).select(function(){
                    return this.parentNode;
                }).append("circle")
                    .attr("r", function(){
                        return ((value.values.length * 100)/total) * 3;
                    })
                    .attr("cx", function(d){ return path.centroid(d)[0]; })
                    .attr("cy", function(d){ return path.centroid(d)[1]; })
                    .attr("fill", "rgba(0, 249, 47, 0.7)")
                    .attr("class", "observation");
            }
        });
    },

    displayObsByState(data, state){
        const projection = d3.geoMercator().scale(550).translate([1400, 600]);

        let obsByState = d3.nest()
            .key(function(d){ return d.state})
            .entries(data.detail);

        const stateName = state.properties.NAME.replace(/\s/g, '');

        let stateKey = Object.keys(dictonaryState).find(key => dictonaryState[key] === stateName);
        let dataset;
        obsByState.forEach(element => {
            if(element.key === stateKey){
                dataset = element.values;
            }
        });

        let obsOfArea = d3.select("#" + stateName).select(function(){
            return this.parentNode;}).selectAll("g")
            .data(dataset)
            .enter()
            .append("g")
            .attr("class", "observation")
            .attr("transform", function(d){
                return "translate("+ projection([d.longitude, d.latitude]) +")";
            });

        obsOfArea.append("circle")
            .attr("r", 0.7)
            .attr("fill", "rgba(0, 249, 47, 0.7)");

    }
};
export default Observations;
