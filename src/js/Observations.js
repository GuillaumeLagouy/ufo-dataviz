import * as d3 from "d3";
import {EventManager} from "./tools/EventManager";
import {dictonaryState} from "./tools/listUsaStates";
import {loadData} from "./loadData";
import {Airport} from "./Airport";

const Observations = {
    init(){
        loadData();
        EventManager.addEventListener("UFO::UfoDataReady", (data) => {
            this.displayAllObs(data, null);
            EventManager.addEventListener("UFO::Zoom", (state)=> {this.displayObsByState(data, state.detail)});
            EventManager.addEventListener("UFO::Dezoom", ()=> {this.displayAllObs(data, null)});
            EventManager.addEventListener("UFO::YearChange", (year) => {
                this.displayAllObs(data, year)
            });
        });
    },

    displayAllObs(data, year){
        this.deleteObs();

        const projection = d3.geoMercator().scale(550).translate([1650, 620]);
        const path = d3.geoPath().projection(projection);
        const obsByYear = d3.nest()
            .key(function(d){ return d.year})
            .entries(data.detail);

        if(year === undefined || year === null){
            console.log("tout afficher");
            const obsByState = d3.nest()
                .key(function(d){ return d.state})
                .entries(data.detail);


            obsByState.forEach( value => {
                if(dictonaryState[value.key] !== undefined){
                    d3.select("#" + dictonaryState[value.key]).select(function(){
                        return this.parentNode;
                    }).append("circle")
                        .attr("r", function(){
                            return value.values.length/100;
                        })
                        .attr("cx", function(d){ return path.centroid(d)[0]; })
                        .attr("cy", function(d){ return path.centroid(d)[1]; })
                        .attr("fill", "#00FFF5")
                        .attr("opacity", 0.5)
                        .attr("class", "observation")
                        .attr("cursor", "pointer")
                        .on("mouseover", function(d){
                            const observations = {state: d.properties.NAME, nbObs: value.values.length};
                            d3.select(this).attr("opacity", 0.8);
                            EventManager.dispatchEvent(new CustomEvent("UFO::HoverStateObs", {detail: observations}));
                        })
                        .on("mouseout", function(d){
                            d3.select(this).attr("opacity", 0.5);
                        })
                    ;
                }
            });
        } else {
            const nbObs = data.detail.length;

            obsByYear.forEach(data=>{
                if(data.key === year.detail){
                    const obsByState = d3.nest()
                        .key(function(d){ return d.state})
                        .entries(data.values);

                    obsByState.forEach( value => {
                        if (dictonaryState[value.key] === undefined) {return ;}
                        d3.select("#" + dictonaryState[value.key]).select(function () {
                            return this.parentNode;
                        }).append("circle")
                            .attr("r", function () {
                                return (value.values.length/5);
                            })
                            .attr("cx", function (d) {
                                return path.centroid(d)[0];
                            })
                            .attr("cy", function (d) {
                                return path.centroid(d)[1];
                            })
                            .attr("fill", "#00FFF5")
                            .attr("opacity", 0.5)
                            .attr("class", "observation")
                            .on("mouseover", function (d) {
                                const observations = {state: d.properties.NAME, nbObs: value.values.length};
                                EventManager.dispatchEvent(new CustomEvent("UFO::HoverStateObs", {detail: observations}));
                            })
                        ;
                    })
                }
            });
        }

        document.querySelector("#map_stateinfo").style.display = "inline";
        document.querySelector("#map_obsinfo").style.display = "none";
        document.querySelector("#map_controllers").style.display = "flex";
    },

    displayObsByState(data, state){
        const projection = d3.geoMercator().scale(550).translate([1650, 620]);

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
            })
            .on("mouseover", function(d){
                EventManager.dispatchEvent(new CustomEvent("UFO::HoverObs", {detail: d}))
            })
        ;

        obsOfArea.append("circle")
            .attr("r", 0.7)
            .attr("fill", "#00FFF5")
            .on("mouseover", function(d){
                d3.select(this).attr("r", 4);
            })
            .on("mouseout", function(d){
                d3.select(this).attr("r", 0.7);
            })
        ;

        document.querySelector("#map_stateinfo").style.display = "none";
        document.querySelector("#map_controllers").style.display = "none";
        document.querySelector("#map_obsinfo").style.display = "inline";


    },

    deleteObs(){
        const obs = d3.selectAll(".observation").remove();
    }
};
export default Observations;
