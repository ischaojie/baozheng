import React from 'react'
import {useLocation, useParams} from "react-router-dom";

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

const datasetTableExample = [
    {
        "id": 1,
        "content": "This is a spam message",
        "classify": 1,
    },
    {
        "id": 2,
        "content": "This is a spam message",
        "classify": 0,
    },
    {
        "id": 3,
        "content": "This is a spam message",
        "classify": 1,
    },
    {
        "id": 4,
        "content": "This is a spam message",
        "classify": 1,
    }
]

function DatasetDetail() {
    let {id} = useParams();
    let {dataset} = useLocation();
    return (
        <div className="max-w-screen-md md:max-w-screen-lg mx-auto pt-6">
            <DatasetFields dataset={datasetExample[0]}/>
            <DatasetOrigin/>
        </div>
    );
}


function DatasetFields(props) {
    return (
        <div>
            <Title dataset={datasetExample[0]}/>
            <hr className="mb-6"/>
            <div className="bg-white sm:rounded-lg">
                <dl>
                    <DatasetField bgGray fieldKey="创建时间" fieldValue={props.dataset.create_at}/>
                    <DatasetField fieldKey="拥有者" fieldValue={props.dataset.owner}/>
                    <DatasetField bgGray fieldKey="公开状态" fieldValue={props.dataset.opened}/>
                    <DatasetField fieldKey="数据量" fieldValue={props.dataset.count}/>
                    <DatasetField bgGray fieldKey="标注度" fieldValue={props.dataset.percentage}/>
                    <DatasetField bgGray fieldKey="描述" fieldValue={props.dataset.description}/>

                </dl>
            </div>
        </div>

    );
}

function Title(props) {
    return (
        <div className="flex justify-between items-center">

            <div className="flex-1 px-4 py-5 sm:px-6">
                <div className="text-lg leading-6 font-medium text-gray-900">
                    {props.dataset.name}
                </div>
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                    {props.dataset.description}
                </div>

            </div>

            <div className="flex space-x-4 px-5 justify-between">
                <button className="rounded-md bg-indigo-600 text-white px-4 py-1 text-sm" type="submit">标注</button>
                <button className="rounded-md bg-indigo-600 text-white px-4 py-1 text-sm" type="submit">下载</button>
            </div>
        </div>
    );
}


function DatasetField(props) {

    return (
        <div
            className={`${props.bgGray ? "bg-gray-50" : "bg-white"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
            <dt className="text-sm font-medium text-gray-500">
                {props.fieldKey}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {props.fieldValue}
            </dd>
        </div>
    );
}

function DatasetOrigin() {
    return (
        <div className="pt-12">
            <div className="py-5 px-4">源数据信息</div>
            <hr className="mb-6"/>
            <div className="bg-black text-white p-4">
                <code>mysql> select * from dataset_spam_message;
                    <span className="animate-pulse text-indigo-600">|</span>
                </code>
                <DatasetTable tables={datasetTableExample}/>
            </div>

        </div>

    );
}

function DatasetTable(props) {
    const tables = props.tables
    const TablesList = tables.map((table) =>
        <div className="table-row">
            <div className="table-cell py-2 px-12 border-r border-dashed">
                {table.id}
            </div>
            <div className="table-cell py-2 px-12 border-r border-dashed">
                {table.content}
            </div>
            <div className="table-cell py-2 px-12 border-r border-dashed">
                {table.classify}
            </div>
        </div>
    );

    return (
        <div className="table border border-dashed my-6">
            <div className="table-header-group">
                <div className="table-row">
                    <div className="table-cell py-2 px-12 border border-dashed">
                        id
                    </div>
                    <div className="table-cell py-2 px-12 border border-dashed">
                        content
                    </div>
                    <div className="table-cell py-2 px-12 border border-dashed">
                        classify
                    </div>
                </div>
            </div>
            <div className="table-row-group">
                {TablesList}
            </div>
        </div>
    );
}


export default DatasetDetail

