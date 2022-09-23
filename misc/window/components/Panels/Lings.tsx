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

import React, { createRef } from 'react';
import Panel, { PanelProps } from './Panel';

class Lings extends Panel {
    constructor() {
        super('👾 Lings', 'lings', createRef<HTMLDivElement>())
    }

    public override get_element(props: PanelProps) {

        return (
            <div className='panel' ref={this.ref_panel} key={'panel_' + this.index}>
                <div className='header'>
                    <div className='main-heading'>
                        <h1 className='themed'>Linked Lings</h1>
                    </div>
                    <div className='main-teaser'>
                        List of linked Nydus Lings.
                    </div>
                    <div className='main-heading'>
                        <h3 className='themed'>Discover Lings</h3>
                    </div>
                    <div className='main-teaser secondary'>
                        Use this function to scan local network and find Active Lings!
                    </div>
                </div>

                <div className='footer'>
                    <div className='center'>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lings



