import './Upgrades.css'
import type { UpgradesProps, UpgradeData, UpgradeProps } from './types'

const directory = '/assets/icons/';

function Upgrades(props: UpgradesProps) {
    const p1 = props.p1;
    const p2 = props.p2;

    const p1_color = {
        background: `#${props.color[0]}`
    }

    const p2_color = {
        background: `#${props.color[1]}`
    }

    return (
        <div className="upgrades">
            <div>
                <div className="upgrade-row">
                    <div className="upgrades-team" style={p1_color}/>
                    {renderUpgrades(p1, 1)}
                </div>
            </div>
            <div>
                <div className="upgrade-row">
                    <div className="upgrades-team" style={p2_color}/>
                    {renderUpgrades(p2, 2)}
                </div>
            </div>
        </div>
    )
}

export default Upgrades

function renderUpgrades(upgrades: UpgradeData, playerNumber: number) {
    return upgrades.portrait.map(function(portrait: string, index: number) {
        const key = `${playerNumber}-${index}-${portrait}`;

        return <Upgrade key={key} portrait={upgrades.portrait[index]} />
    });
}

function Upgrade(props: UpgradeProps) {
    return (
        <div className="upgrade">
            <img src={directory + props.portrait}/>
        </div>
    )
}