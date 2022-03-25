import {Request, Response} from 'express'
import {getRepository, getConnection} from 'typeorm'
import {User} from '../entity/User'
import {encryptPassword,validatePassword} from '../utils/encrypt'
import jwt from 'jsonwebtoken'
import { userInfo } from 'os'

//CRUD

export const getUsers = async(req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
}

export const getUser = async(req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    return res.json(user);
}

export const createUser = async(req: Request, res: Response): Promise<Response> => {
   const newUser =  getRepository(User).create(req.body);
   const results = await getRepository(User).save(newUser);
   return res.json(results);
}

export const updateUser = async(req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }

    return res.status(404).json({msg: 'Not user found'});
}

export const deleteUser = async(req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).delete(req.params.id);
    return res.json(user);
}

//----------------------------------------------------------------------------------------------------
    
export const signUp = async(req: Request, res: Response): Promise<Response> => {
    //.manager.find(User,{where:{email:req.body.email}})
    const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("User")
    .where("User.email = :User_email", { User_email: req.body.email})
    .getOne();
    
    if(!user){
        //Encriptando la contraseña
        req.body.password = await encryptPassword(req.body.password);
        const newUser =  getRepository(User).create(req.body);
        const results = await getRepository(User).save(newUser);

        //Creando el token
        const token:string  = jwt.sign({_id: req.body.password}, process.env.TOKEN_SECRET || 'tokentest'); 
        return res.header('Token',token).json(results);
    }
    
    return res.status(404).json({msg: 'User already exist'});
}

export const logIn = async(req: Request, res: Response): Promise<Response> => {

    const user = await getConnection()
    .getRepository(User)
    .createQueryBuilder("User")
    .where("User.email = :User_email", { User_email: req.body.email})
    .getOne();
    
    if(user){
        const esValida = await validatePassword(req.body.password, user.password);
        if(!esValida){
            return res.status(404).json({msg: 'Invalid password'});
        }

        const token:string  = jwt.sign({ id: user.id}, process.env.TOKEN_SECRET || 'tokentest' , {
            expiresIn: 60 * 60 
        })
        return res.header('auth-token', token).json(user);
    }
    
    return res.status(404).json({msg: 'Email or password is wrong'});
}

export const profile = async (req : Request, res : Response) => {
    const user = await getRepository(User).findOne(req.userId);

    if(!user)
    {
        return res.status(404).json("No user found")
    }
    return res.json(user)
}