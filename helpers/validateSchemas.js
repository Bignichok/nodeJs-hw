const Joi = require("joi");

const addContactValidateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string(),
});

const updateContactValidateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
    token: Joi.string(),
}).min(1);

module.exports = {
    addContactValidateSchema,
    updateContactValidateSchema,
};
