import React from "react"
import {
    Link
} from "react-router-dom";

class DatasetSingle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className="my-8 px-12 py-6 rounded-md flex flex-row space-x-72 bg-gray-50 transition duration-150 hover:bg-gray-100">

                <div className="flex-1 flex-col space-y-2">
                    <div>
                        <div className="text-xl"><Link
                            to={{
                                pathname: `/dataset/${this.props.origin.id}`,
                                dataset: this.props.origin
                            }}>{this.props.origin.name}</Link>
                        </div>
                        <div className=" text-xs text-gray-500">创建时间：{this.props.origin.create_at} ·
                            作者：{this.props.origin.owner} · 公开状态：{this.props.origin.opened}</div>
                    </div>
                    <div>{this.props.origin.description}</div>
                </div>
                <div className=" flex flex-col space-y-2">
                    <div>
                        <div className=" text-xl">{this.props.origin.percentage}</div>
                        <p className=" text-xs text-center">标注度</p>
                    </div>
                    <button class=" rounded-md bg-indigo-600 text-white p-1 text-sm" type=" submit">标注</button>
                </div>

            </div>
        );
    }
}

export default DatasetSingle;