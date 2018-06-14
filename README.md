# Visual Enerlyst

A d3.js app which utilises the technique of hexagonal binning for visualizing energy usage density of public and private housings from dataset on Energy Market Authority (EMA). By aggregating the number of address points into hexagons and computing the average energy consumption of address points in these hexagons, we aim to visualize energy consumption levels of address points aggregated across smaller areas in hex bins to generate a more detailed view of energy usages across geographical land space. 

## Features

* Uploading of data
* Hexagon Binning
* Line Chart

## To Use

### 1. Geocoding Postal Codes
To be able to plot the postal codes on a map, there is a need to convert the postal codes to longitude and latitude. a [geocoder app](https://github.com/jiajunng/SgPostalToLatLng) that calls upon OneMap's search API. The geocoder is able to read an excel workbook containing the postal codes, and returns an updated excel workbook containing the longitude and latitude for each postal code

### 2. Upload Data from EMA

#### Public Housing
The data to be uploaded should be in the following format:

| Attribute        | Description           | 
| ------------- |:-------------:| 
| Postal Code      | 	Postal code of a public residential building | 
| oneroom      | Average electricity consumed by 1-room flats in the building      | 
| threeroom | Average electricity consumed by 3-room flats in the building      | 
| fourroom      | Average electricity consumed by 4-room flats in the building | 
| fiveroom      | Average electricity consumed by 5-room/executive flats in the building      | 
| average | Average electricity consumed by all flats in the building      |
| year      | Year in which the amount of electricity was consumed and measured | 
| month      | Month in which the amount of electricity was consumed and measured      | 
| lat | Latitude of the building      |
| long | Longitude of the building      |
| address | Address of the building      |

#### Private Housing
The data to be uploaded should be in the following format:

| Attribute        | Description           | 
| ------------- |:-------------:| 
| Postal Code      | 	Postal code of a public residential building |  
| average | Average electricity consumed by all flats in the building      |
| year      | Year in which the amount of electricity was consumed and measured | 
| month      | Month in which the amount of electricity was consumed and measured      | 
| lat | Latitude of the building      |
| long | Longitude of the building      |
| address | Address of the building      |

### Measuring Average 
Limitation from EMA's datasets:

For public housing, the data provided by EMA only shows the average electricity consumption by all apartments that falls under the same dwelling type. For instance, the dataset for July 2015 would indicatethat 3-room flats in postal code 824601 used an average of 339 kwh of electricity. The crucial information that we were unable to obtain is how many 3-room flats are in postal code 824601, or what is the total electricity consumed by all the 3-room flats. This makes it impossible to accurately compute each postal code's weighted-average electricity consumption.

The only measure to determine the public housings' hexbin color intensity is thus the average of averages. That is, for each postal code, take the average energy consumption of 1-room/2-room, 3-room, 4-room and 5-room/executive apartments and treat that as the postal code average. However, this is a very inaccurate representation of the actual postal code average, unless the postal code has an equally distribute number of dwelling types.
.
