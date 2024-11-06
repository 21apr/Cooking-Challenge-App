import { Request, Response } from 'express';
import { User } from '../../model/users/userModel'
import jwt from 'jwt-simple';
import 'dotenv/config';
import bcrypt from 'bcrypt';

export async function login(req: Request, res: Response) {
    try {
       const secret=process.env.SECRET as string;
        console.log(secret)
        const { email, password } = req.body;
        console.log(email, password)

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const hashPassword = user.password as string;
        bcrypt.compareSync(password, hashPassword);

        //jwt
        const payload = {
            userId: user._id,
            email: user.email,
            name: user.name,
            role: user.isAdmin ? 'admin' : 'user'
        };

        const payloadJWT = jwt.encode(payload, secret);

        if (user) {
            res.cookie('userId', payloadJWT, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 1 });
            res.status(200).send({ ok: true });
        } else {
            res.status(401).send({ error: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error)
        res.status(500).send(error);

    }
}

export async function register(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).send({ error: 'Missing email, password or name' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        //save username and password to database
        const user = new User({ email, password: hashedPassword, name });


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' })
        }

        await user.save()
        //@ts-ignore


        res.status(200).send({ ok: true });

    } catch (error) {
        console.error(error)
        res.status(500).send(error);

    }
}