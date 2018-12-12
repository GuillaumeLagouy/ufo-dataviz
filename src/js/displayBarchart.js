import {EventManager} from "./tools/EventManager";
import {loadData} from "./loadData";
import * as d3 from "d3";
import bb from "billboard.js"

const Barchart = {
    init(){
        EventManager.addEventListener("UFO::UfoDataReady", (data) => {

            let obsByYear = d3.nest()
                .key(function(d){ return d.year})
                .entries(data.detail);

            this.sortByYear(obsByYear);

            document.querySelectorAll('.btnBarchart').forEach(element => {
                element.addEventListener("click", ()=>{
                    if(element.id === "btnChrono"){this.sortByYear(obsByYear)}
                    else if(element.id === "btnIncreasing"){this.sortByOrdrer(obsByYear, 1)}
                    else{this.sortByOrdrer(obsByYear, -1)}
                })
             });
        })
    },

    displayBarchart(data){
        const x = [];
        const datas = ['Nombre d\'observation : '];

        data = data.slice(data.findIndex(el => el.key === "1980"));

        data.forEach(element => {
            x.push(element.key);
            datas.push(element.values.length);
        });

        let chart = bb.generate({
            data: {
                columns: [datas],
                type: "bar",
            },
            bar: {
                width: {ratio: 0.5}
            },
            axis: {
                x: {type: "category",
                    categories: x,
                    tick: {
                        width: 50,
                        values: datas.map((item, index)=> index%6===0 ? index : '' ),
                    }
                }
            },
            legend: {
                show: false
            },
            bindto: "#barchart",
            color: {
                pattern: ["#ACABFF", "#bf00ff"],

            }
        });
    },

    sortByYear(datas){
        datas.sort((a,b) => a.key - b.key);
        this.displayBarchart(datas);
    },

    sortByOrdrer(datas, order){
        if([-1, 1].includes(order)){
            const asc = order === 1;
            datas.sort((a, b) => asc ? a.values.length - b.values.length : b.values.length - a.values.length);
        }
        this.displayBarchart(datas);
    }
};

export {Barchart};
