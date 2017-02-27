(function () {
    var filterValue = '';
    var panelIsOpen = false;

    // ready
    var callback = function () {
        // console.log('DOM is ready!');
        runCode();
        addListeners();
    };

    if (document.readyState === 'complete'
        || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', callback);
    }

    function runCode() {
        buildColorGallery();
    }

    function buildColorGallery(category) {
        var buttonWrapper = document.getElementById('js-button-wrapper');
        buttonWrapper.classList.add('is-hidden');
        setTimeout(function () {
            buttonWrapper.innerHTML = '';

            var filteredColorObjects;

            // filter colors if category supplied
            if (category) {
                filteredColorObjects = colorObjects.filter(function (obj) {
                    return obj.cat === category;
                });
            } else {
                filteredColorObjects = colorObjects;
            }

            // build color buttons
            filteredColorObjects.forEach(function (color) {
                // str += '{name:"' + color + '",hex:"' + colorHexCodes[color] + '",rgb: "rgb()",type:"light",cat:"cat"},';
                var button = document.createElement('button');
                var span = document.createElement('span');

                button.classList.add(color.name);
                button.classList.add(color.type);
                button.style.backgroundColor = color.name;

                span.appendChild(document.createTextNode(color.name));
                button.appendChild(span);
                buttonWrapper.appendChild(button);

                setTimeout(function () {
                    buttonWrapper.classList.remove('is-hidden');
                }, 50);
            });
        }, 200);
    }

    function addListeners() {
        window.addEventListener('click', clickHandler);
    }

    function clickHandler(e) {
        var clickedElement = e.target;

        var chosenColor;
        if (clickedElement.firstElementChild) {
            chosenColor = clickedElement.firstElementChild.innerHTML;
        }

        console.log('Click event, node value is: ' + chosenColor);

        // color button clicked
        if (clickedElement.tagName.toLowerCase() === 'button'
            && typeof chosenColor === 'string'
            && chosenColor !== '') {
            isColorSelected = true;
            updateAndShowColorPanel(chosenColor);
        } else {
            // filter link clicked
            if (clickedElement.classList.contains('js-filter') && chosenColor !== filterValue) {
                console.log('filter clicked, value: ' + chosenColor);
                var newFilterValue = chosenColor === 'all' ? '' : chosenColor;
                // if clicked filter is different from current filter
                if (newFilterValue !== filterValue) {
                    console.log('rebuilding gallery');
                    filterValue = newFilterValue;
                    buildColorGallery(filterValue);
                }
            } else {
                if (clickedElement.classList.contains('color-panel')) {
                    // full screen panel clicked, hide it
                    hidePanel();
                }
            }
        }
    }

    function hidePanel() {
        console.log('hidePanel() called');
        panelIsOpen = false;
        // window.removeEventListener('touchstart', clickHandler);
        var colorPanel = document.getElementById('js-color-panel');
        colorPanel.classList.remove('is-shown');
        setTimeout(function () {
            colorPanel.classList.remove('is-visibility-shown');
        }, 300);
    }

    function updateAndShowColorPanel(color) {
        panelIsOpen = true;
        // window.addEventListener('touchstart', clickHandler);
        var colorPanel = document.getElementById('js-color-panel');

        // set bg color
        colorPanel.style.backgroundColor = color;

        var colorArray = colorObjects.filter(function (obj) {
            return obj.name === color;
        });

        var colorObject = colorArray[0];

        // set light or dark font color
        colorPanel.classList.remove('dark');
        colorPanel.classList.remove('light');
        colorPanel.classList.add(colorObject.type);

        // update color name
        var colorNameElement = document.getElementById('js-color-name');
        colorNameElement.innerHTML = colorObject.name;

        // update hex code
        var colorHexCodeElement = document.getElementById('js-color-hex-code');
        colorHexCodeElement.firstElementChild.innerHTML = colorObject.hex;

        // update rgb code
        var colorRGBCodeElement = document.getElementById('js-color-rgb-code');
        colorRGBCodeElement.firstElementChild.innerHTML = colorObject.rgb;

        // show the panel
        colorPanel.classList.add('is-visibility-shown');
        setTimeout(function () {
            colorPanel.classList.add('is-shown');
        }, 100);
    }

    var colorObjects = [
        { name: "aliceblue", hex: "#f0f8ff", rgb: "rgb(240,248,255)", type: "light", cat: "blue" },
        { name: "antiquewhite", hex: "#faebd7", rgb: "rgb(250,235,215)", type: "light", cat: "white" },
        { name: "aqua", hex: "#00ffff", rgb: "rgb(0,255,255)", type: "light", cat: "blue" },
        { name: "aquamarine", hex: "#7fffd4", rgb: "rgb(127,255,212)", type: "light", cat: "blue" },
        { name: "azure", hex: "#f0ffff", rgb: "rgb(240,255,255)", type: "light", cat: "white" },
        { name: "beige", hex: "#f5f5dc", rgb: "rgb(245,245,220)", type: "light", cat: "white" },
        { name: "bisque", hex: "#ffe4c4", rgb: "rgb(255,228,196)", type: "light", cat: "brown" },
        { name: "black", hex: "#000000", rgb: "rgb(0,0,0)", type: "dark", cat: "gray" },
        { name: "blanchedalmond", hex: "#ffebcd", rgb: "rgb(255,235,205)", type: "light", cat: "brown" },
        { name: "blue", hex: "#0000ff", rgb: "rgb(0,0,255)", type: "dark", cat: "blue" },
        { name: "blueviolet", hex: "#8a2be2", rgb: "rgb(138,43,226)", type: "dark", cat: "purple" },
        { name: "brown", hex: "#a52a2a", rgb: "rgb(165,42,42)", type: "dark", cat: "brown" },
        { name: "burlywood", hex: "#deb887", rgb: "rgb(222,184,135)", type: "dark", cat: "brown" },
        { name: "cadetblue", hex: "#5f9ea0", rgb: "rgb(95,158,160)", type: "dark", cat: "blue" },
        { name: "chartreuse", hex: "#7fff00", rgb: "rgb(127,255,0)", type: "light", cat: "green" },
        { name: "chocolate", hex: "#d2691e", rgb: "rgb(210,105,30)", type: "dark", cat: "brown" },
        { name: "coral", hex: "#ff7f50", rgb: "rgb(255,127,80)", type: "dark", cat: "orange" },
        { name: "cornflowerblue", hex: "#6495ed", rgb: "rgb(100,149,237)", type: "dark", cat: "blue" },
        { name: "cornsilk", hex: "#fff8dc", rgb: "rgb(255,248,220)", type: "light", cat: "brown" },
        { name: "crimson", hex: "#dc143c", rgb: "rgb(220,20,60)", type: "dark", cat: "red" },
        { name: "cyan", hex: "#00ffff", rgb: "rgb(0,255,255)", type: "light", cat: "blue" },
        { name: "darkblue", hex: "#00008b", rgb: "rgb(0,0,139)", type: "dark", cat: "blue" },
        { name: "darkcyan", hex: "#008b8b", rgb: "rgb(0,139,139)", type: "dark", cat: "green" },
        { name: "darkgoldenrod", hex: "#b8860b", rgb: "rgb(184,134,11)", type: "dark", cat: "brown" },
        { name: "darkgray", hex: "#a9a9a9", rgb: "rgb(169,169,169)", type: "dark", cat: "gray" },
        { name: "darkgreen", hex: "#006400", rgb: "rgb(0,100,0)", type: "dark", cat: "green" },
        { name: "darkkhaki", hex: "#bdb76b", rgb: "rgb(189,183,107)", type: "dark", cat: "yellow" },
        { name: "darkmagenta", hex: "#8b008b", rgb: "rgb(139,0,139)", type: "dark", cat: "purple" },
        { name: "darkolivegreen", hex: "#556b2f", rgb: "rgb(85,107,47)", type: "dark", cat: "green" },
        { name: "darkorange", hex: "#ff8c00", rgb: "rgb(255,140,0)", type: "dark", cat: "orange" },
        { name: "darkorchid", hex: "#9932cc", rgb: "rgb(153,50,204)", type: "dark", cat: "purple" },
        { name: "darkred", hex: "#8b0000", rgb: "rgb(139,0,0)", type: "dark", cat: "red" },
        { name: "darksalmon", hex: "#e9967a", rgb: "rgb(233,150,122)", type: "dark", cat: "red" },
        { name: "darkseagreen", hex: "#8fbc8f", rgb: "rgb(143,188,143)", type: "dark", cat: "green" },
        { name: "darkslateblue", hex: "#483d8b", rgb: "rgb(72,61,139)", type: "dark", cat: "purple" },
        { name: "darkslategray", hex: "#2f4f4f", rgb: "rgb(47,79,79)", type: "dark", cat: "gray" },
        { name: "darkturquoise", hex: "#00ced1", rgb: "rgb(0,206,209)", type: "dark", cat: "blue" },
        { name: "darkviolet", hex: "#9400d3", rgb: "rgb(148,0,211)", type: "dark", cat: "purple" },
        { name: "deeppink", hex: "#ff1493", rgb: "rgb(255,20,147)", type: "dark", cat: "pink" },
        { name: "deepskyblue", hex: "#00bfff", rgb: "rgb(0,191,255)", type: "dark", cat: "blue" },
        { name: "dimgray", hex: "#696969", rgb: "rgb(105,105,105)", type: "dark", cat: "gray" },
        { name: "dodgerblue", hex: "#1e90ff", rgb: "rgb(30,144,255)", type: "dark", cat: "blue" },
        { name: "firebrick", hex: "#b22222", rgb: "rgb(178,34,34)", type: "dark", cat: "red" },
        { name: "floralwhite", hex: "#fffaf0", rgb: "rgb(255,250,240)", type: "light", cat: "white" },
        { name: "forestgreen", hex: "#228b22", rgb: "rgb(34,139,34)", type: "dark", cat: "green" },
        { name: "fuchsia", hex: "#ff00ff", rgb: "rgb(255,0,255)", type: "dark", cat: "purple" },
        { name: "gainsboro", hex: "#dcdcdc", rgb: "rgb(220,220,220)", type: "light", cat: "gray" },
        { name: "ghostwhite", hex: "#f8f8ff", rgb: "rgb(248,248,255)", type: "light", cat: "white" },
        { name: "gold", hex: "#ffd700", rgb: "rgb(255,215,0)", type: "light", cat: "yellow" },
        { name: "goldenrod", hex: "#daa520", rgb: "rgb(218,165,32)", type: "dark", cat: "brown" },
        { name: "gray", hex: "#808080", rgb: "rgb(128,128,128)", type: "dark", cat: "gray" },
        { name: "green", hex: "#008000", rgb: "rgb(0,128,0)", type: "dark", cat: "green" },
        { name: "greenyellow", hex: "#adff2f", rgb: "rgb(173,255,47)", type: "light", cat: "green" },
        { name: "honeydew", hex: "#f0fff0", rgb: "rgb(240,255,240)", type: "light", cat: "white" },
        { name: "hotpink", hex: "#ff69b4", rgb: "rgb(255,105,180)", type: "dark", cat: "pink" },
        { name: "indianred", hex: "#cd5c5c", rgb: "rgb(205,92,92))", type: "dark", cat: "red" },
        { name: "indigo", hex: "#4b0082", rgb: "rgb(75,0,130)", type: "dark", cat: "purple" },
        { name: "ivory", hex: "#fffff0", rgb: "rgb(255,255,240)", type: "light", cat: "white" },
        { name: "khaki", hex: "#f0e68c", rgb: "rgb(240,230,140)", type: "light", cat: "yellow" },
        { name: "lavender", hex: "#e6e6fa", rgb: "rgb(230,230,250)", type: "light", cat: "purple" },
        { name: "lavenderblush", hex: "#fff0f5", rgb: "rgb(255,240,245)", type: "light", cat: "white" },
        { name: "lawngreen", hex: "#7cfc00", rgb: "rgb(124,252,0)", type: "light", cat: "green" },
        { name: "lemonchiffon", hex: "#fffacd", rgb: "rgb(255,250,205)", type: "light", cat: "yellow" },
        { name: "lightblue", hex: "#add8e6", rgb: "rgb(173,216,230)", type: "light", cat: "blue" },
        { name: "lightcoral", hex: "#f08080", rgb: "rgb(240,128,128)", type: "dark", cat: "red" },
        { name: "lightcyan", hex: "#e0ffff", rgb: "rgb(224,255,255)", type: "light", cat: "blue" },
        { name: "lightgoldenrodyellow", hex: "#fafad2", rgb: "rgb(250,250,210)", type: "light", cat: "yellow" },
        { name: "lightgray", hex: "#d3d3d3", rgb: "rgb(211,211,211)", type: "light", cat: "gray" },
        { name: "lightgreen", hex: "#90ee90", rgb: "rgb(144,238,144)", type: "light", cat: "green" },
        { name: "lightpink", hex: "#ffb6c1", rgb: "rgb(255,182,193)", type: "light", cat: "pink" },
        { name: "lightsalmon", hex: "#ffa07a", rgb: "rgb(255,160,122)", type: "dark", cat: "orange" },
        { name: "lightseagreen", hex: "#20b2aa", rgb: "rgb(32,178,170)", type: "dark", cat: "green" },
        { name: "lightskyblue", hex: "#87cefa", rgb: "rgb(135,206,250)", type: "dark", cat: "blue" },
        { name: "lightslategray", hex: "#778899", rgb: "rgb(119,136,153)", type: "dark", cat: "gray" },
        { name: "lightsteelblue", hex: "#b0c4de", rgb: "rgb(176,196,222)", type: "dark", cat: "blue" },
        { name: "lightyellow", hex: "#ffffe0", rgb: "rgb(255,255,224)", type: "light", cat: "yellow" },
        { name: "lime", hex: "#00ff00", rgb: "rgb(0,255,0)", type: "light", cat: "green" },
        { name: "limegreen", hex: "#32cd32", rgb: "rgb(50,205,50)", type: "dark", cat: "green" },
        { name: "linen", hex: "#faf0e6", rgb: "rgb(250,240,230)", type: "light", cat: "white" },
        { name: "magenta", hex: "#ff00ff", rgb: "rgb(255,0,255)", type: "dark", cat: "purple" },
        { name: "maroon", hex: "#800000", rgb: "rgb(128,0,0)", type: "dark", cat: "brown" },
        { name: "mediumaquamarine", hex: "#66cdaa", rgb: "rgb(102,205,170)", type: "dark", cat: "green" },
        { name: "mediumblue", hex: "#0000cd", rgb: "rgb(0,0,205)", type: "dark", cat: "blue" },
        { name: "mediumorchid", hex: "#ba55d3", rgb: "rgb(186,85,211)", type: "dark", cat: "purple" },
        { name: "mediumpurple", hex: "#9370db", rgb: "rgb(147,112,219)", type: "dark", cat: "purple" },
        { name: "mediumseagreen", hex: "#3cb371", rgb: "rgb(60,179,113)", type: "dark", cat: "green" },
        { name: "mediumslateblue", hex: "#7b68ee", rgb: "rgb(123,104,238)", type: "dark", cat: "purple" },
        { name: "mediumspringgreen", hex: "#00fa9a", rgb: "rgb(0,250,154)", type: "light", cat: "green" },
        { name: "mediumturquoise", hex: "#48d1cc", rgb: "rgb(72,209,204)", type: "dark", cat: "blue" },
        { name: "mediumvioletred", hex: "#c71585", rgb: "rgb(199,21,133)", type: "dark", cat: "pink" },
        { name: "midnightblue", hex: "#191970", rgb: "rgb(25,25,112)", type: "dark", cat: "blue" },
        { name: "mintcream", hex: "#f5fffa", rgb: "rgb(245,255,250)", type: "light", cat: "white" },
        { name: "mistyrose", hex: "#ffe4e1", rgb: "rgb(255,228,225)", type: "light", cat: "white" },
        { name: "moccasin", hex: "#ffe4b5", rgb: "rgb(255,228,181)", type: "light", cat: "yellow" },
        { name: "navajowhite", hex: "#ffdead", rgb: "rgb(255,222,173)", type: "light", cat: "brown" },
        { name: "navy", hex: "#000080", rgb: "rgb(0,0,128)", type: "dark", cat: "blue" },
        { name: "oldlace", hex: "#fdf5e6", rgb: "rgb(253,245,230)", type: "light", cat: "white" },
        { name: "olive", hex: "#808000", rgb: "rgb(128,128,0)", type: "dark", cat: "green" },
        { name: "olivedrab", hex: "#6b8e23", rgb: "rgb(107,142,35)", type: "dark", cat: "green" },
        { name: "orange", hex: "#ffa500", rgb: "rgb(255,165,0)", type: "dark", cat: "orange" },
        { name: "orangered", hex: "#ff4500", rgb: "rgb(255,69,0)", type: "dark", cat: "orange" },
        { name: "orchid", hex: "#da70d6", rgb: "rgb(218,112,214)", type: "dark", cat: "purple" },
        { name: "palegoldenrod", hex: "#eee8aa", rgb: "rgb(238,232,170)", type: "light", cat: "yellow" },
        { name: "palegreen", hex: "#98fb98", rgb: "rgb(152,251,152)", type: "light", cat: "green" },
        { name: "paleturquoise", hex: "#afeeee", rgb: "rgb(175,238,238)", type: "light", cat: "blue" },
        { name: "palevioletred", hex: "#db7093", rgb: "rgb(219,112,147)", type: "dark", cat: "pink" },
        { name: "papayawhip", hex: "#ffefd5", rgb: "rgb(255,239,214)", type: "light", cat: "yellow" },
        { name: "peachpuff", hex: "#ffdab9", rgb: "rgb(255,218,185)", type: "light", cat: "yellow" },
        { name: "peru", hex: "#cd853f", rgb: "rgb(205,133,63)", type: "dark", cat: "brown" },
        { name: "pink", hex: "#ffc0cb", rgb: "rgb(255,192,203)", type: "light", cat: "pink" },
        { name: "plum", hex: "#dda0dd", rgb: "rgb(221,160,221)", type: "dark", cat: "purple" },
        { name: "powderblue", hex: "#b0e0e6", rgb: "rgb(176,224,230)", type: "light", cat: "blue" },
        { name: "purple", hex: "#800080", rgb: "rgb(128,0,128)", type: "dark", cat: "purple" },
        { name: "rebeccapurple", hex: "#663399", rgb: "rgb(102,51,153)", type: "dark", cat: "purple" },
        { name: "red", hex: "#ff0000", rgb: "rgb(255,0,0)", type: "dark", cat: "red" },
        { name: "rosybrown", hex: "#bc8f8f", rgb: "rgb(188,143,143)", type: "dark", cat: "brown" },
        { name: "royalblue", hex: "#4169e1", rgb: "rgb(65,105,225)", type: "dark", cat: "blue" },
        { name: "saddlebrown", hex: "#8b4513", rgb: "rgb(139,69,19)", type: "dark", cat: "brown" },
        { name: "salmon", hex: "#fa8072", rgb: "rgb(250,128,114)", type: "dark", cat: "red" },
        { name: "sandybrown", hex: "#f4a460", rgb: "rgb(244,164,96)", type: "dark", cat: "brown" },
        { name: "seagreen", hex: "#2e8b57", rgb: "rgb(46,139,87)", type: "dark", cat: "green" },
        { name: "seashell", hex: "#fff5ee", rgb: "rgb(255,245,238)", type: "light", cat: "white" },
        { name: "sienna", hex: "#a0522d", rgb: "rgb(160,82,45)", type: "dark", cat: "brown" },
        { name: "silver", hex: "#c0c0c0", rgb: "rgb(192,192,192)", type: "dark", cat: "gray" },
        { name: "skyblue", hex: "#87ceeb", rgb: "rgb(135,206,235)", type: "dark", cat: "blue" },
        { name: "slateblue", hex: "#6a5acd", rgb: "rgb(106,90,205)", type: "dark", cat: "purple" },
        { name: "slategray", hex: "#708090", rgb: "rgb(112,128,144)", type: "dark", cat: "gray" },
        { name: "snow", hex: "#fffafa", rgb: "rgb(255,250,250)", type: "light", cat: "white" },
        { name: "springgreen", hex: "#00ff7f", rgb: "rgb(0,255,127)", type: "light", cat: "green" },
        { name: "steelblue", hex: "#4682b4", rgb: "rgb(70,130,180)", type: "dark", cat: "blue" },
        { name: "tan", hex: "#d2b48c", rgb: "rgb(210,180,140)", type: "dark", cat: "brown" },
        { name: "teal", hex: "#008080", rgb: "rgb(0,128,128)", type: "dark", cat: "green" },
        { name: "thistle", hex: "#d8bfd8", rgb: "rgb(216,191,216)", type: "light", cat: "purple" },
        { name: "tomato", hex: "#ff6347", rgb: "rgb(255,99,71)", type: "dark", cat: "orange" },
        { name: "turquoise", hex: "#40e0d0", rgb: "rgb(64,224,208)", type: "dark", cat: "blue" },
        { name: "violet", hex: "#ee82ee", rgb: "rgb(238,130,238)", type: "dark", cat: "purple" },
        { name: "wheat", hex: "#f5deb3", rgb: "rgb(245,222,179)", type: "light", cat: "brown" },
        { name: "white", hex: "#ffffff", rgb: "rgb(255,255,255)", type: "light", cat: "white" },
        { name: "whitesmoke", hex: "#f5f5f5", rgb: "rgb(245,245,245)", type: "light", cat: "white" },
        { name: "yellow", hex: "#ffff00", rgb: "rgb(255,255,0)", type: "light", cat: "yellow" },
        { name: "yellowgreen", hex: "#9acd32", rgb: "rgb(154,205,50)", type: "dark", cat: "green" }
    ];
})();
