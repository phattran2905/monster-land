// Fight an enemy with a water type monster
const findWithWaterType = (monster, enemy) => {
	let monsterDamage = monster.attack
	let enemyDamage = enemy.attack

	if (enemy.type === "fire") {
		monsterDamage *= 2
	}

	if (enemy.type === "electric") {
		enemyDamage *= 2
		monsterDamage /= 2
	}

	return {
		monsterDamage,
		enemyDamage,
	}
}

// Fight an enemy with a fire type monster
const findWithFireType = (monster, enemy) => {
	const monsterDamage = monster.attack
	let enemyDamage = enemy.attack

	if (enemy.type === "water") {
		enemyDamage *= 2
	}

	return {
		monsterDamage,
		enemyDamage,
	}
}

// Fight an enemy with a fire type monster
const findWithRockType = (monster, enemy) => {
	let monsterDamage = monster.attack
	let enemyDamage = enemy.attack

	if (enemy.type === "water") {
		enemyDamage *= 2
		monsterDamage /= 2
	}

	if (enemy.type === "electric") {
		monsterDamage *= 2
	}

	return {
		monsterDamage,
		enemyDamage,
	}
}

// Fight an enemy with a fire type monster
export const findWithElectricType = (monster, enemy) => {
	let monsterDamage = monster.attack
	let enemyDamage = enemy.attack

	if (enemy.type === "water") {
		monsterDamage *= 2
	}

	if (enemy.type === "rock") {
		enemyDamage *= 2
		monsterDamage /= 2
	}

	return {
		monsterDamage,
		enemyDamage,
	}
}

export const calculateDamage = (monster, enemy) => {
	let damage = 0

	switch (monster.type) {
		case "water":
			damage = findWithWaterType(monster, enemy)
			break
		case "fire":
			damage = findWithFireType(monster, enemy)
			break
		case "rock":
			damage = findWithRockType(monster, enemy)
			break
		case "electric":
			damage = findWithElectricType(monster, enemy)
			break
		default:
			break
	}

	return damage
}
