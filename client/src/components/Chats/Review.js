import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RatingInput from '../Utils/RatingInput';
import { useMutation, useQueryClient } from 'react-query';
import { JobAPI } from '../../api';

const initialValues = {
  rating: 1,
  comment: '',
};

const validationSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .required('Rating is required'),
  comment: Yup.string(),
});

const Review = ({ initialValue, chatId, message }) => {
  const queryClient = useQueryClient();

  const { mutate: reviewJob } = useMutation(JobAPI.reviewJob, {
    onSuccess: (newReview) => {
      queryClient.setQueryData(['chat', chatId], (old) => {
        const oldMessage = old.messages.find((m) => m._id === message._id);

        if (!oldMessage) return old;

        oldMessage.job.reviews.push(newReview);

        return old;
      });
    },
  });

  const onSubmit = (values) => {
    reviewJob({
      id: message.job._id,
      rating: values.rating,
      comment: values.comment,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (initialValue) {
      formik.setFieldValue('rating', initialValue.rating);
      formik.setFieldValue('comment', initialValue.comment);
    }
  }, [initialValue]);

  return (
    <form className="mt-3 text-sm sm:text-base" onSubmit={formik.handleSubmit}>
      <h5 className="font-bold">Review:</h5>
      <RatingInput
        value={formik.values.rating}
        setValue={(value) => formik.setFieldValue('rating', value)}
        disabled={initialValue}
        className="mt-1"
      />

      <div className="">
        <label className="block" htmlFor="comment">
          Comment:
        </label>
        <textarea
          className="mt-1 w-full resize-none rounded-md border border-green-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-green-100 disabled:text-green-800"
          id="comment"
          {...formik.getFieldProps('comment')}
          disabled={initialValue}
        />
      </div>

      {!initialValue && (
        <div className="w-full text-right">
          <button
            type="submit"
            className="mt-1 rounded-md bg-green-500 px-3 py-1 text-white transition disabled:bg-gray-300"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default Review;
