AFRAME.registerComponent("rect-corners", {
    schema: {
        width: {type: "number", default: 1},
        height: {type: "number", default: 1},
        radius: {type: "number", default: 0.3},
        color: {type: "color", default: "green"},
        opacity: {type: "number", default: 1}
    },
    init: function () {
        this.rect = new THREE.Mesh( this.draw(), new THREE.MeshPhongMaterial( { color: new THREE.Color(this.data.color), side: THREE.DoubleSide } ) );
        this.updateOpacity();
        this.el.setObject3D("mesh", this.rect)
    },
    update: function () {
        if (this.rect) {
            this.rect.visible = true;
            this.rect.geometry = this.draw();
            this.rect.material.color = new THREE.Color(this.data.color);
            this.updateOpacity();
        }
    },
    updateOpacity: function() {
        if (this.data.opacity < 0) { this.data.opacity = 0; }
        if (this.data.opacity > 1) { this.data.opacity = 1; }
        if (this.data.opacity < 1) {
            this.rect.material.transparent = true;
        } else {
            this.rect.material.transparent = false;
        }
        this.rect.material.opacity = this.data.opacity;
    },
    tick: function () {},
    remove: function () {
        if (!this.rect) { return; }
        this.el.object3D.remove( this.rect );
        this.rect = null;
    },
    draw: function() {
        var rect = new THREE.Shape();
        function rectCorner( ctx, x, y, width, height, radius) {
            ctx.moveTo( x, y + radius );
            ctx.lineTo( x, y + height - radius );
            ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
            ctx.lineTo( x + width - radius, y + height );
            ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
            ctx.lineTo( x + width, y + radius );
            ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
            ctx.lineTo( x + radius, y );
            ctx.quadraticCurveTo( x, y, x, y + radius );
        }

        rectCorner( rect, 0, 0, this.data.width, this.data.height, this.data.radius );
        return new THREE.ShapeBufferGeometry( rect );
    },
    pause: function () {},
    play: function () {}
});

AFRAME.registerPrimitive("a-rect-corners", {
    defaultComponents: {
        "rect-corners": {}
    },
    mappings: {
        width: "rect-corners.width",
        height: "rect-corners.height",
        radius: "rect-corners.radius",
        color: "rect-corners.color",
        opacity: "rect-corners.opacity"
    }
});
