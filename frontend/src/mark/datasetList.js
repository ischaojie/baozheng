import React from 'react';
import DatasetSingle from "./datasetSingle";

const datasetExample = [
    {
        "id": 1,
        "name": "spam message",
        "description": "this is spam message",
        "create_at": "",
        "owner": "shiniao",
        "opened": "Open",
        "count": 122121,
        "percentage": "33.33%",
    },
    {
        "id": 2,
        "name": "house rental",
        "description": "this is house rental",
        "create_at": "",
        "owner": "chaojie",
        "opened": "Close",
        "count": 46532,
        "percentage": "90.03%",

    }
]

class SourceList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex justify-center ">

                <div className="px-6">
                    数据集
                    <OriginList origins={datasetExample}/>
                </div>

            </div>

        );
    }
}

function OriginList(props) {
    const origins = props.origins;
    const listItems = origins.map((origin) =>
        <DatasetSingle origin={origin}/>
    );
    return (
        <div>
            {listItems}
        </div>
    );
}

export default SourceList