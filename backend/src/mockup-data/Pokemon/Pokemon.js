import { customAlphabet } from "nanoid"
import { findPkmInfoUID } from "./PokemonInfo.js"

const nanoid = customAlphabet("1234567890abcdef", 10)
const LEVEL_UP_DEFAULT_EXP = 1000

const Pokemon = [
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Bulbasaur"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Ivysaur"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Venusaur"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Charmander"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Charmeleon"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Charizard"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Squirtle"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Wartortle"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Blastoise"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Caterpie"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Metapod"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Butterfree"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Weedle"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Kakuna"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Beedrill"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Pidgey"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Pidgeotto"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Pidgeot"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Rattata"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Raticate"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Spearow"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Fearow"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Ekans"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Arbok"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Pikachu"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Raichu"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
	{
		uid: `Pkm-${nanoid()}`,
		info_uid: findPkmInfoUID("Pichu"),
		level_up_exp: LEVEL_UP_DEFAULT_EXP,
		power: 1000,
	},
]

export default Pokemon
