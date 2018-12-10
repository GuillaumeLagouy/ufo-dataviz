import fullpage from 'fullpage.js';
import inlineSVG from 'inline-svg';
import {displayMap} from './displayMap';
import Screen from './Screen';
import {Barchart} from "./displayBarchart";

// INIT
new fullpage('#fullpage');
inlineSVG.init();
displayMap();
Barchart.init();

setTimeout(()=>{
    Screen.init();
}, 400);

