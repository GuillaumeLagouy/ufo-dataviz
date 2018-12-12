import fullpage from 'fullpage.js';
import inlineSVG from 'inline-svg';
import {displayMap} from './displayMap';
import Screen from './Screen';
import {Barchart} from "./displayBarchart";
import MapControllers from "./MapControllers";

// INIT
new fullpage('#fullpage');
inlineSVG.init();
displayMap();
Barchart.init();
MapControllers.init();

const btnAbout = document.getElementById("about");
btnAbout.addEventListener("click", ()=>{
    if (btnAbout.classList.contains("active")){
        document.getElementById("about-section").style.display = "none";
        btnAbout.classList.remove("active")
    } else {
        document.getElementById("about-section").style.display = "inline";
        btnAbout.classList.add("active")
    }
});


