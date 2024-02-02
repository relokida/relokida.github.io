module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.create = async function(data) {
        // request jwt from server...
        const response = (await props.method.axios.post("/user/create", {}));
        if(response.data.error) {
            throw new Error(response.data.error);
        }
        // set auth in localstorage
        localStorage.setItem("auth", response.data.data.data);
    }

    this.read = function(data) {
        // {}
        // if localstorage is nonexistent return null
        if(!localStorage.getItem("auth")) {
            return null;
        }

        // creating a new promise for the decode async
        return props.method.jwtDecode(localStorage.getItem("auth"));
    }

};