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


