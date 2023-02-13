import PokemonInfoModel from "../models/pokemon/PokemonInfoModel.js"
import PokemonTypeModel from "../models/pokemon/PokemonTypeModel.js"
import PokemonModel from "../models/pokemon/PokemonModel.js"
import Pokemon from "./pokemon/Pokemon.js"
import PokemonType from "./pokemon/PokemonType.js"
import PokemonInfo from "./pokemon/PokemonInfo.js"
import Items from "./backpack/Item.js"
import ItemModel from "../models/backpack/ItemModel.js"
import Backpack from "./backpack/Backpack.js"
import BackpackModel from "../models/backpack/BackpackModel.js"

export default async function initializeMockupData() {
	try {
		await Promise.all(PokemonType.map((i) => PokemonTypeModel.create(i)))
		await Promise.all(PokemonInfo.map((i) => PokemonInfoModel.create(i)))
		await Promise.all(Pokemon.map((i) => PokemonModel.create(i)))
		await Promise.all(Items.map((i) => ItemModel.create(i)))
		await BackpackModel.create(Backpack)
	} catch (error) {
		console.error(error)
	}
}
