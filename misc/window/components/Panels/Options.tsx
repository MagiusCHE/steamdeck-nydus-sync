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

class Options extends Panel {
    constructor() {
        super('⚙️ Options', 'opts', createRef<HTMLDivElement>())
    }

    public override get_element(props: PanelProps) {

        return (
            <div className='panel' ref={this.ref_panel} key={'panel_' + this.index}>
                <div className='header'>
                    <div className='main-heading'>
                        <h1 className='themed'>Nydus: {this.log_name}</h1>
                    </div>
                    <div className='main-teaser'>
                        <div>
                            If you think the project is useful enough, just spread the word around!
                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <div className='center'>
                        TODO
                    </div>
                </div>
            </div>
        )
    }
}

export default Options



