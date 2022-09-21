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
import { PanelProps, Panel } from './Panel';

class Games extends Panel {
    constructor() {                
        super('👾 Lings', createRef<HTMLDivElement>())
    }

    public get_element(props: PanelProps) {
        return (
            <div className='panel' ref={this.ref_panel}>
                <div className='header'>
                    <div className='main-heading'>
                        <h1 className='themed'>Nydus: Lings </h1>
                    </div>
                    <div className='main-teaser'>
                        <div>                            
                            If you think the project is useful enough, just spread the word around!
                        </div>
                    </div>
                    <div className='center'>
                        <button
                            onClick={async () => {
                                try {
                                    this.log("Send %o", 'test')
                                    const ret = await mainAPI.test()
                                    this.log("Received %o", ret)
                                } catch (err) {
                                    this.error("Received error", err)
                                }
                            }}
                        >

                        </button>
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

export default Games


