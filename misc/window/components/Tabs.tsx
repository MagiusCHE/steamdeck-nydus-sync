/*
 * Copyright (c) 2022, Magius(CHE)
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author: Magius(CHE) - magiusche@magius.it
 */

import React, { createRef } from 'react';
import './Tabs.less';

import { Logger } from '@misc/window/logger';
const { log, error } = Logger.create('Tabs')

type TabEntry = {
    title: string,
    ref?: React.RefObject<HTMLButtonElement>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any
}

const tab_entries: {
    [key: string]: TabEntry
} = {
    games: {
        //icon: IconGames,
        title: '🎮 Games'
    },
    lings: {
        //icon: IconLings,
        title: '👾 Lings'
    },
    opts: {
        //icon: IconOpts,
        title: '⚙️ Options'
    },
    info: {
        //icon: IconInfo,
        title: '🔗 Info'
    }
}

const selectTab = (index: string, propagate_to_panel = true) => {
    Object.entries(tab_entries).forEach((e) => {
        if (e[0] == index)
            e[1].ref.current.classList.add('selected')
        else
            e[1].ref.current.classList.remove('selected')

        if (propagate_to_panel && activatePanel) {
            activatePanel(index)
        }
    });
}

type Props = {
    activatePanel: (index: string) => void;
}

let activatePanel: (index: string) => void;
const Tabs: React.FC<Props> = (props) => {

    activatePanel = props.activatePanel;
    Object.entries(tab_entries).forEach((e) => e[1].ref = createRef<HTMLButtonElement>());

    function on_selectTab(index: string, e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();

        selectTab(index)
        //e.currentTarget.classList.add('selected') 
    }
    return (
        <div className='tabs'>
            {Object.entries(tab_entries).map((entry) => {
                return (
                    <button
                        ref={entry[1].ref}
                        onClick={(e) => on_selectTab(entry[0], e)}
                        className={'tab'/* + (props.selected==entry[0] ? ' selected' : '')*/} key={"tab_" + entry[0]}>
                        <span>
                            {entry[1].title}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs
export { selectTab }

