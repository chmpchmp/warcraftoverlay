import './Scoreboard.css'
import type { ScoreboardProps } from './types.ts'

const directory = '/assets/scoreboard/';

function Scoreboard(props: ScoreboardProps) {
    const background1 = {
        background: `linear-gradient(to right, #${props.color[0]}, #200e1f)`
    }

    const background2 = {
        background: `linear-gradient(to right, #200e1f, #${props.color[1]})`
    }

    return (
        <div className="scoreboard">
            <div className="name scoreboard-padding" style={background1}>{props.name[0]}</div>
            <div className="gold scoreboard-padding">
                <img src={directory + "BTNChestOfGold.png"}/> {props.gold[0]}
            </div>
            <div className="lumber scoreboard-padding">
                <img src={directory + "BTNHumanLumberUpgrade1.png"}/> {props.lumber[0]}
            </div>
            <div className="food scoreboard-padding">
                <img src={directory + "BTNFarm.png"}/> {props.food[0]}/{props.max_food[0]}
            </div>
            
            <div className="time scoreboard-padding">
                {props.time}
            </div>

            <div className="gold scoreboard-padding">
                <img src={directory + "BTNChestOfGold.png"}/> {props.gold[1]}
            </div>
            <div className="lumber scoreboard-padding">
                <img src={directory + "BTNHumanLumberUpgrade1.png"}/> {props.lumber[1]}
            </div>
            <div className="food scoreboard-padding">
                <img src={directory + "BTNFarm.png"}/> {props.food[1]}/{props.max_food[1]}
            </div>
            <div className="name scoreboard-padding" style={background2}>{props.name[1]}</div>
        </div>
    )
}

export default Scoreboard