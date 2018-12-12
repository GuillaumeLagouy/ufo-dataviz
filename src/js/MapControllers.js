import {EventManager} from "./tools/EventManager";
import {Airport} from "./Airport";
import * as d3 from "d3";

const MapControllers = {
    info: document.querySelector("#hover_info"),
    airport: document.querySelector("#plane-activate"),

    init(){
        EventManager.addEventListener("UFO::HoverStateObs", (data) => {this.displayInfoState(data)});
        EventManager.addEventListener("UFO::HoverObs", (data) => {this.displayInfoObs(data)});
        this.airport.addEventListener("click", () =>{

            if(this.airport.classList.contains("check")){
                this.airport.classList.remove("check")
            } else {
                this.airport.classList.add("check");
            }
            this.displayAirport()
        });
        this.displayByYear();
    },

    displayInfoState(data){
        const state = document.querySelector("#state span");
        const nbObs = document.querySelector("#nbObs");

        state.innerHTML = data.detail.state;
        nbObs.innerHTML = data.detail.nbObs;
    },

    displayInfoObs(data){
        const date = document.querySelector("#obs_date span");
        const duration = document.querySelector("#obs_duration span");
        const city = document.querySelector("#obs_city span");
        const commentary = document.querySelector("#map_commentary span");

        date.innerHTML = data.detail.date;
        duration.innerHTML= data.detail.duration_s + "s";
        city.innerHTML = data.detail.city;
        commentary.innerHTML = data.detail.observation;
    },

    displayAirport(){
        const visible = d3.selectAll(".airport circle.visible");
        const airport = d3.selectAll(".airport circle");

        if(visible._groups[0].length === 0){
            airport.attr("r", 1);
            airport.classed("visible", true);
        } else {
            airport.attr("r", 0).classed("visible", false);
        }
    },

    displayByYear(){
        const slider = document.querySelector("#slider");
        const slidervalue = document.querySelector("#slider_date");
        slider.addEventListener("change", () => {
            slidervalue.innerHTML = slider.value;
            EventManager.dispatchEvent(new CustomEvent("UFO::YearChange", {detail: slider.value}));
        })
    },
};
export default MapControllers;
