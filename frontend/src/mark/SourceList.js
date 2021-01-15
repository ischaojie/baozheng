import React from 'react';

function SingleOrigin(props) {
    const origin = props.origin;
    return (
        <div className="my-4 p-6 rounded-md flex flex-row space-x-64 bg-gray-50 transition duration-150 hover:bg-gray-100">

            <div className="flex-1 flex-col space-y-2">
                <div className="text-lg text-indigo-600 font-semibold">{origin.name}</div>
                <div>{origin.description}</div>
            </div>
            <div className="flex flex-wrap content-center text-lg">
                33.6%
            </div>
        </div>

    );
}

function OriginList(props) {
    const origins = props.origins;
    const listItems = origins.map((origin) =>
        <SingleOrigin origin={origin}/>
    );
    return (
        <div>
            {listItems}
        </div>
    );
}

const originsExample = [
    {
        "id": 1,
        "name": "spam message",
        "description": "this is spam message",
        "percentage": "33.33%",
    },
    {
        "id": 2,
        "name": "house rental",
        "description": "this is house rental",
        "percentage": "90.03%",

    }
]

class SourceList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex justify-around">
                <OriginList origins={originsExample}/>
            </div>

        );
    }
}

export default SourceList