// Create the map
var map = L.map('map').setView([20, 0], 2);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

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
    }).addTo(map);

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


/*  */