import React, { useState } from 'react';
import { Field, Form, Formik, FieldAttributes } from 'formik';
import { GiFlowerEmblem } from 'react-icons/gi';

interface StarRatingProps extends FieldAttributes<any> {
  form: {
    setFieldValue: (field: string, value: number) => void;
  };
}

// Custom StarRating component
const StarRating: React.FC<StarRatingProps> = ({ field, form }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: number) => {
    setRating(value);
    form.setFieldValue(field.name, value);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          style={{ color: i <= rating ? 'gold' : 'gray', cursor: 'pointer' }}
          className='text-2xl'
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};
export default StarRating;