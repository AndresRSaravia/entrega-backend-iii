import supertest from "supertest";
import mongoose from "mongoose";
import assert from "assert";
import dotenv from "dotenv";
import { usersService } from "../src/services/index.js";

const requester = supertest("http://localhost:8080");
const MONGOURL = "mongodb+srv://Coderhouse:LGq5DquPk9frqrXz@clustertest.xo7pn.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest/";
const connection = mongoose.connect(MONGOURL);

describe("Testing de la App Web Adoptame: Adopciones", () => {
	beforeEach(async function () {
		await mongoose.connection.collections.adoptions.drop()
		await mongoose.connection.collections.users.drop()	
		await mongoose.connection.collections.pets.drop()
		this.timeout(5000)
	})
	it("Test GET de /api/adoptions para recibir todas las adopciones", async() => {
		let response = await requester.get("/api/adoptions")
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		assert.ok(response._body.payload);
		assert.strictEqual(Array.isArray(response._body.payload), true)
	})
	it("Test GET /api/adoptions/:uid para acceder a una adopción (existe)", async() => {
		const pet = {
			name: "Mascota test",
			specie: "Especie test",
			birthDate: "1980-06-01"
		}
		let response = await requester.post("/api/pets").send(pet)
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const petId = response._body.payload._id
		let user = {
			first_name: "Jane",
			last_name: "Doe",
			email: "janedoe@gmail.com",
			password: "1234"
		}
		response = await requester.post("/api/users").send(user)
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const userId = response._body.payload._id
		response = await requester.post(`/api/adoptions/${userId}/${petId}`);
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const adopId = response._body.payload._id
		response = await requester.get(`/api/adoptions/${adopId}`);
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		assert.ok(response._body.payload);
		assert.strictEqual(response.statusCode, 200)
	})
	it("Test GET /api/adoptions/:uid para acceder a una adopción (no existe)", async() => {
		let response = await requester.get("/api/adoptions/000000000000000000000000");
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		assert.strictEqual(response.statusCode, 404)
	})
	it("Test POST /api/adoptions/:uid/:pid para crear una adopción (datos válidos)", async() => {
		const pet = {
			name: "Mascota test",
			specie: "Especie test",
			birthDate: "1980-06-01"
		}
		let response = await requester.post("/api/pets").send(pet)
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const petId = response._body.payload._id
		let user = {
			first_name: "Jane",
			last_name: "Doe",
			email: "janedoe@gmail.com",
			password: "1234"
		}
		response = await requester.post("/api/users").send(user)
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const userId = response._body.payload._id
		response = await requester.post(`/api/adoptions/${userId}/${petId}`);
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		assert.ok(response._body.payload);
		assert.strictEqual(response.statusCode, 201);
		response = await requester.get(`/api/pets/`);
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const pets = response._body.payload
		assert.strictEqual(pets.filter((pet) => pet._id === petId)[0].adopted, true);
	})
	it("Test POST /api/adoptions/:uid/:pid para crear una adopción (usuario no válido)", async() => {
		const pet = {
			name: "Mascota test",
			specie: "Especie test",
			birthDate: "1980-06-01"
		}
		let response = await requester.post("/api/pets").send(pet)
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const petId = response._body.payload._id
		const userId = "000000000000000000000000"
		response = await requester.post(`/api/adoptions/${userId}/${petId}`);
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		assert.strictEqual(response.statusCode, 404);
	})
	it("Test POST /api/adoptions/:uid/:pid para crear una adopción (mascota no válida)", async() => {
		const petId = "000000000000000000000000"
		let user = {
			first_name: "Jane",
			last_name: "Doe",
			email: "janedoe@gmail.com",
			password: "1234"
		}
		let response = await requester.post("/api/users").send(user)
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		const userId = response._body.payload._id
		response = await requester.post(`/api/adoptions/${userId}/${petId}`);
		console.log(response.statusCode);
		console.log(response.ok);
		console.log(response._body);
		assert.strictEqual(response.statusCode, 404);
	})
})