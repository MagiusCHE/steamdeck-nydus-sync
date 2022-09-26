/*
 * Copyright (c) 2022, Magius(CHE)
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author: Magius(CHE) - magiusche@magius.it
 */


import mainAPI from '../../mainAPIContextApi';

import React, { createRef, MouseEvent } from 'react';
import Panel, { PanelProps } from './Panel';




class Games extends Panel {
    constructor() {
        super('🎮 Games', 'games', createRef<HTMLDivElement>())
    }

    public override get_element(props: PanelProps) {
        const addNewGame = async (e: MouseEvent) => {
            try {
                const path = await mainAPI.choose_path('Select root path of the game')
                this.log("Received %o", path)
            } catch (err) {
                this.error("Received error", err)
            }
        }
        return (
            <div className='panel' ref={this.ref_panel} key={'panel_' + this.index}>
                <div className='header'>
                    <div className='main-heading'>
                        <h1 className='themed'>Local Games</h1>
                    </div>
                    <div className='main-teaser'>
                        ⚠️ &nbsp; No game in list. Add one using button below.
                    </div>
                    <div className='center'>
                        <button
                            onClick={addNewGame}
                        >
                            ➕ Add new Game
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Games



