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

const registerUserValidateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    addContactValidateSchema,
    updateContactValidateSchema,
    registerUserValidateSchema,
};
