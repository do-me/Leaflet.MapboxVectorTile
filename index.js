var debug = {};

var map = L.map('map').setView([50, 8], 6); // Germany


L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  //maxZoom: 25,
  id: 'examples.map-i86knfo3'}).addTo(map);

  function drawHalfCircleWithGreyOutline(ctx, x, y, radius, startAngle = 0, counterclockwise = false) {
    const outlineThickness = radius / 5;
    const innerRadius = radius - outlineThickness;
  
    //Outer half circle (Grey)
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, startAngle + Math.PI, counterclockwise);
    ctx.fillStyle = 'grey';
    ctx.fill();
  
  
    //Inner half circle (Green)
    ctx.beginPath();
    ctx.arc(x, y, innerRadius, startAngle, startAngle + Math.PI, counterclockwise);
    ctx.fillStyle = 'green';
  
    ctx.fill();
  
  }

  function drawCircleWithGreyOutline(ctx, x, y, radius) {
    const outlineThickness = radius / 5;
    const innerRadius = radius - outlineThickness;
  
    ctx.beginPath();
  
    // Grey outline
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'grey';
    ctx.fill();
  
    // Green inner circle
    ctx.beginPath(); // Start a new path for the inner circle
    ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
  }

  function drawCircleWithGreyOutlineAndDot(ctx, x, y, radius) {
    const outlineThickness = radius / 5;
    const innerRadius = radius - outlineThickness;
    const dotRadius = radius / 10; // Example dot radius (adjust as needed)
  
    // Grey outline
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'grey';
    ctx.fill();
  
    // Green inner circle
    ctx.beginPath();
    ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
  
    // Black dot
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI); // Dot at the center (x, y)
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  function drawCircleWithHole(ctx, x, y, outerRadius, innerRadius=10) {
    ctx.beginPath();
  
    // Outer circle
    ctx.arc(x, y, outerRadius, 0, 2 * Math.PI, false);
  
    // Inner circle (clockwise to create a hole)
    ctx.arc(x, y, innerRadius, 0, 2 * Math.PI, true);
  
    ctx.fill();  // or ctx.stroke() if you want just the outline
  }

  function drawCircle(ctx, x, y, radius) {
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
  }
  
  function drawSquare(ctx, x, y, size) {
    ctx.rect(x - size / 2, y - size / 2, size, size);
  }
  
  function drawRectangle(ctx, x, y, width, height) {
      ctx.rect(x - width/2, y - height/2, width, height);
  }
  
  function drawRoundedRectangle(ctx, x, y, radius,width=10, height=10) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }
  
  function drawTriangle(ctx, x, y, size) {
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.closePath();
  }
  
  function drawPentagon(ctx, x, y, radius) {
      drawPolygon(ctx, x, y, radius, 5);
  }
  
  function drawHexagon(ctx, x, y, radius) {
      drawPolygon(ctx, x, y, radius, 6);
  }
  
  function drawHeptagon(ctx, x, y, radius) {
      drawPolygon(ctx, x, y, radius, 7);
  }
  
  function drawOctagon(ctx, x, y, radius) {
      drawPolygon(ctx, x, y, radius, 8);
  }
  
  function drawNonagon(ctx, x, y, radius) {
      drawPolygon(ctx, x, y, radius, 9);
  }
  
  function drawDecagon(ctx, x, y, radius) {
      drawPolygon(ctx, x, y, radius, 10);
  }
  
  function drawDodecagon(ctx, x, y, radius) { // 12 sides
      drawPolygon(ctx, x, y, radius, 12);
  }
  
  
  function drawStar(ctx, x, y, radius, points=5, innerRadius=0.5) {
      innerRadius = innerRadius || 0.4;
      drawStarPolygon(ctx, x, y, radius, points, innerRadius);
  
  }
  
  function drawHeart(ctx, x, y, size) {
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 4, x, y + size);
    ctx.bezierCurveTo(x + size, y + size / 4, x + size / 2, y - size / 2, x, y + size / 4);
  }
  
  function drawDiamond(ctx, x, y, size) {
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
  }
  
  function drawCross(ctx, x, y, size) {
    const halfSize = size / 1;
    ctx.beginPath(); // good practice to start new shapes with beginPath
    ctx.strokeStyle = 'white';
    ctx.moveTo(x - halfSize, y - halfSize);
    ctx.lineTo(x + halfSize, y + halfSize);
    ctx.moveTo(x + halfSize, y - halfSize); // moveTo for second line start
    ctx.lineTo(x - halfSize, y + halfSize);
    ctx.stroke(); // stroke to actually draw it
  }
  
  function drawPolygon(ctx, x, y, radius, sides=5) {
      ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
      for (var i = 1; i <= sides; i++) {
          var a = 2 * Math.PI * i / sides;
          ctx.lineTo(x + radius * Math.cos(a), y + radius * Math.sin(a));
      }
  }
  
  
  function drawStarPolygon(ctx, x, y, radius, points, innerRadius) {
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
    for (var i = 0; i < points * 2; i++) {
      var r = (i % 2 == 0) ? radius : innerRadius * radius;
      var a = Math.PI * i / points;
      ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    }
    ctx.closePath();
  }
  
  
  function drawEllipse(ctx, x, y, radiusX, radiusY) {
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
  }
  
  //More shapes...  Add as many as you wish.
  function drawRightTriangle(ctx, x, y, base, height) {
      ctx.moveTo(x,y);
      ctx.lineTo(x + base, y);
      ctx.lineTo(x, y + height);
      ctx.closePath();
  }
  
  function drawIsoscelesTriangle(ctx, x, y, base, height) {
      ctx.moveTo(x,y);
      ctx.lineTo(x + base/2, y + height);
      ctx.lineTo(x - base/2, y + height);
      ctx.closePath();
  
  }
  
  function drawParallelogram(ctx, x, y, width, height, skew) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width + skew, y + height);
      ctx.lineTo(x + skew, y + height);
      ctx.closePath();
  }
  
  function drawTrapezoid(ctx, x, y, topWidth, bottomWidth, height) {
    ctx.beginPath();
    ctx.moveTo(x - topWidth/2, y);
    ctx.lineTo(x + topWidth/2, y);
    ctx.lineTo(x + bottomWidth/2, y + height);
    ctx.lineTo(x - bottomWidth/2, y + height);
    ctx.closePath();
  }

  function drawCircleWithGreyOutlineAndDotColor(ctx, x, y, radius, score) {
    const outlineThickness = radius / 5;
    const innerRadius = radius - outlineThickness;
    const dotRadius = radius / 10;

    let innerColor;
    switch (score) { //added switch case based on score
        case 1:
            innerColor = '#1a9641';
            break;
        case 2:
            innerColor = '#a6d96a';
            break;
        case 3:
            innerColor = '#ffffbf';
            break;
        case 4:
            innerColor = '#fdae61';
            break;
        case 5:
            innerColor = '#d7191c';
            break;
        default:            // Default to grey if score is outside 1-5
            innerColor = 'grey'
            break;
    }

    // Grey outline
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'grey';
    ctx.fill();

    // Inner circle with dynamic color
    ctx.beginPath();
    ctx.arc(x, y, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = innerColor;  // Use the score-based color
    ctx.fill();

    // Black dot
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }


var mvtSource = new L.TileLayer.MVTSource({
  url: "http://localhost:8000/services/coordinates/tiles/{z}/{x}/{y}.pbf",
  //debug: true,
  clickableLayers: ["coordinates"],
  getIDForLayerFeature: function(feature) {
    return feature.properties.id;
  },

  /**
   * The filter function gets called when iterating though each vector tile feature (vtf). You have access
   * to every property associated with a given feature (the feature, and the layer). You can also filter
   * based of the context (each tile that the feature is drawn onto).
   *
   * Returning false skips over the feature and it is not drawn.
   *
   * @param feature
   * @returns {boolean}
   */


  style: function (feature) {
    var style = {};

    var type = feature.type;
    switch (type) {
      case 1: //'Point'
      style.color = 'white';
      style.radius = 20;
        //style.selected = {
          //color: "white",//'rgba(255,255,0,0.5)',
        //  radius: 25
        //};
      style.draw = function(ctx, x, y, size) {drawCircleWithGreyOutlineAndDotColor(ctx, x, y, size, feature.properties.score); };
        break;
      case 2: //'LineString'
        style.color = 'rgba(161,217,155,0.8)';
        style.size = 3;
        style.selected = {
          color: 'rgba(255,25,0,0.5)',
          size: 4
        };
        break;
      case 3: //'Polygon'
        style.color = fillColor;
        style.outline = {
          color: strokeColor,
          size: 1
        };
        style.selected = {
          color: 'rgba(255,140,0,0.3)',
          outline: {
            color: 'rgba(255,140,0,1)',
            size: 2
          }
        };
        break;
    }
    return style;
  }

});
//debug.mvtSource = mvtSource;

//Globals that we can change later.
var fillColor = 'rgba(149,139,255,0.4)';
var strokeColor = 'rgb(20,20,20)';

//Add layer
map.addLayer(mvtSource);
