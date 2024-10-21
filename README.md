# Leaflet.MapboxVectorTile

Fork from https://github.com/SpatialServer/Leaflet.MapboxVectorTile. 

Why fork a 10-year old project for an outdated Leaflet release (0.77)? Read the answer here: https://github.com/SpatialServer/Leaflet.MapboxVectorTile/issues/89

This fork just adds support for custom drawing functions for more comple geometric shapes like hearts, stars or custom polygons. You can also color specific parts of the shapes based on properties.

Only `dist/Leaflet.MapboxVectorTile.js` and the example are modified.

## Options
For static icons use e.g.
- `style.draw = drawStar;` 

For dynamic ones where you need to add feature properties like a score, use this function
- `style.draw = function(ctx, x, y, size) {drawCircleWithGreyOutlineAndDotColor(ctx, x, y, size, feature.properties.score); };`

## Example

You can use tippecanoe for converting geojson to mbtiles and mbtileserver to serve as pbf. 

1. Install go, then 

```bash
go install github.com/consbio/mbtileserver@latest
export PATH=$PATH:$(go env GOPATH)/bin
```

2. Install tippecanoe from https://github.com/felt/tippecanoe

3. Create test point geojson with geo.rocks/coordinates2, download geojson (or use the one in this repo)

4. Convert geojson to mbtiles in tilesets folder: `tippecanoe -o tilesets/coordinates.mbtiles coordinates.geojson -z24 --drop-rate=1 --force `

5. Run mbtiles go server with `mbtileserver coordinates.mbtiles -p 8000`

6. Run a simple webserver for the static files in this repo, like `npx serve`

7. Modify the functions and observe the changes.


Examples: 

![image](https://github.com/user-attachments/assets/4d0a4eaf-29a1-4e35-8351-08d737b197bf)

![image](https://github.com/user-attachments/assets/940a7826-da9d-47f0-95dd-e64ee69ac247)

![image](https://github.com/user-attachments/assets/3603d8a0-0d0c-4b87-a147-ab3dbe97026a)

