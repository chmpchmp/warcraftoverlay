import { useState, useEffect } from 'react'
import Scoreboard from './Scoreboard.tsx'
import Heroes from './Heroes.tsx'
import Units from './Units.tsx'
import Upgrades from './Upgrades.tsx'
import Production from './Production.tsx'
import Background from './Background.tsx'
import type { GameData } from './types.ts'

function Client() {
    const [gameData, setGameData] = useState<GameData | null>(null);

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

    if (!gameData) {
        return (
            <>
                No game data to currently fetch
            </>
        )
    }
    
    var time = gameData.stats.time;
    var color = [gameData.p1.color, gameData.p2.color];
    var name = [gameData.p1.name, gameData.p2.name];
    var gold = [gameData.p1.gold, gameData.p2.gold];
    var lumber = [gameData.p1.lumber, gameData.p2.lumber];
    var food = [gameData.p1.food, gameData.p2.food];
    var max_food = [gameData.p1.max_food, gameData.p2.max_food];
        
    var p1_hero = {
        hero1: JSON.parse(gameData.p1.hero1),
        hero2: JSON.parse(gameData.p1.hero2),
        hero3: JSON.parse(gameData.p1.hero3)
    }

    var p2_hero = {
        hero1: JSON.parse(gameData.p2.hero1),
        hero2: JSON.parse(gameData.p2.hero2),
        hero3: JSON.parse(gameData.p2.hero3)
    }

    var p1_units = {
        portrait: JSON.parse(gameData.p1.unit_portrait),
        count: JSON.parse(gameData.p1.unit_count)
    }

    var p2_units = {
        portrait: JSON.parse(gameData.p2.unit_portrait),
        count: JSON.parse(gameData.p2.unit_count)
    }

    var p1_upgrades = {
        portrait: JSON.parse(gameData.p1.upgrade_portrait)
    }

    var p2_upgrades = {
        portrait: JSON.parse(gameData.p2.upgrade_portrait)
    }

    var p1_production = {
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
    
    var p2_production = {
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

    var temp = null;

    if (window.location.pathname === '/flipped') {
        color.reverse();
        name.reverse();
        gold.reverse();
        lumber.reverse();
        food.reverse();
        max_food.reverse();

        temp = p1_hero;
        p1_hero = p2_hero;
        p2_hero = temp;

        temp = p1_units;
        p1_units = p2_units;
        p2_units = temp;

        temp = p1_upgrades;
        p1_upgrades = p2_upgrades;
        p2_upgrades = temp;

        temp = p1_production;
        p1_production = p2_production;
        p2_production = temp;
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