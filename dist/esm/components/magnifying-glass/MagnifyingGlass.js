import React, { useCallback, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import "./magnifying-glass.css";
export const MagnifyingGlass = ({ zoom = 2, glassStyle = {
    border: "1px solid black",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
}, offsetLeft = 0, offsetTop = 0, }) => {
    const glassRef = useRef(null);
    const magnify = useCallback((glass, zoom) => {
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
            html2canvas(container).then((canvas) => {
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
    useEffect(() => {
        if (glassRef.current) {
            magnify(glassRef.current, zoom);
        }
    });
    return (React.createElement("div", { ref: glassRef, className: "magnifying-glass", style: glassStyle }));
};
//# sourceMappingURL=MagnifyingGlass.js.map