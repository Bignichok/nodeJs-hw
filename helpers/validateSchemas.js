const Joi = require("joi");

const addContactValidateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

const updateContactValidateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
}).min(1);

const registerUserValidateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginUserValidateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    token: Joi.string(),
});

module.exports = {
    addContactValidateSchema,
    updateContactValidateSchema,
    registerUserValidateSchema,
    loginUserValidateSchema,
};
