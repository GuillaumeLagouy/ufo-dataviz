import * as d3 from "d3";
import {EventManager} from "./tools/EventManager";

function loadData(){
    d3.csv("./data/clean_ufo.csv")
        .then(data => {
            data.forEach(function(d){
                d.latitude = +d.latitude;
                d.longitude = +d.longitude;
                let date = new Date(d.date);
                d.year = date.getFullYear();
                d.day = date.getUTCDate();
                d.month = date.getUTCMonth() + 1;
            });
            console.log("ufo loaded");
            EventManager.dispatchEvent(new CustomEvent("UFO::UfoDataReady", {detail: data}))
        });

    d3.csv("./data/clean_airport.csv")
        .then(data =>{
            console.log("airport loaded");
            EventManager.dispatchEvent(new CustomEvent("UFO::AirportDataReady", {detail: data}))
        });
}

export {loadData};


