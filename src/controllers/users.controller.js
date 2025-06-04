import { usersService } from "../services/index.js"

const getAllUsers = async(req,res) => {
	try {
		const users = await usersService.getAll();
		res.status(200).send({status:"success", message: "Pedido de usuarios logrado", payload: [users]})
	} catch (error) {
		res.status(500).send({status:"error", message: "Error del servidor"})
	}
}

const createUser = async (req, res) => {
	try {
		const newUser = req.body;
		console.log(newUser)
		const userResult = await usersService.create(newUser);
		console.log(newUser,userResult)
		res.status(201).send({status: "success", message: "Usuario creado", payload: userResult});
	} catch (error) {
		console.log(error)
		res.status(500).send({status:"error", message: "Error del servidor al crear un usuario", error: error})
	}
}

const getUser = async(req,res)=> {
	try {
		const userId = req.params.uid;
		const user = await usersService.getUserById(userId);
		if(!user) return res.status(404).send({status:"error", message: "Usuario no encontrado"})
		res.status(200).send({status:"success", message: "Usuario encontrado", payload: user})
	} catch (error) {
		res.status(500).send({status:"error", message: "Error del servidor"})
	}
}

const updateUser = async(req,res) => {
	try {
		const updateBody = req.body;
		const userId = req.params.uid;
		const user = await usersService.getUserById(userId);
		if(!user) return res.status(404).send({status:"error", message: "Usuario no encontrado"})
		const result = await usersService.update(userId,updateBody);
		res.status(200).send({status:"success", message:"Usuario actualizado"})
	} catch (error) {
		res.status(500).send({status:"error", message: "Error del servidor"})
	}
}

const deleteUser = async(req,res) =>{
	try {
		const userId = req.params.uid;
		const foundUser = await usersService.getUserById(userId);
		
		if (foundUser) {
			const result = await usersService.delete(userId);
			res.status(200).send({status:"success", message:"Usuario eliminado"})
		} else {
			console.log("das")
			res.status(404).send({status:"error", message: "Usuario no encontrado"})
		}
	} catch (error) {
		res.status(500).send({status:"error", message: "Error del servidor"})
	}
}

export default {
	createUser,
	deleteUser,
	getAllUsers,
	getUser,
	updateUser
}