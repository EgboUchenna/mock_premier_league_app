// tslint:disable-next-line: import-name
import Joi from 'joi';

export const validateTeam = (input: object) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    nick_name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    coach: Joi.string()
      .email()
      .required(),
    website: Joi.string()
      .min(3)
      .max(255)
      .required(),
    stadium_name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    stadium_capacity: Joi.string()
      .min(3)
      .max(255)
      .required(),
    founded: Joi.number().required(),
  };

  return Joi.validate(input, schema);
};
