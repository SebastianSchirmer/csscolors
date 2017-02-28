# csscolors

A simple showcase website for the 148 named colors as defined in the W3C <a href="https://www.w3.org/TR/css-color-4/#named-colors">CSS Color Module Level 4</a> working draft. Those 7 gray (grey) colors that are defined twice each with different a spelling (gray vs. grey) are included just once each using the 'gray' spelling and omitting the 'grey' one.

https://SebastianSchirmer.github.io/csscolors/

## Build locally

To build the dist files locally, first install npm packages by running either `yarn install` or `npm install`, depending if you prefer yarn or npm.
 
Then run `gulp build` or `gulp build --minify` for a non-minified or minified build respectively.
 
The default `gulp` task creates a non-minified build with browser-sync and watch enabled. 
