import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CameraIcon } from '@heroicons/react/outline';
import Rating from '../Utils/Rating';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserAPI } from '../../api';
import LoaderIcon from '../../assets/icons/LoaderIcon';
import useLoggedIn from '../../hooks/useLoggedIn';

const initialValues = {
  profileImage: null,
  name: '',
  company: '',
  companyLicense: '',
  companyWebsiteLink: '',
  bio: '',
};

const validationSchema = yup.object().shape({
  profileImage: yup.mixed(),
  name: yup.string().required('Name is required'),
  company: yup.string(),
  companyLicense: yup.string(),
  companyWebsiteLink: yup.string().url('Company website link is not valid'),
  bio: yup.string(),
});

const ProfileForm = () => {
  const { recheck } = useLoggedIn();

  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery(
    'profile',
    UserAPI.getProfile,
    {}
  );

  const { mutate: update, isLoading: isUpdating } = useMutation(
    'updateProfile',
    (values) => UserAPI.updateProfile(values),
    {
      onSuccess: (data) => {
        queryClient.setQueryData('profile', data);

        localStorage.setItem(
          'user',
          JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
          })
        );
        recheck();
      },
    }
  );

  const onSubmit = (values) => {
    const formData = new FormData();

    if (values.name) {
      formData.append('name', values.name);
    }
    if (values.company) {
      formData.append('company', values.company);
    }
    if (values.companyLicense) {
      formData.append('companyLicense', values.companyLicense);
    }
    if (values.companyWebsiteLink) {
      formData.append('companyWebsiteLink', values.companyWebsiteLink);
    }
    if (values.bio) {
      formData.append('bio', values.bio);
    }
    if (values.profileImage) {
      formData.append('profileImage', values.profileImage);
    }

    update(formData);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (profile) {
      formik.setValues(profile);
      formik.setFieldValue('profileImage', null);
    }
  }, [profile]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="relative mt-3 grid grid-cols-1 gap-x-16 gap-y-4 px-4 py-3 md:grid-cols-2"
    >
      {/* overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-400/5">
          <LoaderIcon className="h-16 w-16 text-gray-400" />
        </div>
      )}

      <div className="flex items-center justify-center gap-2 sm:gap-4 md:col-span-2">
        {/* profile pic */}
        <div className="relative flex h-24 w-24 flex-shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-gray-600 text-gray-500 sm:h-28 sm:w-28">
          <CameraIcon className="h-10 w-10 sm:h-12 sm:w-12" />
          <span className="text-xs font-bold">Add Photo</span>
          {(profile?.profileImage || formik.values.profileImage) && (
            <img
              src={
                formik.values.profileImage
                  ? URL.createObjectURL(formik.values.profileImage)
                  : profile?.profileImage
              }
              alt="profile"
              className="absolute inset-0 h-full w-full bg-white object-cover"
            />
          )}
          <input
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(e) => {
              formik.setFieldValue('profileImage', e.target.files[0]);
            }}
          />
        </div>
        {/* details */}
        <div>
          <h4 className="text-xl font-medium">{profile?.name}</h4>
          <div className="flex items-center gap-1 text-xs font-medium">
            Reviews
            <Rating reviews={profile?.reviews || []} showLength />
          </div>
          <p className="text-xs font-medium">Member since Mar 2021</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Write your name"
            className="mt-0.5 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-800 transition focus:border-primary-500 focus:ring-1 focus:ring-primary-600"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="mt-1 text-xs text-red-600">
              * {formik.errors.name}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="company" className="font-medium">
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="Company Name"
            className="mt-0.5 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-800 transition focus:border-primary-500 focus:ring-1 focus:ring-primary-600"
            {...formik.getFieldProps('company')}
          />
          {formik.touched.company && formik.errors.company && (
            <div className="mt-1 text-xs text-red-600">
              * {formik.errors.company}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="companyLicense" className="font-medium">
            Company License
          </label>
          <input
            id="companyLicense"
            type="text"
            placeholder="License number"
            className="mt-0.5 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-800 transition focus:border-primary-500 focus:ring-1 focus:ring-primary-600"
            {...formik.getFieldProps('companyLicense')}
          />
          {formik.touched.companyLicense && formik.errors.companyLicense && (
            <div className="mt-1 text-xs text-red-600">
              * {formik.errors.companyLicense}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="companyWebsiteLink" className="font-medium">
            Company Website Link
          </label>
          <input
            id="companyWebsiteLink"
            type="url"
            placeholder="Website Link"
            className="mt-0.5 w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-800 transition focus:border-primary-500 focus:ring-1 focus:ring-primary-600"
            {...formik.getFieldProps('companyWebsiteLink')}
          />
          {formik.touched.companyWebsiteLink &&
            formik.errors.companyWebsiteLink && (
              <div className="mt-1 text-xs text-red-600">
                * {formik.errors.companyWebsiteLink}
              </div>
            )}
        </div>
      </div>
      <div>
        <div className="flex h-full flex-col">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            placeholder="Write your bio"
            className="mt-0.5 min-h-[8rem] w-full flex-1 resize-none rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-800 transition focus:border-primary-500 focus:ring-1 focus:ring-primary-600"
            {...formik.getFieldProps('bio')}
          />
          {formik.touched.bio && formik.errors.bio && (
            <div className="mt-1 text-xs text-red-600">
              * {formik.errors.bio}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 text-center md:col-span-2">
        <button
          className=" rounded-xl bg-primary-500 py-1 px-8 font-semibold text-white transition hover:bg-primary-600 disabled:bg-gray-400"
          type="submit"
          disabled={!formik.isValid || isUpdating}
        >
          {isUpdating ? <LoaderIcon /> : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
