import React from 'react';
import DatasetSingle from "./datasetSingle";

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

function SourceList() {
    return (
        <div className="container mx-auto px-4 pt-12">
            <div className="flex flex-row justify-between">
                <div className="text-lg tracking-widest flex flex-wrap content-center">数据集</div>
                <div>
                    <form className="relative">
                        <input type="text" name="search" id="search" placeholder="search dataset"
                               className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"/>
                        <svg width="20" height="20" fill="currentColor"
                             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                        </svg>
                    </form>

                </div>
            </div>

            <OriginList origins={datasetExample}/>

        </div>
    );
}

function OriginList(props) {
    const origins = props.origins;

    const listItems = origins.map((origin) =>
        <DatasetSingle origin={origin} key={origin.id}/>
    );
    return (
        <div className="">
            {listItems}
        </div>
    );
}

export default SourceList