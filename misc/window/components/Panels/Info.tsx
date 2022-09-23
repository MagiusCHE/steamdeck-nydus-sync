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

class Info extends Panel {
    constructor() {
        super('🔗 Info', 'info', createRef<HTMLDivElement>())
    }

    public override get_element(props: PanelProps) {

        return (
            <div className='panel' ref={this.ref_panel} key={'panel_' + this.index}>
                <div className='header'>
                    <div className='main-heading'>
                        <h1 className='themed'>Contributors / Packages</h1>
                    </div>
                    <div className='main-teaser'>
                        <ul>
                            <li><b>Guasam</b> with <a rel="noreferrer" target="_blank" href="https://github.com/codesbiome/electron-react-webpack-typescript-2022" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                mainAPI.open_external((e.target as HTMLAnchorElement).href)
                            }}>Electron React Webpack Typescript (ERWT)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info



