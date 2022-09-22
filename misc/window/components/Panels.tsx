/*
 * Copyright (c) 2022, Magius(CHE)
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author: Magius(CHE) - magiusche@magius.it
 */

import { Logger } from '@misc/window/logger';
const { log, error } = Logger.create('Panels')

import React from 'react';

import './Panels.less';

import Games from './Panels/Games'
import Lings from './Panels/Lings'
import Panel from './Panels/Panel';

interface PanelType {
    new(...args: unknown[]): Panel
}

const PanelsInfo: {
    [key: string]: PanelType
} = {
    games: Games,
    lings: Lings,
    /*opts: ,
    info: */
}

type PanelEntry = {
    //ref?: typeof GamesRef,
    panel?: Panel
}

const panel_entries: {
    [key: string]: PanelEntry
} = {}

Object.entries(PanelsInfo).forEach(info => {
    const panel = new info[1]()

    panel_entries[info[0]] = {
        panel: panel,        
    }
})

const selectPanel = (index: string) => {
    Object.entries(panel_entries).forEach((e) => {
        e[1].panel?.select(e[0] == index)
    });
}

type PanelsProps = Record<string, unknown>

const Panels: React.FC = () => {
    return (
        <div className='panels'>
            {Object.entries(panel_entries).map(panel => {
                return panel[1].panel?.get_element({})
            })}

        </div>
    )
}

export default Panels

export { selectPanel, PanelsProps }

