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

export type TGameCeilHero = {
    type: "hero",
    hp: number,
    attack: number
}

export type TGameCeilEnemy = {
    type: "enemy",
    hp: number,
    attack: number
}

export type TGameCeil = TGameCeilEnemy | TGameCeilFloor | TGameCeilHero | TGameCeilPotion | TGameCeilSword | TGameCeilWall
export type TGameField = TGameCeil[][];
