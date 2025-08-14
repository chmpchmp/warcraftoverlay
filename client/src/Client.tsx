import { useState, useEffect } from 'react'
import Scoreboard from './Scoreboard.tsx'
import Heroes from './Heroes.tsx'
import Units from './Units.tsx'
import Upgrades from './Upgrades.tsx'
import Production from './Production.tsx'
import Background from './Background.tsx'
import type { GameData, PlayerData, HeroData, UnitData, UpgradeData, ProductionData } from './types.ts'

const data: GameData = {
    p1: {
        name: 'DRX Moon',
        color: '0042ff',
        gold: '10000',
        lumber: '10000',
        food: '100',
        max_food: '100',
        hero1: "{}",
        hero2: "{}",
        hero3: "{}",
        unit_portrait: '[]',
        unit_count: '[]',
        upgrade_portrait: '[]',
        upgrade_progress: '[]',
        production_unit_portrait: '[]',
        production_unit_progress: '[]',
        production_upgrade_portrait: '[]',
        production_upgrade_progress: '[]',
        production_structure_portrait: '[]',
        production_structure_progress: '[]'
    } as PlayerData,
    p2: {
        name: 'EG Grubby',
        color: 'ff0303',
        gold: '10000',
        lumber: '10000',
        food: '100',
        max_food: '100',
        hero1: '{}',
        hero2: '{}',
        hero3: '{}',
        unit_portrait: '[]',
        unit_count: '[]',
        upgrade_portrait: '[]',
        upgrade_progress: '[]',
        production_unit_portrait: '[]',
        production_unit_progress: '[]',
        production_upgrade_portrait: '[]',
        production_upgrade_progress: '[]',
        production_structure_portrait: '[]',
        production_structure_progress: '[]'
    } as PlayerData,
    stats: {
        players: '0',
        time: '00:00'
    },
    status: {
        application_opened: 'false',
        in_replay: 'false'
    }
}

const hero: HeroData = {
    portrait: 'BTNEvilIllidan.png',
    level: '1',
    xp: '100',
    lvlup_xp: '100',
    hp: '100',
    max_hp: '100',
    mana: '100',
    max_mana: '100',
    ability1_portrait: 'BTNManaBurn.png',
    ability1_level: '3',
    ability2_portrait: 'PASBTNEvasion.png',
    ability2_level: '2',
    ability3_portrait: 'BTNMetamorphosis.png',
    ability3_level: '1',
    ability4_portrait: 'BTNImmolationOn.png',
    ability4_level: '0',
    item1_portrait: 'BTNMedalionOfCourage.png',
    item1_charges: '0',
    item2_portrait: 'BTNHealingSalve.png',
    item2_charges: '3',
    item3_portrait: '',
    item3_charges: '-1',
    item4_portrait: '',
    item4_charges: '-1',
    item5_portrait: '',
    item5_charges: '-1',
    item6_portrait: '',
    item6_charges: '-1'
}

const units: UnitData = {
    portrait: ['BTNFootman.png', 'BTNFelGuardBlue.png'],
    count: ['4', '1']
}

const upgrades: UpgradeData = {
    portrait: ['BTNDefend.png', 'BTNDestroyer.png'],
}

const production: ProductionData = {
    units: {
        portrait: ['BTNFootman.png'],
        progress: ['20']
    },
    upgrades: {
        portrait: ['BTNFootman.png'],
        progress: ['20']
    },
    buildings: {
        portrait: ['BTNFootman.png'],
        progress: ['20']
    }
} 

function Client() {
    const [gameData, setGameData] = useState(data)

    useEffect(() => {
        // connect to server
        const url = 'ws://localhost:25568';
        const socket = new WebSocket(url);

        socket.onmessage = function (event) {
            // set data to current object fetched from server
            setGameData(JSON.parse(event.data));
        };
        
        return () => {
            if (socket) {
                socket.close();
            }
        }
    }, []);

    const color = [gameData.p1.color, gameData.p2.color];
    const time = gameData.stats.time;
    const name = [gameData.p1.name, gameData.p2.name];
    const gold = [gameData.p1.gold, gameData.p2.gold];
    const lumber = [gameData.p1.lumber, gameData.p2.lumber];
    const food = [gameData.p1.food, gameData.p2.food];
    const max_food = [gameData.p1.max_food, gameData.p2.max_food];

    const p1_hero = {
        hero1: structuredClone(hero),
        hero2: structuredClone(hero),
        hero3: structuredClone(hero)
    }

    const p2_hero = {
        hero1: structuredClone(hero),
        hero2: structuredClone(hero),
        hero3: structuredClone(hero)
    }

    const p1_units = structuredClone(units);
    const p2_units = structuredClone(units);

    const p1_upgrades = structuredClone(upgrades);
    const p2_upgrades = structuredClone(upgrades);

    const p1_production = structuredClone(production);
    const p2_production = structuredClone(production);

    // if game is not in replay with exactly 2 players, display this instead
    if ((gameData.status.in_replay === 'true') === true && parseInt(gameData.stats.players) === 2) {
        p1_hero.hero1 = JSON.parse(gameData.p1.hero1);
        p1_hero.hero2 = JSON.parse(gameData.p1.hero2);
        p1_hero.hero3 = JSON.parse(gameData.p1.hero3);

        p2_hero.hero1 = JSON.parse(gameData.p2.hero1);
        p2_hero.hero2 = JSON.parse(gameData.p2.hero2);
        p2_hero.hero3 = JSON.parse(gameData.p2.hero3);

        p1_units.portrait = JSON.parse(gameData.p1.unit_portrait);
        p1_units.count = JSON.parse(gameData.p1.unit_count);

        p2_units.portrait = JSON.parse(gameData.p2.unit_portrait);
        p2_units.count = JSON.parse(gameData.p2.unit_count);

        p1_upgrades.portrait = JSON.parse(gameData.p1.upgrade_portrait);

        p2_upgrades.portrait = JSON.parse(gameData.p2.upgrade_portrait);

        p1_production.units = {
            portrait: JSON.parse(gameData.p1.production_unit_portrait),
            progress: JSON.parse(gameData.p1.production_unit_progress)
        }
        p1_production.upgrades = {
            portrait: JSON.parse(gameData.p1.production_upgrade_portrait),
            progress: JSON.parse(gameData.p1.production_upgrade_progress)
        }
        p1_production.buildings = {
            portrait: JSON.parse(gameData.p1.production_structure_portrait),
            progress: JSON.parse(gameData.p1.production_structure_progress)
        }

        p2_production.units = {
            portrait: JSON.parse(gameData.p2.production_unit_portrait),
            progress: JSON.parse(gameData.p2.production_unit_progress)
        }
        p2_production.upgrades = {
            portrait: JSON.parse(gameData.p2.production_upgrade_portrait),
            progress: JSON.parse(gameData.p2.production_upgrade_progress)
        }
        p2_production.buildings = {
            portrait: JSON.parse(gameData.p2.production_structure_portrait),
            progress: JSON.parse(gameData.p2.production_structure_progress)
        }
    }

    return (
        <>
            <Scoreboard time={time} color={color} name={name} gold={gold} lumber={lumber} food={food} max_food={max_food} />
            <Heroes p1={p1_hero} p2={p2_hero} />
            <Production color={color} p1={p1_production} p2={p2_production} />
            <Background />
            <Units color={color} p1={p1_units} p2={p2_units} />
            <Upgrades color={color} p1={p1_upgrades} p2={p2_upgrades} />
        </>
    )
}

export default Client