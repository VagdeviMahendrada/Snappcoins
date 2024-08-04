import React from 'react'

const Loader = () => {

    // useEffect(() => {
    //     // Get the preloader element
    //     var preloader = document.getElementById("preloader");
    
    //     // Function to remove the preloader and add the "loaded" class
    //     function removePreloader() {
    //       preloader.style.display = "none";
    //     }

    //     // Delay the removal of the preloader for 2 seconds (2000 milliseconds)
    //     setTimeout(removePreloader, 1000);
    //   }, []);

  return (
    <div className="loader"></div>
  )
}

export default Loader
