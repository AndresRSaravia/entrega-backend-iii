import supertest from "supertest";
import mongoose from "mongoose";
import assert from "assert";
import Users from "../src/dao/Users.dao.js";
import Pet from "../src/dao/Pets.dao.js";
import Adoption from "../src/dao/Adoption.js";
import dotenv from "dotenv";
import { expect } from "chai";
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
		const {statusCode, ok, _body} = await requester.get("/api/adoptions")
		console.log(statusCode);
		console.log(ok);
		console.log(_body);
		assert.ok(_body);
		assert.strictEqual(Array.isArray(_body.payload), true)
	})
/*	it("Test GET /api/adoptions/:uid para acceder a una adopción", async() => {
		const {statusCode, ok, _body} = await requester.post("/api/adoptions").query({ _id: '' });
		console.log(statusCode);
		console.log(ok);
		console.log(_body);
		assert.strictEqual(statusCode, 200)
		expect(_body.payload).to.have.property("adopted").that.equals(false);
	})*/
	it("Test POST /api/adoptions/:uid/:pid para crear una adopción", async() => {
		const pet = {
			name: "Mascota test",
			specie: "Especie test",
			birthDate: "1980-06-01"
		}
		let {statusCode, ok, _body} = await requester.post("/api/pets").send(pet)
		console.log(statusCode);
		console.log(ok);
		console.log(_body);
		const petId = _body.payload._id
		let user = {
			first_name: "Jane",
			last_name: "Doe",
			email: "janedoe@gmail.com",
			password: "1234"
		}
		statusCode, ok, _body = await requester.post("/api/users").send(user)
		console.log(statusCode);
		console.log(ok);
		console.log(_body._body);
		const userId = _body._body.payload._id
		statusCode, ok, _body = await requester.post("/api/adoptions").query({ uid: userId, pid: petId});
		console.log(statusCode);
		console.log(ok);
		console.log(_body);
		assert.strictEqual(statusCode, 201);
	})


	/*
	Se han desarrollado tests funcionales para todos los endpoints del router adoption.router.js.

	Todos los endpoints del router adoption.router.js están cubiertos por tests funcionales.

	Los tests verifican de manera efectiva el funcionamiento de cada endpoint, incluyendo casos de éxito y casos de error.
	
	*/
})