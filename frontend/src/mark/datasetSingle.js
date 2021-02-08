import React from "react"
import {
    Link,
} from "react-router-dom";

function DatasetSingle(props) {
    const origin = props.origin
    return (
        <div className="my-8 px-12 py-6 rounded-md
                        flex flex-row space-x-72 bg-gray-50
                        transition duration-150 hover:bg-gray-100">
            <div className="flex-1 flex-col space-y-2">
                <div>
                    <div className="text-xl"><Link
                        to={{
                            pathname: `/dataset/${origin.id}`,
                            state: {dataset: origin},   
                        }}>{origin.name}</Link>
                    </div>
                    <div className=" text-xs text-gray-500">创建时间：{origin.create_at} ·
                        作者：{origin.owner} · 公开状态：{origin.opened}</div>
                </div>
                <div>{origin.description}</div>
            </div>
            <div className=" flex flex-col space-y-2">
                <div>
                    <div className=" text-xl">{origin.percentage}</div>
                    <p className=" text-xs text-center">标注度</p>
                </div>
                <button className=" rounded-md bg-indigo-600 text-white p-1 text-sm" type=" submit">标注</button>
            </div>

        </div>
    );
}

export default DatasetSingle;