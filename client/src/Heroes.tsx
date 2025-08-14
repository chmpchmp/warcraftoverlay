import './Heroes.css'
import type { HeroesProps, HeroData, HeroProps, PortraitProps, AbilityProps, ItemProps } from './types'

const directory = '/assets/icons/';

function Heroes(props: HeroesProps) {
    const heroes = [
        [props.p1.hero1, props.p1.hero2, props.p1.hero3],
        [props.p2.hero1, props.p2.hero2, props.p2.hero3]
    ];

    const p1 = heroes[0].filter(object => Object.keys(object).length > 0);
    const p2 = heroes[1].filter(object => Object.keys(object).length > 0);

    return (
        <div className="heroes">
            <div>
                {renderHeroes(p1, 1)}
            </div>
            <div>
                {renderHeroes(p2, 2)}
            </div>
        </div>
    )
}

export default Heroes

function renderHeroes(heroes: HeroData[], playerNumber: number) {
    return heroes.map(function(hero: HeroData, index: number) {
        const key = `${playerNumber}-${index}-${hero.portrait}`;
        const ability1 = [hero.ability1_portrait, hero.ability1_level];
        const ability2 = [hero.ability2_portrait, hero.ability2_level];
        const ability3 = [hero.ability3_portrait, hero.ability3_level];
        const ability4 = [hero.ability4_portrait, hero.ability4_level];
        const item1 = [hero.item1_portrait, hero.item1_charges];
        const item2 = [hero.item2_portrait, hero.item2_charges];
        const item3 = [hero.item3_portrait, hero.item3_charges];
        const item4 = [hero.item4_portrait, hero.item4_charges];
        const item5 = [hero.item5_portrait, hero.item5_charges];
        const item6 = [hero.item6_portrait, hero.item6_charges];

        var grayscale = {
            filter: `grayscale(0%)`
        };

        if (parseInt(hero.hp) === 0) {
            grayscale = {
                filter: `grayscale(100%)`
            };

            hero.xp = '-1';
            hero.mana = '0';
        }

        return <Hero key={key} grayscale={grayscale} portrait={hero.portrait}
            level={hero.level} xp={hero.xp} lvlup_xp={hero.lvlup_xp}
            hp={hero.hp} max_hp={hero.max_hp} mana={hero.mana} max_mana={hero.max_mana}
            ability1={ability1} ability2={ability2} ability3={ability3} ability4={ability4}
            item1={item1} item2={item2} item3={item3} item4={item4} item5={item5} item6={item6} />
    });
}

function Hero(props: HeroProps) {
    return (
        <>
            <div className="spacing" style={props.grayscale}>
                <div className="background">
                    <div>
                        <div className="images">
                            <div className="portrait">
                                <Portrait portrait={props.portrait} level={props.level} />
                            </div>
                            <div className="abilities">
                                <Ability portrait={props.ability1[0]} level={props.ability1[1]} />
                                <Ability portrait={props.ability2[0]} level={props.ability2[1]} />
                                <Ability portrait={props.ability3[0]} level={props.ability3[1]} />
                                <Ability portrait={props.ability4[0]} level={props.ability4[1]} />
                            </div>
                        </div>
                    </div>

                    <div className="bars">
                        <div className="bar">
                            <div className="progress-bar experience"
                                style={formatXpPercentage(parseInt(props.level), parseInt(props.xp), parseInt(props.lvlup_xp))}/>
                        </div>
                        <div className="bar">
                            <div className="progress-bar health"
                            style={formatPercentage(parseInt(props.hp), parseInt(props.max_hp))}/>
                        </div>
                        <div className="bar">
                            <div className="progress-bar mana"
                                style={formatPercentage(parseInt(props.mana), parseInt(props.max_mana))}/>
                        </div>
                    </div>
                </div>

                <div className="items-background">
                    <div className="items">
                        <Item portrait={props.item1[0]} charges={props.item1[1]} />
                        <Item portrait={props.item2[0]} charges={props.item2[1]} />
                        <Item portrait={props.item3[0]} charges={props.item3[1]} />
                        <Item portrait={props.item4[0]} charges={props.item4[1]} />
                        <Item portrait={props.item5[0]} charges={props.item5[1]} />
                        <Item portrait={props.item6[0]} charges={props.item6[1]} />
                    </div>
                </div>
            </div>
        </>
    )
}

function Portrait(props: PortraitProps) {
    return (
        <>
            <img src={directory + props.portrait}/>
            <div className="level">
                {props.level}
            </div>
        </>
    )
}

function Ability(props: AbilityProps) {
    if (parseInt(props.level) == 0) {
        return (
            <div className="abilities-padding">
                <div className="ability-placeholder"/>
            </div>
        )
    }

    switch (parseInt(props.level)) {
        case 1:
            return (
                <div className="abilities-padding">
                    <img src={directory + props.portrait}/>
                    <div className="ability-level ability-level1"/>
                </div>
            )
        case 2:
            return (
                <div className="abilities-padding">
                    <img src={directory + props.portrait}/>
                    <div className="ability-level ability-level1"/>
                    <div className="ability-level ability-level2"/>
                </div>
            )
        case 3:
            return (
                <div className="abilities-padding">
                    <img src={directory + props.portrait}/>
                    <div className="ability-level ability-level1"/>
                    <div className="ability-level ability-level2"/>
                    <div className="ability-level ability-level3"/>
                </div>
            )
    }
}

function formatXpPercentage(level: number, numerator: number, denominator: number) {
    if (numerator === -1) {
        return {
            width: `0%`
        };
    }

    const prev_lvlup_xp = 50 * (level**2 + level - 2);

    if (denominator - prev_lvlup_xp === 0) {
        return {
            width: `100%`
        };
    }

    return {
        width: `${((numerator - prev_lvlup_xp) / (denominator - prev_lvlup_xp)) * 100}%`
    };
}

function formatPercentage(numerator: number, denominator: number) {
    return {
        width: `${(numerator / denominator) * 100}%`
    };
}

function Item(props: ItemProps) {
    if (parseInt(props.charges) === -1) {
        return (
            <div className="item-placeholder"/>
        )
    }

    if (parseInt(props.charges) === 0) {
        return (
            <div className="item">
                <img src={directory + props.portrait}/>
            </div>
        )
    }

    return (
        <div className="item">
            <img src={directory + props.portrait}/>
            <div className="charges">
                {props.charges}
            </div>
        </div>
    )
}