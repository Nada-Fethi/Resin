// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import CIcon from "../../../assets/avatar.png";
import { formatDate } from '../../../utils/formateDate';
import RatingStars from '../../../components/RatingStars';
import PostAReview from './PostAReview';
import { useSelector } from 'react-redux';


// eslint-disable-next-line react/prop-types
const ReviewsCard = ({ productReviews }) => {
  const { user } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false)
    const reviews =productReviews || []

    const handleOpenReviewModal = () => {
      setIsModalOpen(true)
    }
    const handleCloseReviewModal = () => {
      setIsModalOpen(false)
    }

  return (
    <div className='my-6 bg-white p-8 rounded shadow'>
      <div>
        {reviews.length > 0 ?   (
          <div>
            <h3 className='text-lg font-medium mb-4'>All comments...</h3>
            <div className='space-y-4'>
              {reviews.map((review, index) => (
                <div key={index} className='mt-4'>
                  <div className='review-card flex gap-4 items-center'>
                  <img
                    src={CIcon || user?.profileImage}
                    alt="User Avatar"
                    className='size-14 my-element'
                  />
                  <div className='review-card-content space-y-1 review-card-content'>
                  <p className='review-username font-medium text-lg underline capitalize underline-offset-4 text-blue-400 text-gray-900 review-username'>{review?.userId?.username} </p>
                  <p className='review-date text-[12px] italic review-date'>{formatDate(review?.updatedAt)} </p>
                  <RatingStars rating={review?.rating} />
                  </div>
                  </div>
                  <div className='review-comment-box'>
                    <p className='md:w-4/5'>{review?.comment} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) :
          <p className='text-gray-500 italic'>No reviews yet!</p>
         }
      </div>

      <div>
      <button
      onClick={handleOpenReviewModal}
  className='add-review-btn'
>
  Add A Review
</button>

      </div>


<PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />


</div>

  )
}

export default ReviewsCard;
