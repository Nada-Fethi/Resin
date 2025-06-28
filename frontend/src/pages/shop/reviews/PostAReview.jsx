// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviews.Api';

// eslint-disable-next-line react/prop-types
const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment,
      rating,
      userId: user?._id,
      productId: id,
    };

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await postReview(newComment).unwrap();
      alert('Comment posted successfully!');
      setComment('');
      setRating(0);
      refetch();
      handleClose(); // optionally close the modal after posting
    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  return (
    <div
    className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 modal-overlay 
      ${isModalOpen ?  "translate-x-0" : "translate-x-full"
    }`} >
      <div className="modal-con bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Post A Review</h2>

        <div className="flex items-center mb-4">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
    key={star} 
        onClick={() => handleRating(star)}
      className="clickable-text cursor-pointer text-yellow-500 text-xl"
    >
      {rating >= star ? (
        <i className="ri-star-fill"></i>
      ) : (
        <i className="ri-star-line"></i>
      )}
    </span>
  ))}
</div>


        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="custom-input w-full border border-gray-300 p-2 rounded-md mb-4"
          placeholder="Write your review..."
        ></textarea>

<div className="button-group">
  <button
  onClick={handleClose}
  className="btn cancel-btn">Cancel</button>
  <button
  onClick={handleSubmit}
  className="btn submit-btn">Submit</button>
</div>
      </div>
    </div>
  );
};

export default PostAReview;
