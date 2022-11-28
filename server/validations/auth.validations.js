const yup = require('yup');

class AuthValidations {
  static login() {
    return yup.object().shape({
      body: yup.object().shape({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required'),
      }),
    });
  }

  static register() {
    return yup.object().shape({
      body: yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(8, 'Password must be at least 8 characters'),
        //   .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
        //   ),
        confirmPassword: yup
          .string()
          .required('Confirm password is required')
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
        is18Plus: yup.boolean().required('You must be 18 or older'),
      }),
    });
  }
}

module.exports = AuthValidations;
