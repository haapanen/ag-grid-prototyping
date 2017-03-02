import * as React from "react";
import {DataPoint} from "./entry";

export interface ValueEditorProps {
    keyPress?: number;
    charPress?: number;
}
export interface ValueEditorState {
    value: string;
}

const KEY_ENTER = 13;
const KEY_BACKSPACE = 8;
const KEY_DELETE = 46

export class ValueEditor extends React.Component<ValueEditorProps, ValueEditorState> {
    private input: HTMLInputElement;

    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            value: props.node.data[props.column.colDef.headerName].value
        };
    }

    render() {
        return <input ref={(input) => this.input = input} value={this.state.value} style={{ width: "100%", height: "20px", padding: "0"}} onChange={(e) => this.setState({...this.state, value: e.target.value})}/>
    }

    getValue() {
        return this.state.value;
    }

    isCancelAfterEnd() {
        if (isNaN(parseInt(this.state.value))) {
            return true;
        }
        return false;
    }

    afterGuiAttached() {
        switch (this.props.keyPress) {
            case KEY_ENTER:
                this.input.setSelectionRange(0, this.input.value.length);
                break;
            case KEY_BACKSPACE:
                this.setState({
                    ...this.state,
                    value: ''
                });
                break;
            case KEY_DELETE:
                this.setState({
                    ...this.state,
                    value: ''
                });
                break;
        }

        this.input.focus();
    }
}
