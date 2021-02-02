let music = loadMusic("h");

let effect = new Effect(Infinity, e => {
    Draw.z(Layer.weather);
    Draw.color(Color.red.cpy().shiftHue(Time.time * 8));
    Fill.poly(Vars.player.x, Vars.player.y, 4, 99999, 0);
});

let blocks = Seq.with();

Category.all.forEach(e => {
    let strobe = extend(Block, "strobe-lights-" + e, {
        size: 1,
        destructible: true,
        buildVisibility: BuildVisibility.shown,
        category: Category[e],
        icons(){
            return[Core.atlas.find("strobe-lights")];
        }
    });
    
    strobe.buildType = () => extend(Building, {
        placed(){
            music.setLooping(true);
            music.play();
            music.setVolume(1);
            Vars.ui.hudGroup.clearChildren();
            Core.graphics.setFullscreenMode(Core.graphics.getDisplayMode());
            effect.at(Vars.player.x, Vars.player.y);
            blocks.each(e => e.buildVisibility = BuildVisibility.hidden);
            Events.run(Trigger.update, () => {
                if(Core.scene.dialog) Core.scene.dialog.hide();
            });
        }
    });
    
    blocks.add(strobe);
});

blocks.each(e => {
    e.name = this.modName + "-strobe-lights";
    e.localizedName = "Strobe Lights";
});

Events.on(ClientLoadEvent, () => {
    Vars.content.blocks().each(e => e.buildVisibility = BuildVisibility.hidden);
    blocks.each(e => e.buildVisibility = BuildVisibility.shown);
});
