import React, {Component} from 'react'

const datasetExample = [
    {
        "id": 1,
        "name": "spam message",
        "description": "this is spam message,this is spam message,this is spam message.",
        "create_at": "2021-01-19",
        "owner": "shiniao",
        "opened": "Open",
        "count": 122121,
        "percentage": "33.33%",
    },
    {
        "id": 2,
        "name": "house rental",
        "description": "this is house rental,this is house rental,this is house rental,this is house rental.",
        "create_at": "2021-01-19",
        "owner": "chaojie",
        "opened": "Close",
        "count": 46532,
        "percentage": "90.03%",

    },
    {
        "id": 3,
        "name": "digital con",
        "description": "this is house rental,this is house rental,this is house rental,this is house rental.",
        "create_at": "2021-01-19",
        "owner": "chaojie",
        "opened": "Open",
        "count": 46532,
        "percentage": "47.66%",

    }
]

class DatasetDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container mx-auto px-4 pt-12">
                {this.props.match.params.id}
                <DatasetFields dataset={datasetExample[0]}/>
            </div>
        )
    }
}

function DatasetFields(props) {
    let dataset = props.dataset
    return (
        <div className="grid grid-cols-3 gap-4 place-content-between">
            <DatasetField _key="创建时间" value={dataset.create_at}/>
            <DatasetField _key="拥有者" value={dataset.owner}/>
            <DatasetField _key="公开状态" value={dataset.opened}/>
            <DatasetField _key="数据量" value={dataset.opened}/>
        </div>
    );
}

function DatasetField(props) {
    let _key = props._key
    let value = props.value
    return (
        <div className="flex flex-col">
            <div className="text-gray-500">{_key}</div>
            <div>{value}</div>
        </div>
    );
}


export default DatasetDetail

