import supertest from "supertest";
import mongoose from "mongoose";
import assert from "assert";
import Users from "../src/dao/Users.dao.js";


import dotenv from "dotenv";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");
const MONGOURL = "";
const connection = mongoose.connect(MONGOURL);

describe("Test del DAO de usuarios", function() {
	before(function () {
		this.userDAO = new Users()
	})
	beforeEach(async function () {
		await mongoose.connection.collections.users.drop()
		this.timeout(5000)
	})
	it("El GET retorna una array", async function () {
		const result = await this.userDAO.get()
		assert.strictEqual(Array.isArray(result), true);
	})
	it("El POST de un usuario funciona", async function () {
		let user = {
			first_name: "John",
			last_name: "Doe",
			email: "jd@gmail.com",
			password: "1234"
		}
		const result = await this.userDAO.save(user)
		assert.ok(result._id);
	})
	it("Búsqueda usuario por email", async function () {
		let user = {
			first_name: "John",
			last_name: "Doe",
			email: "jd@gmail.com",
			password: "1234"
		}
		await this.userDAO.save(user)
		const foundUser = await this.userDAO.getBy({email: user.email})
		assert.strictEqual(typeof foundUser, "object");
	})
	it("Se verifica que el arreglo de mascotas es vacío", async function () {
		let user = {
			first_name: "John",
			last_name: "Doe",
			email: "jd@gmail.com",
			password: "1234"
		}
		const result = await this.userDAO.save(user)
		assert.deepStrictEqual(result.pets, []);
	})
	after(async function () {
		await mongoose.disconnect();
	})
})

