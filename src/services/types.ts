type TGameCeilWall = {
    type: "wall"
}

type TGameCeilFloor = {
    type: "floor"
}

type TGameCeilPotion = {
    type: "potion"
}

type TGameCeilSword = {
    type: "sword"
}

type TGameCeilHero = {
    type: "hero",
    hp: number
}

type TGameCeilEnemy = {
    type: "enemy",
    hp: number
}

export type TGameCeil = TGameCeilEnemy | TGameCeilFloor | TGameCeilHero | TGameCeilPotion | TGameCeilSword | TGameCeilWall
export type TGameField = TGameCeil[][];
