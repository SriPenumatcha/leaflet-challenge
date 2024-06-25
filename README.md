# leaflet-challenge.


## Overview

This project is divided into two parts:

Part 1: Create the Earthquake Visualization - Visualize earthquake data using Leaflet and D3.js. The map displays earthquake occurrences from the past week, where the size of each marker represents the magnitude of the earthquake, and the color represents the depth. Additionally, the map includes a legend that indicates the depth range corresponding to each color.

Part 2: Gather and Plot More Data - Enhanced the map by plotting the tectonic plates dataset in addition to the earthquakes. Added other base maps to choose from, put each dataset into separate overlays that can be turned on and off independently, and added layer controls to the map.


## Technologies Used

**OpenStreetMap**: The base map used for visualization.

**D3.js**: A JavaScript library for producing dynamic, interactive data visualizations in web browsers.

**Leaflet**: An open-source JavaScript library for interactive maps.

**HTML/CSS**: For structuring and styling the web application.


### Folder Structure 

The leaflet challenge consists of the following folders and files:

#Leaflet-Part-1 **

---**index.html** - The main HTML file that includes the map container and references to the required CSS and JavaScript files.

---**static/css/style.css:** The CSS file for styling the map and legend.

---**static/js/logic.js**: The JavaScript file that handles fetching the earthquake data, plotting the markers on the map, and creating the legend.

#Leaflet-Part-2**
 
---**index.html** - The main HTML file that includes the map container and references to the required CSS and JavaScript files.

---**static/css/style.css:** The CSS file for styling the map and legend.

--**static/js/logic.js**: The JavaScript file that handles fetching the earthquake data, plotting the markers on the map, and creating the legend & layer Controls.

 
**leaflet Challenge Screenshots** - Provides screenshots of the results.

**Readme.md**-Overview of the project.


## How to Use

Clone the GitHub repository to your local machine using the following command:

git clone https://github.com/SriPenumatcha/leaflet-challenge.git

#Navigate to Leaflet-Part-1 folder

1.Open the index.html file in your preferred web browser to view the map.

2.Click on any earthquake marker to see detailed information about the earthquake, including its location, magnitude, and depth.

3.Refer to the legend on the bottom right to understand the color coding for earthquake depths.


#Navigate to Leaflet-Part-2 folder

1. Open the index.html file in your preferred web browser to view the map.
2. Use the layer controls to toggle between different datasets and base maps. You can turn on/off the earthquake data, tectonic plates data, and switch between street and topographic base maps.
3. Click on any earthquake marker to see detailed information about the earthquake, including its location, magnitude, and depth.
4. Refer to the legend on the bottom right to understand the color coding for earthquake depths.