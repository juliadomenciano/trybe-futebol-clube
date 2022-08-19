// import Joi from 'joi';
// import jwt from 'jsonwebtoken';

// export function validateProduct(data: unknown) {
//   const schema = Joi.object({
//     name: Joi.string().required().min(3),
//     amount: Joi.string().required().min(3),
//   });

//   const { error } = schema.validate(data);

//   if (error) {
//     if (error.details[0].message.includes('length')
//     || error.details[0].message.includes('string')) {
//       const e = new Error(error.details[0].message);
//       e.name = 'LengthValidation';
//       throw e;
//     }
//     const e = new Error(error.details[0].message);
//     e.name = 'ValidationError';
//     throw e;
//   }
// }

// export function validateUser(data: unknown) {
//   const schema = Joi.object({
//     username: Joi.string().required().min(3),
//     classe: Joi.string().required().min(3),
//     level: Joi.number().required().min(1),
//     password: Joi.string().required().min(8),
//   });
//   const { error } = schema.validate(data);
//   if (error) {
//     if (error.details[0].message.includes('required')) {
//       const e = new Error(error.details[0].message);
//       e.name = 'ValidationError';
//       throw e;
//     }
//     const e = new Error(error.details[0].message);
//     e.name = 'LengthValidation';
//     throw e;
//   }
// }

// export function validateToken(authorization: string) {
//   const JWT_SECRET = 'theBestSecretEver';
//   if (!authorization) {
//     const error = new Error('Token not found');
//     error.name = 'Authorization';
//     throw error;
//   }
//   try {
//     const payload = jwt.verify(authorization, JWT_SECRET);
//     return payload;
//   } catch (e) {
//     const error = new Error('Invalid token');
//     error.name = 'Authorization';
//     throw error;
//   }
// }
