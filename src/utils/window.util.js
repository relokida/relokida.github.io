module.exports = function (props) {
    // private
    
    // public

    // privileged

    this.scrollToTop = function() {
        // For modern browsers
        if (window.scrollTo) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: smooth scrolling behavior
          });
        } else { // For older browsers
          document.documentElement.scrollTop = 0;
        }
      }

};