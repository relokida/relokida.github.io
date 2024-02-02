module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.searchCity = async function(data) {
        // { keyword: "" }
        // search for city by keyword
        const response = (await props.method.axios.get(`/search/city/${data.keyword}`));
        if(response.data.error) {
            throw new Error(response.data.error);
        }
        // return result
        return response.data.data.data;
    }

    this.searchGeolocation = async function(data) {
        // { geo_lat: 0, geo_lon: 0 }
        // search for city by geolocation
        const response = (await props.method.axios.get(`/search/geolocation/${data.geo_lat}/${data.geo_lon}`));
        if(response.data.error) {
            throw new Error(response.data.error);
        }
        // return result
        return response.data.data.data;
    }

};