import {EventManager} from "./tools/EventManager";
import {loadData} from "./loadData";
import * as d3 from "d3";
import bb from "billboard.js"

const Barchart = {
    init(){
        loadData();
        EventManager.addEventListener("UFO::DataReady", (data) => this.displayBarchart(data));
    },

    displayBarchart(data){
        let obsByYear = d3.nest()
            .key(function(d){ return d.year})
            .entries(data.detail);


        const x = [];
        const datas = ['Nombre'];

        obsByYear.forEach(element => {
            let obs = {year: element.key, nbObs: element.values.length};
            x.push(element.key);
            datas.push(element.values.length);
        });

        console.log(x);


        let chart = bb.generate({
            data: {
                columns: [
                    datas,
                ],
                type: "bar"
            },
            bar: {
                width: {
                    ratio: 0.5
                }
            },
            axis: {
                x: {type: "category", categories: x}
            },
            bindto: "#barchart"
        });
    }
};

export {Barchart};
