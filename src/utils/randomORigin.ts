interface OriginImageMapping {
    [key: string]: string;
  }
  
  const getRandomImageUrl = (origin: string): string => {
    const originImageMapping: OriginImageMapping = {
      japan: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1200px-Flag_of_Japan.svg.png",
      china: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/2560px-Flag_of_the_People%27s_Republic_of_China.svg.png",
      vietnam:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png",
      france:"https://cdn.britannica.com/82/682-004-F0B47FCB/Flag-France.jpg",
      indonesia:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Flag_of_Indonesia_%28bordered%29.svg/2560px-Flag_of_Indonesia_%28bordered%29.svg.png",
      thailand:"https://www.flagcolorcodes.com/images/jpg/thailand.jpg",
      korea:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/800px-Flag_of_South_Korea.svg.png"
      // Add more origin-image mappings as needed
    };
  
    const lowercaseOrigin = origin.toLowerCase();
  
    return originImageMapping[lowercaseOrigin] || "https://upload.wikimedia.org/wikipedia/commons/2/2e/Unknown_flag_-_European_version.png";
  };
  export default getRandomImageUrl;