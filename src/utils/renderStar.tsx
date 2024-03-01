import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const renderRating = (rating: number): JSX.Element => {
    const stars: JSX.Element[] = [];
    const maxRating: number = 5; // Maximum rating, adjust as needed
  
    for (let i = 1; i <= maxRating; i++) {
      const starColor = i <= rating ? 'yellow' : 'gray'; 
      stars.push(<FaStar key={i} color={starColor} size={20} />);
    }

    return (
    <div className="text-md flex flex-row">{stars}</div>
    )
  };
  

  export default renderRating;