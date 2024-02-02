module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.update = function(data) {
        // { data: {} }
        // update settings in local storage
        localStorage.setItem("settings", JSON.stringify(data.data))
    }

    this.read = function() {
        // if localstorage is nonexistent return null
        if(!localStorage.getItem("settings")) {
            return null;
        }
        // read from settings local storage
        return JSON.parse(localStorage.getItem("settings"));
    }

};