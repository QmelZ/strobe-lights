let music = loadMusic("h");

let strobe = extend(Block, "strobe-lights", {
    size: 1,
    destructible: true,
    buildVisibility: BuildVisibility.shown,
    category: Category.effect,
    expanded: true,
    icons(){
        return[Core.atlas.find("strobe-lights")];
    }
});

let effect = new Effect(Infinity, e => {
    Draw.z(Layer.weather);
    Draw.color(Color.red.cpy().shiftHue(Time.time * 8));
    Fill.poly(Vars.player.x, Vars.player.y, 4, 99999, 0);
});

strobe.buildType = () => extend(Building, {
    placed(){
        music.setLooping(true);
        music.play();
        music.setVolume(1);
        Vars.ui.hudGroup.clearChildren();
        Core.graphics.setFullscreenMode(Core.graphics.getDisplayMode());
        effect.at(Vars.player.x, Vars.player.y);
        this.block.buildVisibility = BuildVisibility.hidden;
        Events.run(Trigger.update, () => {
            if(Core.scene.dialog) Core.scene.dialog.hide();
        });
    }
});
