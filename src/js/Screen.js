import {Barchart} from "./displayBarchart";

const Screen = {
    mode: "map",
    text: [
        {selector: "btnMap", title: "Carte :", desc: "En actionnant ce bouton vous visualiserez toutes les observations d'OVNIS sur la carte des Etats-Unis."},
        {selector: "btnBarchart", title: "Graphique :", desc: "En actionnant ce bouton vous pourrez comparez les observations dans le temps"},
        {selector: "play", title: "Chronologie :", desc: "Visualisez les apparitions d'OVNIs au fil des années"},
        {selector: "btnPlane", title: "Aéroports :", desc: "Observez la position des aéroports des Etats-Unis"},
        {selector: "btnYear",title: "Calendrier :", desc: "Précise ta recherche en sélectionnant une date"},
        {selector: "btnLight", title: "Lumières :", desc: "Allumez ou éteignez les lumières du vaisseau"},
        {selector: "btnIncreasing", title: "Triez les données !", desc: "Classez par ordre croissant les années d'apparitions des OVNIs"},
        {selector: "btnDecreasing", title: "Triez les données !", desc: "Classez par ordre décroissant les années d'apparitions des OVNIs"},
        {selector: "btnChrono", title: "Triez les données !", desc: "Classez par ordre chronologique les années d'apparitions des OVNIs"},
    ],

    init(){
        const screen = document.querySelector("#screen");
        screen.style.transform = "scale(0.45)";
        const controllers = document.querySelectorAll(".controller");
        controllers.forEach(element => {
            element.addEventListener("mouseenter", (e)=>{this.displayInfo(e)})
        });
        this.displayMode();

    },

    displayInfo(e){
        let oldInfoText = document.querySelector("#infoText");
        if(oldInfoText !== null){
            oldInfoText.parentNode.removeChild(oldInfoText);
        }

        const infoScreen = document.querySelector("#infoScreen");
        let topIS = infoScreen.getBoundingClientRect().top;
        let leftIS = infoScreen.getBoundingClientRect().left;
        let widthIS = infoScreen.getBoundingClientRect().width;
        const infoText = document.createElement("div");

        let elementId = e.target.id;
        let elementInfo = this.text.find(item => item.selector === elementId);
        infoText.innerHTML = `
            <h1>${elementInfo.title}</h1>
            <p>${elementInfo.desc}</p>
        `;
        infoText.id = "infoText";
        infoText.style.width = widthIS + "px";
        infoText.style.top = topIS + "px";
        infoText.style.left = leftIS + "px";

        document.querySelector("#spaceship .wrapper").appendChild(infoText);
    },

    displayMode(){
        const modeController = document.querySelectorAll(".modeController");
        const mapControllers = document.querySelector("#mapControllers");
        const barchartControllers = document.querySelector("#barchartControllers");
        const usaMap = document.querySelector("#usaMap");

        modeController.forEach(mode => {
            mode.addEventListener("click", (e) => {
                if(e.target.parentNode.id === "btnMap"){
                    barchartControllers.style.display = "none";
                    mapControllers.style.display = "block";
                    usaMap.style.display = "block";
                } else {
                    mapControllers.style.display = "none";
                    barchartControllers.style.display = "block";
                    usaMap.style.display = "none";
                    Barchart.init();
                }
            })
        })
    }
};
export default Screen;
