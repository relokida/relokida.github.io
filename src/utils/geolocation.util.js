module.exports = function (props) {
    // private

    function inRange(data) {
        // { data: {}, filtering: {} }
        // boolean to check if the geolocation is within specified range
        const lat_range = Math.abs(data.data.geo_lat) + (0.014492754*data.filtering.radius) > Math.abs(data.filtering.geo_lat) && Math.abs(data.data.geo_lat) - (0.014492754*data.filtering.radius) < Math.abs(data.filtering.geo_lat);
        const lon_range = Math.abs(data.data.geo_lon) + (0.018315018*data.filtering.radius) > Math.abs(data.filtering.geo_lon) && Math.abs(data.data.geo_lon) - (0.018315018*data.filtering.radius) < Math.abs(data.filtering.geo_lon);
             
        if(!lat_range || !lon_range) {
            // if neither in lat or lon range return false
            return false;
        }
        return true;
    }
    
    // public

    // privileged

    this.getCurrentPosition = async function() {
        // obtain geolocation data from user client
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position);
            },
            (error) => {
                reject(error);
            });
        });
    }

    this.getRegion = function(data) {
        // { geo_lat: 0, geo_lon: 0 }
        // create a rounded latitude and longitude
        return { geo_lat: Math.floor(data.geo_lat), geo_lon: Math.floor(data.geo_lon) }
    }


    this.filterRange = function(data) {
        // { data: [], filtering: {} }
        // takes an array with geolocation properties and filters based on radius
        return data.data.filter((d) => {
            return inRange({ data: d.data, filtering: data.filtering });
        });
    }

    this.transmittable = function(data) {
        // { data: [],  }
        // checking that we're in range from the transmitters perspective
        return data.data.filter((d) => {
            return inRange({ data: data.filtering, filtering: d.data });
        });
    }

};