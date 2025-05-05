import MockingService from '../services/mocking.js';
import { petsService } from "../services/index.js";
import { usersService } from "../services/index.js";

const createPets = async (req,res)=>{
	//const npets = req.params.npets;
	const pets = await MockingService.generateMockingPets(50)
	res.send({status:"success",payload:pets})
}

const createUsers = async (req,res)=>{
	//const nusers = req.params.nusers;
	const users = await MockingService.generateMockingUsers(50)
	res.send({status:"success",payload:users})
}

const generateData = async (req,res)=>{
	const {nusers,npets} = req.body;
	const users = await MockingService.generateMockingUsers(nusers)
	for (let index = 0; index < nusers; index++) {
		const result = await usersService.create(users[index]);
		console.log(result)
	}
	const pets = await MockingService.generateMockingPets(npets)
	for (let index = 0; index < npets; index++) {
		const result = await petsService.create(pets[index]);
		console.log(result)
	}
	res.send({status:"success",message:`se agregaron ${nusers} usuario(s) y ${npets} mascota(s)`})
}

export default {
	createPets,
	createUsers,
	generateData
}