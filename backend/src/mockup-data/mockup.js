import MonsterInfoModel from "../models/monster/MonsterInfoModel.js"
import MonsterTypeModel from "../models/monster/MonsterTypeModel.js"
import MonsterModel from "../models/monster/MonsterModel.js"
import StageModel from "../models/challenge/StageModel.js"
import ChallengeModel from "../models/challenge/ChallengeModel.js"
import Monster from "./monster/Monster.js"
import MonsterCollection from "./monster/MonsterCollection.js"
import MonsterType from "./monster/MonsterType.js"
import MonsterInfo from "./monster/MonsterInfo.js"
import Items from "./backpack/Item.js"
import Eggs from "./backpack/Egg.js"
import ItemModel from "../models/backpack/ItemModel.js"
import Backpack from "./backpack/Backpack.js"
import TestAccount from "./user/Account.js"
import TestTrainer from "./user/Trainer.js"
import AccountModel from "../models/user/AccountModel.js"
import TrainerModel from "../models/user/TrainerModel.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import logger from "../util/logger.js"
import EggModel from "../models/backpack/EggModel.js"
import MonsterCollectionModel from "../models/monster/MonsterCollectionModel.js"
import GameServerSetting from "./game-server.js"
import GSSettingModel from "../models/setting/GSSettingModel.js"
import Stages from "./challenge/Stage.js"
import Challenges from "./challenge/Challenge.js"
import Bosses from "./challenge/Boss.js"
import BossModel from "../models/challenge/BossModel.js"

export default async function initializeMockupData() {
	try {
		await GSSettingModel.create(GameServerSetting)

		await Promise.all(MonsterType.map((i) => MonsterTypeModel.create(i)))
		await Promise.all(MonsterInfo.map((i) => MonsterInfoModel.create(i)))
		await Promise.all(Monster.map((i) => MonsterModel.create(i)))
		await MonsterCollectionModel.create(MonsterCollection)

		await Promise.all(Bosses.map((i) => BossModel.create(i)))
		await Promise.all(Stages.map((i) => StageModel.create(i)))
		await Promise.all(Challenges.map((i) => ChallengeModel.create(i)))

		await BackpackModel.create(Backpack)
		await Promise.all(Items.map((i) => ItemModel.create(i)))
		await Promise.all(Eggs.map((i) => EggModel.create(i)))

		await AccountModel.create(TestAccount)
		await TrainerModel.create(TestTrainer)
	} catch (error) {
		logger.error(error)
	}
}
