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

import React, { createRef, useEffect, useState } from 'react';
import Panel, { PanelProps } from './Panel';

class Options extends Panel {
    constructor() {
        super('⚙️ Options', 'opts', createRef<HTMLDivElement>())
    }

    public override get_element(props: PanelProps) {
        const [darkTheme, setDarkTheme] = useState(true);
        useEffect(() => {
            const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
            if (isNaN(useDarkTheme)) {
                setDarkTheme(true);
            } else if (useDarkTheme == 1) {
                setDarkTheme(true);
            } else if (useDarkTheme == 0) {
                setDarkTheme(false);
            }
        }, []);
        useEffect(() => {
            if (darkTheme) {
                localStorage.setItem('dark-mode', '1');
                document.body.classList.add('dark-mode');
            } else {
                localStorage.setItem('dark-mode', '0');
                document.body.classList.remove('dark-mode');
            }
        }, [darkTheme]);

        const toggleTheme = () => {
            setDarkTheme(!darkTheme);
        }
        return (
            <div className='panel' ref={this.ref_panel} key={'panel_' + this.index}>
                <div className='header'>
                    <div className='main-heading'>
                        <h1 className='title'>Apparence</h1>
                    </div>
                    <div className='main-teaser'>
                        <table className="options-table">
                            <tbody>
                                <tr>
                                    <th scope="col" className='col-3'>Dark Theme</th>
                                    <td scope="col" className='form-switch text-end'>
                                        <input className="form-check-input" type="checkbox" role="switch" checked={darkTheme} onChange={(e) => {
                                            setDarkTheme(e.target.checked)
                                        }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

export default Options



