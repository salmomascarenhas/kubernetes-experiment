import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import dataSource from '../database'
import { Users } from '../database/entities/Users.entity'
class UsersControllers {

    public async login(request: Request, response: Response) {
        const { email, password } = request.body

        const usersRepository = dataSource.getRepository(Users)
        const user = usersRepository.findOneBy(email)

        if (!user)
            return response
                .status(StatusCodes.NOT_FOUND)
                .json({ status: 'NOT FOUND', message: 'Email or Password Error!' })

        return response
            .status(StatusCodes.OK).send()
    }

    // Store a new user;
    public async store(request: Request, response: Response) {
        const { name, email, password } = request.body

        const usersRepository = dataSource.getRepository(Users)

        // Verify if user exists.
        let user = await usersRepository.findOneBy({ email })

        if (user)
            return response
                .status(StatusCodes.CONFLICT)
                .json({ status: 'CONFLICT', message: 'Users already exists!' })

        // Create a new user.
        user = usersRepository.create({
            name,
            email,
            password
        })

        await usersRepository.save(user)

        return response.status(StatusCodes.OK).json(user)
    }

    // Find an user by id;
    public async index(request: Request, response: Response) {
        const { id } = request.params

        const usersRepository = dataSource.getRepository(Users)
        const user = await usersRepository.findOneBy({ id })

        if (!user)
            return response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ status: 'INTERNAL_SERVER_ERROR', message: 'User does not exists!' })


        return response.status(StatusCodes.OK).json(user)
    }

    // Return all users;
    public async show(request: Request, response: Response) {
        const usersRepository = dataSource.getRepository(Users)

        const users = await usersRepository.find()

        return response.status(StatusCodes.OK).json(users)
    }

    // Updat an users;
    public async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, email, password } = request.body

        const usersRepository = dataSource.getRepository(Users)
        const user = await usersRepository.findOneBy({ id })

        if (!user)
            return response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ status: 'INTERNAL_SERVER_ERROR', message: 'User does not exists!' })

        user.name = name || user.name
        user.email = email || user.email
        user.password = password || user.password

        await usersRepository.update(id, user)

        return response.status(StatusCodes.OK).json(user)
    }

    public async destroy(request: Request, response: Response) {
        const { id } = request.params

        const usersRepository = dataSource.getRepository(Users)
        const user = await usersRepository.delete({ id })

        return response.status(StatusCodes.ACCEPTED).send()
    }


}

export { UsersControllers }
