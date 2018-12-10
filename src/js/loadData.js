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
            console.log("load");
            EventManager.dispatchEvent(new CustomEvent("UFO::DataReady", {detail: data}))
        })
}

export {loadData};


