export interface GameData {
    p1: PlayerData;
    p2: PlayerData;
    stats: {
        players: string;
        time: string;
    }
    status: {
        application_opened: string;
        in_replay: string;
    }
}

export interface PlayerData {
    name: string;
    color: string;
    gold: string;
    lumber: string;
    food: string;
    max_food: string;
    hero1: string;
    hero2: string;
    hero3: string;
    unit_portrait: string;
    unit_count: string;
    upgrade_portrait: string;
    upgrade_progress: string;
    production_unit_portrait: string;
    production_unit_progress: string;
    production_upgrade_portrait: string;
    production_upgrade_progress: string;
    production_structure_portrait: string;
    production_structure_progress: string;
}

export interface HeroData {
    portrait: string;
    level: string;
    xp: string;
    lvlup_xp: string;
    hp: string;
    max_hp: string;
    mana: string;
    max_mana: string;
    ability1_portrait: string;
    ability1_level: string;
    ability2_portrait: string;
    ability2_level: string;
    ability3_portrait: string;
    ability3_level: string;
    ability4_portrait: string;
    ability4_level: string;
    item1_portrait: string;
    item1_charges: string;
    item2_portrait: string;
    item2_charges: string;
    item3_portrait: string;
    item3_charges: string;
    item4_portrait: string;
    item4_charges: string;
    item5_portrait: string;
    item5_charges: string;
    item6_portrait: string;
    item6_charges: string;
}

export interface UnitData {
    portrait: string[];
    count: string[];
}

export interface UpgradeData {
    portrait: string[];
}

export interface ProductionData {
    units: {
        portrait: string[];
        progress: string[];
    }
    upgrades: {
        portrait: string[];
        progress: string[];
    }
    buildings: {
        portrait: string[];
        progress: string[];
    }
}

export interface HeroesProps {
    p1: {
        hero1: HeroData;
        hero2: HeroData;
        hero3: HeroData;
    }
    p2: {
        hero1: HeroData;
        hero2: HeroData;
        hero3: HeroData;
    }
}

export interface ScoreboardProps {
    time: string;
    color: string[];
    name: string[];
    gold: string[];
    lumber: string[];
    food: string[];
    max_food: string[];
}

export interface HeroProps {
    grayscale: object;
    portrait: string;
    level: string;
    xp: string;
    lvlup_xp: string;
    hp: string;
    max_hp: string;
    mana: string;
    max_mana: string;
    ability1: string[];
    ability2: string[];
    ability3: string[];
    ability4: string[];
    item1: string[];
    item2: string[];
    item3: string[];
    item4: string[];
    item5: string[];
    item6: string[];
}

export interface PortraitProps {
    portrait: string;
    level: string;
}

export interface AbilityProps {
    portrait: string;
    level: string;
}

export interface ItemProps {
    portrait: string;
    charges: string;
}

export interface UnitsProps {
    color: string[];
    p1: UnitData;
    p2: UnitData;
}

export interface UnitProps {
    portrait: string;
    count: string;
}

export interface UpgradesProps {
    color: string[];
    p1: UpgradeData;
    p2: UpgradeData;
}

export interface UpgradeProps {
    portrait: string;
}

export interface ProductionProps {
    color: string[];
    p1: ProductionData;
    p2: ProductionData;
}

export interface ProductionUnitProps {
    portrait: string;
    progress: string;
}