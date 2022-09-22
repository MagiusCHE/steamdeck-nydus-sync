import React, { createRef, RefObject } from 'react';


import { Logger } from '../../logger';

type PanelProps = {
    //children?: React.ReactNode
}

abstract class Panel {
    constructor(public readonly log_name: string, public readonly index: string, public readonly ref_panel: RefObject<HTMLDivElement>) {
        const { log, error } = Logger.create(log_name)
        this.log = log
        this.error = error
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public readonly log: (format: string, ...args: any[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public readonly error: (format: string, ...args: any[]) => void
    public select(selected: boolean) {
        if (selected)
            this.ref_panel.current.classList.add('visible')
        else
            this.ref_panel.current.classList.remove('visible')
    }
    public get_element(props: PanelProps): JSX.Element {
        return (
            <div className='panel' ref={this.ref_panel} key={'panel_' + this.index}>
                <div className='header'>
                    <div className='main-heading'>
                        <h1 className='themed'>Nydus: panelname</h1>
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

export default Panel
export { PanelProps  }