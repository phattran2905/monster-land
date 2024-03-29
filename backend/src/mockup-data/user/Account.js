import bcrypt from "bcryptjs"
import { randomUID } from "../../util/random.js"

const Account = {
	uid: `A-${randomUID()}`,
	username: "test",
	email: "test@email.com",
	hashed_pwd: bcrypt.hashSync("123123", bcrypt.genSaltSync(10)),
}

export default Account
