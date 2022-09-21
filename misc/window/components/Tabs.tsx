/*
 * Copyright (c) 2022, Magius(CHE)
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author: Magius(CHE) - magiusche@magius.it
 */


//Thx to https://www.flaticon.com/
// <a href="https://www.flaticon.com/free-icons/about" title="about icons">About icons created by Smashicons - Flaticon</a>
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import './Tabs.less';
/*type Props = {
    selected?: string
};*/
import IconGames from '@assets/icons/video-game.png';
import IconLings from '@assets/icons/eye.png';
import IconOpts from '@assets/icons/gear.png';
import IconInfo from '@assets/icons/about.png';

type TabEntry = {
    icon: typeof IconGames,
    title: string,
    ref?: React.RefObject<HTMLButtonElement>
}

const tab_entries: {
    [key: string]: TabEntry
} = {
    games: {
        icon: IconGames,
        title: 'Games'
    },
    lings: {
        icon: IconLings,
        title: 'Lings'
    },
    opts: {
        icon: IconOpts,
        title: 'Options'
    },
    info: {
        icon: IconInfo,
        title: 'Info'
    }
}

type Props = {
    activatePanel: (index: string) => void;
}
const Tabs: React.FC<Props> = (props) => {
    Object.entries(tab_entries).forEach((e) => e[1].ref = createRef<HTMLButtonElement>());

    function selectTab(index: string, e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();

        Object.entries(tab_entries).forEach((e) => {
            if (e[0] == index) {
                e[1].ref.current.classList.add('selected')
            }
            else
                e[1].ref.current.classList.remove('selected')
        });
        props.activatePanel(index)
        //e.currentTarget.classList.add('selected') 
    }
    return (
        <div className='tabs'>
            {Object.entries(tab_entries).map((entry) => {
                return (
                    <button
                        ref={entry[1].ref}
                        onClick={(e) => selectTab(entry[0], e)}
                        className={'tab'/* + (props.selected==entry[0] ? ' selected' : '')*/} key={"tab_" + entry[0]}>
                        <span>
                            <img className='tab-icon' src={entry[1].icon} /> {entry[1].title}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs

