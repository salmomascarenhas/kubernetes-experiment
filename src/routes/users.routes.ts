import { celebrate, Joi, Segments } from "celebrate"
import { Router } from "express"
import { UsersControllers } from '../controllers'

const usersRouters = Router()
const usersController = new UsersControllers()

usersRouters.post(
    '/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    usersController.store
)

usersRouters.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().required()
        }),
    }),
    usersController.index
)

usersRouters.get(
    '/',
    usersController.show
)

usersRouters.patch(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().required()
        }),
    }),
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().optional(),
        }),
    }),
    usersController.update
)

usersRouters.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().required()
        }),
    }),
    usersController.destroy
)

usersRouters.post(
    '/login',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    usersController.login
)

export { usersRouters }

