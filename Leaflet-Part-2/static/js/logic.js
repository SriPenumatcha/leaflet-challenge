// Create the map
var map = L.map('map').setView([20, 0], 2);

// Add base layers
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '© OpenStreetMap contributors, © OpenTopoMap (CC-BY-SA)'
});

var baseMaps = {
    "Street Map": streetMap,
    "Topographic Map": topoMap
};

// Create layer groups for earthquakes and tectonic plates
var earthquakeLayer = L.layerGroup();
var tectonicPlatesLayer = L.layerGroup();

var overlays = {
    "Earthquakes": earthquakeLayer,
    "Tectonic Plates": tectonicPlatesLayer
};

// Add layer control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// Fetch the earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Function to get color based on depth
    function getColor(depth) {
        return depth > 90 ? '#0000FF' :  // Blue
               depth > 70 ? '#1E90FF' :  // DodgerBlue
               depth > 50 ? '#FF0000' :  // Red
               depth > 30 ? '#FF4500' :  // OrangeRed
               depth > 10 ? '#FFA500' :  // Orange
                            '#FFD700';   // Gold
    }

    // Function to get radius based on magnitude
    function getRadius(magnitude) {
        return magnitude ? magnitude * 4 : 1;
    }

    // Add GeoJSON layer to the map
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function(feature) {
            return {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>Magnitude: " 
            + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "</p>");
        }
    }).addTo(earthquakeLayer);

    earthquakeLayer.addTo(map);

    // Add a legend to the map
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'legend'),
            depths = [-10, 10, 30, 50, 70, 90],
            labels = [];

        div.innerHTML += '<strong>Depth</strong><br>';
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
});

// Fetch the tectonic plates data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
    L.geoJSON(data, {
        style: function(feature) {
            return {
                color: "#ff7800",
                weight: 2
            };
        }
    }).addTo(tectonicPlatesLayer);

    tectonicPlatesLayer.addTo(map);
});
