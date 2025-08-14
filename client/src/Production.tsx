import './Production.css'
import type { ProductionProps, ProductionData, ProductionUnitProps } from './types.ts'

const directory = '/assets/icons/';

function Production(props: ProductionProps) {
    const p1 = props.p1;
    const p2 = props.p2;

    const p1_color = {
        background: `#${props.color[0]}`
    }

    const p2_color = {
        background: `#${props.color[1]}`
    }

    return (
        <div className="production-position">
            <div className="production">
                <div>
                    <div className="production-row">
                        <div className="production-team" style={p1_color}/>
                        {renderProduction(p1.units.portrait, p1.units.progress, 1)}
                    </div>
                </div>
                <div>
                    <div className="production-row">
                        {renderProduction(p2.units.portrait, p2.units.progress, 1)}
                        <div className="production-team" style={p2_color}/>
                    </div>
                </div>
            </div>
            <div className="production">
                <div>
                    <div className="production-row">
                        <div className="production-team" style={p1_color}/>
                        {renderProduction(p1.upgrades.portrait, p1.upgrades.progress, 1)}
                    </div>
                </div>
                <div>
                    <div className="production-row">
                        {renderProduction(p2.upgrades.portrait, p2.upgrades.progress, 1)}
                        <div className="production-team" style={p2_color}/>
                    </div>
                </div>
            </div>
            <div className="production">
                <div>
                    <div className="production-row">
                        <div className="production-team" style={p1_color}/>
                        {renderProduction(p1.buildings.portrait, p1.buildings.progress, 1)}
                    </div>
                </div>
                <div>
                    <div className="production-row">
                        {renderProduction(p2.buildings.portrait, p2.buildings.progress, 1)}
                        <div className="production-team" style={p2_color}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Production

function renderProduction(portraits: string[], progresses: string[], playerNumber: number) {
    return portraits.map(function(portrait: string, index: number) {
        const key = `${playerNumber}-${index}-${portrait}`;

        return <ProductionUnit key={key} portrait={portraits[index]} progress={progresses[index]} />
    });
}

function ProductionUnit(props: ProductionUnitProps) {
    const width = {
        width: `${props.progress}%`
    };

    return (
        <div className="prod">
            <img src={directory + props.portrait}/>
            <div className="prod-bar">
                <div className="prod-progress" style={width}/>
            </div>
        </div>
    )
}