/* eslint-disable */
const spec =


    // Slightly modified  https://vega.github.io/vega/examples/county-unemployment/

{
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
  "padding": 0,
  "autosize": "none",
  "config": {
    "range": { "category": { "scheme": "elastic" } },
    "arc": { "fill": "#00A69B" },
    "area": { "fill": "#00A69B" },
    "line": { "stroke": "#00A69B" },
    "path": { "stroke": "#00A69B" },
    "rect": { "fill": "#00A69B" },
    "rule": { "stroke": "#00A69B" },
    "shape": { "stroke": "#00A69B" },
    "symbol": { "fill": "#00A69B" },
    "trail": { "fill": "#00A69B" }
  },
  "data": [{
    "name": "unemp",
    "url": "https://vega.github.io/editor/data/unemployment.tsv",
    "format": { "type": "tsv", "parse": "auto", "delimiter": "\\t" }
  }, {
    "name": "counties",
    "url": "https://vega.github.io/editor/data/us-10m.json",
    "format": { "type": "topojson", "feature": "counties" },
    "transform": [{
      "type": "lookup",
      "from": "unemp",
      "key": "id",
      "fields": ["id"],
      "as": ["unemp"]
    }, { "type": "filter", "expr": "datum.unemp != null" }]
  }, {
    "name": "world",
    "url": "https://vega.github.io/editor/data/world-110m.json",
    "format": { "type": "topojson", "feature": "countries" }
  }],
  "scales": [{ "name": "color", "type": "quantize", "domain": [0, 0.15], "range": { "scheme": "blues-9" } }],
  "marks": [{
    "type": "shape",
    "from": { "data": "counties" },
    "encode": {
      "enter": { "opacity": { "value": 0.4 } },
      "update": {
        "fill": { "scale": "color", "field": "unemp.rate" },
        "tooltip": { "signal": "'Unemployment ' + format(datum.unemp.rate, ',.1%')" }
      },
      "hover": { "fill": { "value": "red" } }
    },
    "transform": [{ "type": "geoshape", "projection": "projection" }]
  }],
  "legends": [{
    "fill": "color",
    "orient": "top-right",
    "title": "Unemployment",
    "titlePadding": 10,
    "padding": 12,
    "offset": 20,
    "format": "0%",
    "encode": {
      "labels": {
        "interactive": true,
        "enter": { "text": { "signal": "replace(datum.label,'–',' – ')" }, "fontSize": { "value": 12 } },
        "update": { "fill": { "value": "black" } },
        "hover": { "fill": { "value": "firebrick" } }
      },
      "title": { "update": { "fontSize": { "value": 14 } } },
      "legend": {
        "enter": {
          "stroke": { "value": "#000" },
          "fill": { "value": "#fff" },
          "fillOpacity": { "value": 0.6 },
          "strokeOpacity": { "value": 0.2 },
          "strokeWidth": { "value": 1.5 }
        }
      }
    }
  }],
  "signals": [
    { "name": "zoom", "value": 0 },
    { "name": "latitude", "value": 0 },
    { "name": "longitude", "value": 0 }
  ],
  "projections": [{
    "name": "projection",
    "type": "mercator",
    "scale": { "signal": "256*pow(2,zoom)/2/PI" },
    "rotate": [{ "signal": "-longitude" }, 0, 0],
    "center": [0, { "signal": "latitude" }],
    "translate": [{ "signal": "width/2" }, { "signal": "height/2" }]
  }]
}

;
