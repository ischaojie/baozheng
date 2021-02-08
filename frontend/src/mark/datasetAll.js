import React from 'react'
import { Switch, Route, NavLink, useRouteMatch, useParams } from "react-router-dom"

import Faker from 'faker'

import DatasetSingle from './datasetSingle'
Faker.locale = "zh_CN"

const datasetFaker = ((count) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        const temp = {
            "id": Faker.random.number(),
            "name": Faker.commerce.productName(),
            "description": Faker.commerce.productDescription(),
            "create_at": Faker.time.recent(),
            "owner": Faker.internet.userName(),
            "opened": "Open",
            "count": Faker.random.number(),
            "percentage": `${Faker.random.float()}%`,
        }
        result.push(temp)

    }
    return result
});

function DatasetAll() {
    let { path, url } = useRouteMatch();
    return (
        <div>
            <div className="container mx-auto px-4 pt-12">
                <div className="flex flex-row justify-between">
                    <div className="text-lg tracking-widest flex flex-wrap content-center">数据集</div>
                    <Category url={url} />
                </div>

                <Switch>
                    <Route exact path={path}>
                        <OriginList origins={datasetFaker(6)} />
                    </Route>
                    <Route path={`${path}/:id`}>
                        <OriginList origins={datasetFaker(6)} />
                    </Route>
                </Switch>



            </div>
        </div>
    );
}

function Category(props) {
    const url = props.url
    const headerNav = [
        { id: 1, nav: "", name: "All", },
        { id: 2, nav: "popular", name: "Popular" },
        { id: 3, nav: "finished", name: "Finished" },
        { id: 3, nav: "marking", name: "Marking" }
    ]

    const links = [];

    for (let i = 0; i < headerNav.length; i++) {
        const temp = <NavLink 
            to={`${url}/${headerNav[i].nav}`} 
            activeClassName="font-bold text-indigo-600 "
            className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded transition-colors duration-300"
        >
            {headerNav[i].name}
        </NavLink>
        links.push(temp)
    }

    return (
        <div className="flex space-x-8">
            {links}
        </div>
    );
}

function OriginList(props) {
    const origins = props.origins;
    let { id } = useParams();
    console.log(id)
    const listItems = origins.map((origin) =>
        <DatasetSingle origin={origin} key={origin.id} />
    );
    return (
        <div className="">
            <div>{id}</div>
            {listItems}
        </div>
    );
}

export default DatasetAll