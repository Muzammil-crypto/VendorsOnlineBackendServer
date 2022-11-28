const yup = require('yup');
const ObjectId = require('mongoose').Types.ObjectId;

class ChatValidations {
  static createChat() {
    return yup.object().shape({
      body: yup.object().shape({
        users: yup
          .array()
          .of(
            yup.string().test('ObjectId', 'Invalid id', (value) => {
              return ObjectId.isValid(value);
            })
          )
          .min(2, 'Minimum of 2 users')
          .required('Users are required'),
      }),
    });
  }

  static getChat() {
    return yup.object().shape({
      params: yup.object().shape({
        id: yup
          .string()
          .test('ObjectId', 'Invalid id', (value) => {
            return ObjectId.isValid(value);
          })
          .required('Chat id is required'),
      }),
    });
  }

  static addTextMessage() {
    return yup.object().shape({
      params: yup.object().shape({
        id: yup
          .string()
          .test('ObjectId', 'Invalid id', (value) => {
            return ObjectId.isValid(value);
          })
          .required('Chat id is required'),
      }),
      body: yup.object().shape({
        text: yup.string().required('Text is required'),
        receiverId: yup.string().test('ObjectId', 'Invalid id', (value) => {
          return ObjectId.isValid(value);
        }),
      }),
    });
  }

  static addReferenceMessage() {
    return yup.object().shape({
      params: yup.object().shape({
        id: yup
          .string()
          .test('ObjectId', 'Invalid id', (value) => {
            return ObjectId.isValid(value);
          })
          .required('Chat id is required'),
      }),
      body: yup.object().shape({
        text: yup.string().required('Text is required'),
        job: yup
          .string()
          .test('ObjectId', 'Invalid id', (value) => {
            return ObjectId.isValid(value);
          })
          .required('GIG is required'),
        receiverId: yup.string().test('ObjectId', 'Invalid id', (value) => {
          return ObjectId.isValid(value) || !value;
        }),
        referenceType: yup.string().oneOf(['positive', 'negative', 'neutral']),
      }),
    });
  }
}

module.exports = ChatValidations;
