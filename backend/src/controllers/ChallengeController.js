import MonsterModel from "../models/monster/MonsterModel.js"
import ChallengeModel from "../models/challenge/ChallengeModel.js"
import BossModel from "../models/challenge/BossModel.js"
import StageModel from "../models/challenge/StageModel.js"
import TrainerModel from "../models/user/TrainerModel.js"
import GameServerSettingModel from "../models/setting/GSSettingModel.js"
import ErrorResponse from "../objects/ErrorResponse.js"
import { calculateDamage } from "../util/fight.js"
import { randomUID } from "../util/random.js"
import BackpackModel from "../models/backpack/BackpackModel.js"
import MonsterCollectionModel from "../models/monster/MonsterCollectionModel.js"

const populateStageData = (stage) => {}

const populateChallengeData = (challenge) => {}

// Get A Challenge by id
export const getChallengeById = async (req, res, next) => {
	try {
		const challengeDoc = await ChallengeModel.findOne({ uid: req.params.id }).populate({
			path: "stage_info",
		})
		if (!challengeDoc) {
			return next(new ErrorResponse(404, "Not found"))
		}

		return res.status(200).json(challengeDoc)
	} catch (error) {
		return next(error)
	}
}

// Get All Challenge
export const getAllChallenge = async (req, res, next) => {
	try {
		const criteria = req.query.status ? { status: req.query.status } : null

		const challengeListDoc = await ChallengeModel.find(criteria).populate({
			path: "stage_info",
			select: "-_id",
			populate: [
				{
					path: "boss_info",
					populate: { path: "monsterType", select: "name" },
				},
				// {
				// 	path: "detailed_reward_items",
				// },
				// {
				// 	path: "detailed_reward_eggs",
				// },
			],
		})

		const challenges = challengeListDoc.map((ch) => {
			// console.log(ch.stage_info.detailed_reward_items)
			const stages = ch.stage_info.map((st) => ({
				uid: st.uid,
				boss_uid: st.boss_uid,
				boss_name: st.boss_info.name,
				boss_type_uid: st.boss_info.type_uid,
				boss_monster_type: st.boss_info.monsterType.name,
				boss_img_name: st.boss_info.img_name,
				boss_attack: st.boss_info.attack,
				boss_defense: st.boss_info.defense,
				reward_exp: st.reward_exp,
				reward_coins: st.reward_coins,
				stamina_cost: st.stamina_cost,
				reward_items: st.reward_items,
				reward_eggs: st.reward_eggs,
			}))

			return {
				uid: ch.uid,
				stages,
				trainer_level_requirement: ch.trainer_level_requirement,
				status: ch.status,
				createdAt: ch.createdAt,
			}
		})

		return res.status(200).json(challenges)
	} catch (error) {
		return next(error)
	}
}

// Challenge a boss
export const challengeBoss = async (req, res, next) => {
	try {
		const {
			monster_uid: monsterUID,
			stage_uid: stageUID,
			challenge_uid: challengeUID,
		} = req.query

		// Get the stage info
		const stageDoc = await StageModel.findOne({ uid: stageUID })
			.populate({
				path: "boss_type",
			})
			.populate({ path: "detailed_reward_items" })
			.populate({ path: "detailed_reward_eggs" })

		if (!stageDoc) {
			return next(new ErrorResponse(404, "Stage is not found."))
		}

		const trainer = await TrainerModel.findOne({ user_uid: req.user.uid })
		if (trainer.stamina < stageDoc.stamina_cost) {
			return next(new ErrorResponse(400, "You do not have enough stamina."))
		}

		// Get monster info
		const monsterDoc = await MonsterModel.findOne({ uid: monsterUID }).populate({
			path: "info",
			populate: { path: "monsterType" },
		})
		if (!monsterDoc) {
			return next(new ErrorResponse(404, "Monster is not found."))
		}

		const monster = {
			uid: monsterDoc.uid,
			info_uid: monsterDoc.info_uid,
			level: monsterDoc.level,
			exp: monsterDoc.exp,
			level_up_exp: monsterDoc.level_up_exp,
			attack: monsterDoc.attack,
			defense: monsterDoc.defense,
			status: monsterDoc.status,
			name: monsterDoc.info.name,
			img_name: monsterDoc.info.img_name,
			type: monsterDoc.info.monsterType.name,
			type_uid: monsterDoc.info.monsterType.uid,
		}
		const boss = {
			uid: stageDoc.uid,
			attack: stageDoc.boss_attack,
			defense: stageDoc.boss_defense,
			status: stageDoc.status,
			name: stageDoc.boss_name,
			img_name: stageDoc.boss_img_name,
			type: stageDoc.boss_type.name,
			type_uid: stageDoc.boss_type_uid,
		}

		// Calculate damage
		const { enemyDamage, monsterDamage } = calculateDamage(monster, boss)
		const defeatBoss = monsterDamage >= boss.defense

		if (!defeatBoss) {
			return res.status(200).json({ message: "You are defeated.", result: "defeated" })
		}

		// Rewards points
		// Add exp to monster
		monsterDoc.exp = stageDoc.reward_exp
		if (monsterDoc.exp >= monsterDoc.level_up_exp) {
			// Level up
			monsterDoc.level += 1
			monsterDoc.exp = 0
			const GsSetting = await GameServerSettingModel.findOne({})
			const newLvlUpExp = (GsSetting.monster_lvl_up_exp_rate + 1) * monsterDoc.level_up_exp
			monsterDoc.level_up_exp = Math.floor(newLvlUpExp)
		}
		await monsterDoc.save()

		// Update monster
		const updatedMonster = {
			...monster,
			exp: monsterDoc.exp,
			monster_type: monster.type,
			level_up_exp: monsterDoc.level_up_exp,
			level: monsterDoc.level,
		}
		const monsterCollection = await MonsterCollectionModel.findOne({ user_uid: req.user.uid })
		const updatedMonsterList = monsterCollection.monster_list.map((m) => {
			if (m.uid === updatedMonster.uid) {
				return updatedMonster
			}

			return m
		})
		monsterCollection.monster_list = updatedMonsterList
		await monsterCollection.save()

		// Update collection

		// Add coins and subtract stamina
		trainer.stamina =
			trainer.stamina >= stageDoc.stamina_cost ? trainer.stamina - stageDoc.stamina_cost : 0

		trainer.gold += stageDoc.reward_coins
		await trainer.save()

		// Items and Eggs
		const backpack = await BackpackModel.findOne({ user_uid: req.user.uid })

		const updateItemList = backpack.item_list.map((item) => {
			const hasItem = stageDoc.reward_items.findIndex((i) => i.uid === item.uid)
			if (hasItem !== -1) {
				const newAmount = item.amount + stageDoc.reward_items[hasItem].amount

				return {
					...item,
					amount: newAmount,
				}
			}
			return item
		})

		const updateEggList = backpack.egg_list.map((egg) => {
			const hasItem = stageDoc.reward_eggs.findIndex((e) => e.uid === egg.uid)
			if (hasItem !== -1) {
				const newAmount = egg.amount + stageDoc.reward_eggs[hasItem].amount

				return {
					...egg,
					amount: newAmount,
				}
			}

			return egg
		})

		// Update backpack
		backpack.egg_list = updateEggList
		backpack.item_list = updateItemList
		await backpack.save()

		return res.status(200).json({
			stage: stageDoc,
			winner: updatedMonster,
			result: "won",
		})
	} catch (error) {
		return next(error)
	}
}
