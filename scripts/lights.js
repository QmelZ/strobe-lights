module.exports = () => {
    var buffer, shader;

    const beginDraw = () => {
        buffer.resize(Core.graphics.width, Core.graphics.height);
        buffer.begin(Color.clear);
    };

    const endDraw = () => {
        buffer.end();

        shader.bind();
        shader.setUniformf("u_time", Time.globalTime / 10);

        Draw.blend(Blending.additive);
        Draw.blit(buffer, shader);
    };

    buffer = new FrameBuffer(Core.graphics.width, Core.graphics.height);
    shader = new Shader(readString("shaders/screenspace.vert"), readString("shaders/lights.frag"));


    beginDraw();

    Events.run(Trigger.uiDrawEnd, endDraw);
}
