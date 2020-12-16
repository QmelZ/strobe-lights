var lights = require("lights");
const music = loadMusic("h");

const strobe = extend(Block, "strobe-lights", {
    icons(){
        return[Core.atlas.find("strobe-lights")];
    }
});
strobe.size = 1;
strobe.destructible = true;
strobe.buildVisibility = BuildVisibility.shown;
strobe.buildType = () => extend(Building, {
    placed(){
        lights();
        music.setLooping(true);
        music.play();
        music.setVolume(10);
    }
});
