import {Router} from 'express'
import {getUsers, createUser, getUser, updateUser, deleteUser, signUp, logIn, profile} from '../controllers/UserController'
import {TokenValidation} from '../utils/verifyToken'

const router = Router()



router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUser );
router.put('/users', updateUser);
router.delete('/users/:id', deleteUser );


router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.get('/profile', TokenValidation, profile);



export default router