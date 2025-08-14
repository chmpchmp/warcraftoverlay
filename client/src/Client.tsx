import { useState, useEffect } from 'react'
import Scoreboard from './Scoreboard.tsx'
import Heroes from './Heroes.tsx'
import Units from './Units.tsx'
import Upgrades from './Upgrades.tsx'
import Production from './Production.tsx'
import Background from './Background.tsx'
import type { GameData } from './types.ts'

const data: GameData = {
    p1: {
        name: '',
        color: '',
        gold: '',
        lumber: '',
        food: '',
        max_food: '',
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
    },
    p2: {
        name: '',
        color: '',
        gold: '',
        lumber: '',
        food: '',
        max_food: '',
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
    },
    stats: {
        players: '',
        time: ''
    },
    status: {
        application_opened: 'false',
        in_replay: 'false'
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

    // if game is not in replay with exactly 2 players, display this instead
    if ((gameData.status.in_replay === 'true') === true && parseInt(gameData.stats.players) === 2) {
        const color = [gameData.p1.color, gameData.p2.color];
        const time = gameData.stats.time;
        const name = [gameData.p1.name, gameData.p2.name];
        const gold = [gameData.p1.gold, gameData.p2.gold];
        const lumber = [gameData.p1.lumber, gameData.p2.lumber];
        const food = [gameData.p1.food, gameData.p2.food];
        const max_food = [gameData.p1.max_food, gameData.p2.max_food];
            
        const p1_hero = {
            hero1: JSON.parse(gameData.p1.hero1),
            hero2: JSON.parse(gameData.p1.hero2),
            hero3: JSON.parse(gameData.p1.hero3)
        }

        const p2_hero = {
            hero1: JSON.parse(gameData.p2.hero1),
            hero2: JSON.parse(gameData.p2.hero2),
            hero3: JSON.parse(gameData.p2.hero3)
        }

        const p1_units = {
            portrait: JSON.parse(gameData.p1.unit_portrait),
            count: JSON.parse(gameData.p1.unit_count)
        }

        const p2_units = {
            portrait: JSON.parse(gameData.p2.unit_portrait),
            count: JSON.parse(gameData.p2.unit_count)
        }

        const p1_upgrades = {
            portrait: JSON.parse(gameData.p1.upgrade_portrait)
        }

        const p2_upgrades = {
            portrait: JSON.parse(gameData.p2.upgrade_portrait)
        }

        const p1_production = {
            units: {
                portrait: JSON.parse(gameData.p1.production_unit_portrait),
                progress: JSON.parse(gameData.p1.production_unit_progress)
            },
            upgrades: {
                portrait: JSON.parse(gameData.p1.production_upgrade_portrait),
                progress: JSON.parse(gameData.p1.production_upgrade_progress)
            },
            buildings: {
                portrait: JSON.parse(gameData.p1.production_structure_portrait),
                progress: JSON.parse(gameData.p1.production_structure_progress)
            }
        }
        
        const p2_production = {
            units: {
                portrait: JSON.parse(gameData.p2.production_unit_portrait),
                progress: JSON.parse(gameData.p2.production_unit_progress)
            },
            upgrades: {
                portrait: JSON.parse(gameData.p2.production_upgrade_portrait),
                progress: JSON.parse(gameData.p2.production_upgrade_progress)
            },
            buildings: {
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

    return (
        <>
        </>
    )
}

export default Client