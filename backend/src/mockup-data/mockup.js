import MonsterInfoModel from "../models/monster/MonsterInfoModel.js"
import MonsterTypeModel from "../models/monster/MonsterTypeModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
import Monster from "./monster/Monster.js"
import MonsterType from "./monster/MonsterType.js"
import MonsterInfo from "./monster/MonsterInfo.js"
import Items from "./backpack/Item.js"
import ItemModel from "../models/backpack/ItemModel.js"
import Backpack from "./backpack/Backpack.js"
import TestAccount from "./user/Account.js"
import TestTrainer from "./user/Trainer.js"
import AccountModel from "../models/user/AccountModel.js"
import TrainerModel from "../models/user/TrainerModel.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import logger from "../util/logger.js"

export default async function initializeMockupData() {
	try {
		await Promise.all(MonsterType.map((i) => MonsterTypeModel.create(i)))
		await Promise.all(MonsterInfo.map((i) => MonsterInfoModel.create(i)))
		await Promise.all(Monster.map((i) => MonsterModel.create(i)))
		await Promise.all(Items.map((i) => ItemModel.create(i)))
		await AccountModel.create(TestAccount)
		await TrainerModel.create(TestTrainer)
		await BackpackModel.create(Backpack)
	} catch (error) {
		logger.error(error)
	}
}
