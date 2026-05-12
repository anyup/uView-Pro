/**
 * 适配 canvas 2d 上下文
 * @param ctx canvas 2d 上下文
 * @returns
 */
export function canvas2d(ctx: CanvasRenderingContext2D): UniApp.CanvasContext {
    // 绑定 this 到 ctx，避免头条小程序等环境中出现 Illegal invocation 错误
    const boundCtx = {
        arc: ctx.arc.bind(ctx),
        arcTo: ctx.arcTo.bind(ctx),
        beginPath: ctx.beginPath.bind(ctx),
        bezierCurveTo: ctx.bezierCurveTo.bind(ctx),
        clearRect: ctx.clearRect.bind(ctx),
        clip: ctx.clip.bind(ctx),
        closePath: ctx.closePath.bind(ctx),
        createImageData: ctx.createImageData.bind(ctx),
        createLinearGradient: ctx.createLinearGradient.bind(ctx),
        createPattern: ctx.createPattern.bind(ctx),
        createRadialGradient: ctx.createRadialGradient.bind(ctx),
        drawImage: ctx.drawImage.bind(ctx),
        fill: ctx.fill.bind(ctx),
        fillRect: ctx.fillRect.bind(ctx),
        fillText: ctx.fillText.bind(ctx),
        getImageData: ctx.getImageData.bind(ctx),
        getLineDash: ctx.getLineDash.bind(ctx),
        isPointInPath: ctx.isPointInPath.bind(ctx),
        isPointInStroke: ctx.isPointInStroke.bind(ctx),
        lineTo: ctx.lineTo.bind(ctx),
        measureText: ctx.measureText.bind(ctx),
        moveTo: ctx.moveTo.bind(ctx),
        putImageData: ctx.putImageData.bind(ctx),
        quadraticCurveTo: ctx.quadraticCurveTo.bind(ctx),
        rect: ctx.rect.bind(ctx),
        restore: ctx.restore.bind(ctx),
        rotate: ctx.rotate.bind(ctx),
        save: ctx.save.bind(ctx),
        scale: ctx.scale.bind(ctx),
        setLineDash: ctx.setLineDash.bind(ctx),
        setTransform: ctx.setTransform.bind(ctx),
        stroke: ctx.stroke.bind(ctx),
        strokeRect: ctx.strokeRect.bind(ctx),
        strokeText: ctx.strokeText.bind(ctx),
        transform: ctx.transform.bind(ctx),
        translate: ctx.translate.bind(ctx),
        resetTransform: ctx.resetTransform?.bind(ctx),
        roundRect: (ctx as any).roundRect?.bind(ctx),
        setFillStyle(color: string | CanvasGradient) {
            ctx.fillStyle = color;
        },
        setStrokeStyle(color: string | CanvasGradient | CanvasPattern) {
            ctx.strokeStyle = color;
        },
        setLineWidth(lineWidth: number) {
            ctx.lineWidth = lineWidth;
        },
        setLineCap(lineCap: 'butt' | 'round' | 'square') {
            ctx.lineCap = lineCap;
        },

        setFontSize(font: string) {
            ctx.font = font;
        },
        setGlobalAlpha(alpha: number) {
            ctx.globalAlpha = alpha;
        },
        setLineJoin(lineJoin: 'bevel' | 'round' | 'miter') {
            ctx.lineJoin = lineJoin;
        },
        setTextAlign(align: 'left' | 'center' | 'right') {
            ctx.textAlign = align;
        },
        setMiterLimit(miterLimit: number) {
            ctx.miterLimit = miterLimit;
        },
        setShadow(offsetX: number, offsetY: number, blur: number, color: string) {
            ctx.shadowOffsetX = offsetX;
            ctx.shadowOffsetY = offsetY;
            ctx.shadowBlur = blur;
            ctx.shadowColor = color;
        },
        setTextBaseline(textBaseline: 'top' | 'bottom' | 'middle') {
            ctx.textBaseline = textBaseline;
        },
        createCircularGradient() {},
        draw() {},
        addColorStop() {}
    };
    // 复制属性访问器
    Object.defineProperties(boundCtx, {
        fillStyle: {
            get: () => ctx.fillStyle,
            set: value => {
                ctx.fillStyle = value;
            }
        },
        strokeStyle: {
            get: () => ctx.strokeStyle,
            set: value => {
                ctx.strokeStyle = value;
            }
        },
        lineWidth: {
            get: () => ctx.lineWidth,
            set: value => {
                ctx.lineWidth = value;
            }
        },
        lineCap: {
            get: () => ctx.lineCap,
            set: value => {
                ctx.lineCap = value;
            }
        },
        lineJoin: {
            get: () => ctx.lineJoin,
            set: value => {
                ctx.lineJoin = value;
            }
        },
        miterLimit: {
            get: () => ctx.miterLimit,
            set: value => {
                ctx.miterLimit = value;
            }
        },
        globalAlpha: {
            get: () => ctx.globalAlpha,
            set: value => {
                ctx.globalAlpha = value;
            }
        },
        globalCompositeOperation: {
            get: () => ctx.globalCompositeOperation,
            set: value => {
                ctx.globalCompositeOperation = value;
            }
        },
        font: {
            get: () => ctx.font,
            set: value => {
                ctx.font = value;
            }
        },
        textAlign: {
            get: () => ctx.textAlign,
            set: value => {
                ctx.textAlign = value;
            }
        },
        textBaseline: {
            get: () => ctx.textBaseline,
            set: value => {
                ctx.textBaseline = value;
            }
        },
        shadowOffsetX: {
            get: () => ctx.shadowOffsetX,
            set: value => {
                ctx.shadowOffsetX = value;
            }
        },
        shadowOffsetY: {
            get: () => ctx.shadowOffsetY,
            set: value => {
                ctx.shadowOffsetY = value;
            }
        },
        shadowBlur: {
            get: () => ctx.shadowBlur,
            set: value => {
                ctx.shadowBlur = value;
            }
        },
        shadowColor: {
            get: () => ctx.shadowColor,
            set: value => {
                ctx.shadowColor = value;
            }
        }
    });
    return boundCtx as unknown as UniApp.CanvasContext;
}
