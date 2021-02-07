import React from 'react'
import Faker from 'faker'

import DatasetSingle from './datasetSingle'
Faker.locale = "zh_CN"


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

const datasetFaker = ((count) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        const temp = {
            "id": Faker.random.number,
            "name": Faker.commerce.productName(),
            "description": Faker.commerce.productDescription(),
            "create_at": Faker.time.recent(),
            "owner": Faker.internet.userName(),
            "opened": "Open",
            "count": Faker.random.number(),
            "percentage": "33.33%",
        }
        result.push(temp)

    }
    return result
});

function DatasetAll() {
    return (
        <div>
            <div className="container mx-auto px-4 pt-12">
                <div className="flex flex-row justify-between">
                    <div className="text-lg tracking-widest flex flex-wrap content-center">数据集</div>
                    <div className="flex space-x-8">
                        <div className="">
                            All
                    </div>
                        <div className="">
                            二分类
                        </div>
                    </div>
                </div>

                <OriginList origins={datasetFaker(6)} />

            </div>
        </div>
    );
}

function category() {
    return (
        <div>

        </div>
    );
}

function OriginList(props) {
    const origins = props.origins;

    const listItems = origins.map((origin) =>
        <DatasetSingle origin={origin} />
    );
    return (
        <div className="">
            {listItems}
        </div>
    );
}

export default DatasetAll