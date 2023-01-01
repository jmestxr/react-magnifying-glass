"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagnifyingGlass = void 0;
const react_1 = __importStar(require("react"));
const html2canvas_1 = __importDefault(require("html2canvas"));
require("./magnifying-glass.css");
const MagnifyingGlass = ({ zoom = 2, glassStyle = {
    border: "1px solid black",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
}, offsetLeft = 0, offsetTop = 0, }) => {
    const glassRef = (0, react_1.useRef)(null);
    const magnify = (0, react_1.useCallback)((glass, zoom) => {
        var _a;
        let container, glassHalfWidth, glassHalfHeight, bw;
        container = glass.parentElement;
        if (container) {
            container.setAttribute("class", "container");
            /* Remove any existing glass that was previously rendered */
            (_a = container.querySelector(".magnifying-glass")) === null || _a === void 0 ? void 0 : _a.remove();
            /* set the initial posiiton of the glass */
            container.addEventListener("mousemove", setInitialGlassPos);
            /*
             * set background properties for the glass;
             * set background image to be the specified container that the glass is in
             */
            (0, html2canvas_1.default)(container).then((canvas) => {
                if (container) {
                    let img = canvas.toDataURL();
                    glass.style.backgroundImage = "url(" + img + ")";
                    glass.style.backgroundRepeat = "no-repeat";
                    glass.style.backgroundSize =
                        container.offsetWidth * zoom +
                            "px " +
                            container.offsetHeight * zoom +
                            "px";
                    bw = 3;
                    glassHalfWidth = glass.offsetWidth / 2;
                    glassHalfHeight = glass.offsetHeight / 2;
                }
            });
            /* Hide the glass at first, only show for the first time when user moves the mouse */
            glass.style.visibility = "hidden";
            /* insert the glass: */
            container.insertBefore(glass, container.firstChild);
            /* execute a function when user moves the magnifying glass over the image: */
            glass.addEventListener("mousemove", moveMagnifier);
            container.addEventListener("mousemove", moveMagnifier);
        }
        function moveMagnifier(e) {
            /* prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            setGlassPos(e);
            /* Display the glass */
            glass.style.visibility = "visible";
        }
        function setGlassPos(e) {
            /* get the cursor's x and y positions: */
            let cursorPos = getCursorPos();
            let { x, y } = cursorPos;
            if (container) {
                /* prevent glass from being positioned outside the image: */
                if (x > container.offsetWidth - glassHalfWidth / zoom) {
                    x = container.offsetWidth - glassHalfWidth / zoom;
                }
                if (x < glassHalfWidth / zoom) {
                    x = glassHalfWidth / zoom;
                }
                if (y > container.offsetHeight - glassHalfHeight / zoom) {
                    y = container.offsetHeight - glassHalfHeight / zoom;
                }
                if (y < glassHalfHeight / zoom) {
                    y = glassHalfHeight / zoom;
                }
            }
            /* set glass position: */
            glass.style.left = x - glassHalfWidth + offsetLeft + "px";
            glass.style.top = y - glassHalfHeight + offsetTop + "px";
            /* display what the glass "sees": */
            glass.style.backgroundPosition =
                "-" +
                    (x * zoom - glassHalfWidth + bw) +
                    "px -" +
                    (y * zoom - glassHalfHeight + bw) +
                    "px";
            function getCursorPos() {
                let containerPos = { left: 0, top: 0 }, x, y;
                /* get image's x and y positions */
                if (container) {
                    containerPos = container.getBoundingClientRect();
                }
                /* calculate the cursor's x and y coordinates, relative to the image: */
                x = e.clientX - containerPos.left;
                y = e.clientY - containerPos.top;
                return { x: x, y: y };
            }
        }
        function setInitialGlassPos(e) {
            console.log("set initial");
            setGlassPos(e);
            if (container) {
                container.removeEventListener("mousemove", setInitialGlassPos);
            }
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (glassRef.current) {
            magnify(glassRef.current, zoom);
        }
    });
    return (react_1.default.createElement("div", { ref: glassRef, className: "magnifying-glass", style: glassStyle }));
};
exports.MagnifyingGlass = MagnifyingGlass;
//# sourceMappingURL=MagnifyingGlass.js.map