import React, { createRef, RefObject } from 'react';


import { Logger } from '../../logger';

type PanelProps = {
    //children?: React.ReactNode
}

abstract class Panel {
    constructor(public readonly log_name: string, public readonly ref_panel: RefObject<HTMLDivElement>) {
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
    public abstract get_element(props: PanelProps): JSX.Element
}

export { PanelProps, Panel }