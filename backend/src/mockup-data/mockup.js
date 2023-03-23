import MonsterInfoModel from "../models/monster/MonsterInfoModel.js"
import MonsterTypeModel from "../models/monster/MonsterTypeModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
import Monster from "./monster/Monster.js"
import MonsterType from "./monster/MonsterType.js"
import MonsterInfo from "./monster/MonsterInfo.js"
import Items from "./backpack/Item.js"
import ItemModel from "../models/backpack/ItemModel.js"
import Backpack from "./backpack/Backpack.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import logger from "../util/logger.js"

export default async function initializeMockupData() {
	try {
		await Promise.all(MonsterType.map((i) => MonsterTypeModel.create(i)))
		await Promise.all(MonsterInfo.map((i) => MonsterInfoModel.create(i)))
		await Promise.all(Monster.map((i) => MonsterModel.create(i)))
		await Promise.all(Items.map((i) => ItemModel.create(i)))
		await BackpackModel.create(Backpack)
	} catch (error) {
		logger.error(error)
	}
}
