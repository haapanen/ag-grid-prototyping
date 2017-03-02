import * as React from "react";
import * as ReactDOM from "react-dom";
import * as AgGrid from "ag-grid";
import {AgGridReact} from "ag-grid-react";
import {ValueEditor} from "./ValueEditor";
export interface DataPoint { status: number, value: number }

export interface Data {
    name: string;
    dataPoints: DataPoint[];
}

function generateData() {
    return ["Test 1", "Test 2", "ABC", "DEF", "XYZ", "HEH"].map(x => {
        return {
            name: x,
            dataPoints: createDataPoints(700)
        }
    });
}

function createDataPoints(numDataPoints: number) {
    let dataPoints: DataPoint[] = [];
    for (let i = 0; i < numDataPoints; ++i) {
        dataPoints.push({
            status: Math.floor(Math.random() * 3),
            value: Math.floor(Math.random() * 70)
        });
    }
    return dataPoints;
}

function convertToColumns(input: Data[]): {[index: string]: DataPoint}[] {
    let data: {[index: string]: DataPoint}[] = [];

    for (var i = 0, len = input[0].dataPoints.length; i < len; ++i) {
        data.push({})
        input.forEach(x => {
            data[data.length - 1][x.name] = x.dataPoints[i];
        });
    }

    return data;
}

let data = generateData();

class App extends React.Component<any, { data: Data[], rows: {[index: string]: DataPoint}[] }> {
    constructor(props: {}, context: any) {
        super(props, context);

        const data = generateData();
        const rows = convertToColumns(data);

        this.state = {
            rows,
            data
        };
    }

    render() {
        return (
            <div className="ag-fresh ag-basic" style={{ width: "100vw", height: "100vh"}}>
                <AgGridReact
                    columnDefs={this.getColumnDefs()}
                    rowData={this.state.rows}
                    rowHeight={22}
                    singleClickEdit="true"
                />
            </div>
        )
    };

    private getColumnDefs(): AgGrid.ColDef[] {
        return this.state.data.map(x => {
            return {
                headerName: x.name,
                cellRenderer: (params: any) => {
                    return params.data[params.colDef.headerName].value;
                },
                editable: true,
                cellEditorFramework: ValueEditor,
                newValueHandler: (params: any) => {
                    console.log(params);
                },
                width: 200
            }
        });
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));