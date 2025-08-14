import './Units.css'
import type { UnitsProps, UnitData, UnitProps } from './types'

const directory = '/assets/icons/';

function Units(props: UnitsProps) {
    const p1 = props.p1;
    const p2 = props.p2;

    const p1_color = {
        background: `#${props.color[0]}`
    }

    const p2_color = {
        background: `#${props.color[1]}`
    }

    return (
        <div className="units">
            <div>
                <div className="unit-row">
                    <div className="units-team" style={p1_color}/>
                    {renderUnits(p1, 1)}
                </div>
            </div>
            <div>
                <div className="unit-row">
                    <div className="units-team" style={p2_color}/>
                    {renderUnits(p2, 2)}
                </div>
            </div>
        </div>
    )
}

export default Units

function renderUnits(units: UnitData, playerNumber: number) {
    return units.portrait.map(function(portrait: string, index: number) {
        const key = `${playerNumber}-${index}-${portrait}`;

        return <Unit key={key} portrait={units.portrait[index]} count={units.count[index]} />
    });
}

function Unit(props: UnitProps) {
    return (
        <div className="unit">
            <img src={directory + props.portrait}/>
            <div className="count">
                {props.count}
            </div>
        </div>
    )
}