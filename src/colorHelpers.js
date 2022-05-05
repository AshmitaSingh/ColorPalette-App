import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    }

    //Loop over all of these levels, i.e, 50 is set to an empty array, eg, 50=[]; 100=[]; 200=[] etc, and later we can fill them up
    for (let level of levels) {
        newPalette.colors[level] = [];
    }

    //Loop over every the color & generate a scale for those different colors, i.e level 50 represents lightest shade, whereas level 900 represents deepest shade
    for (let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse();         //The order that we get after executing the generateScale(), its from dark to light, but we want the order to be from light to dark, that's why using ".reverse()"
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                //Name alongwith Levels
                name: `${color.name} ${levels[i]}`,
                //replace a 'space globally' with a '-',i.e,'dash'
                id: color.name.toLowerCase().replace(/ /g, '-'),
                //To get Hex value
                hex: scale[i],
                //To get the 'rgb' value, we've to turn it back into 'chroma()' color, & to convert it to 'rgb' color, '.css()' is required
                rgb: chroma(scale[i]).css(),
                //replacing 'rgb' with 'rgba' & closing parenthesis ')' with ',1.0)'
                rgba: chroma(scale[i])
                    .css()
                    .replace('rgb', 'rgba')
                    .replace(')', ',1.0)')
            })
        }
    }
    return newPalette;
}

//This func will generate a range of colors
function getRange(hexColor) {
    //Define an end color
    let end = '#fff';
    //Returning an array with 3 color values
    return [
        //starting color
        chroma(hexColor).darken(1.4).hex(),
        //middle color
        hexColor,
        //end color
        end
    ];
}

//This func will give 10 colors(shades) based-of of an input color
function generateScale(hexColor, numberOfColors) {
    return chroma
        .scale(getRange(hexColor))
        .mode('lab')
        .colors(numberOfColors);
}

export { generatePalette };