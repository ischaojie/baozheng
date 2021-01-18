import React from "react"

class DatasetSingle extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className="my-4 p-6 rounded-md flex flex-row space-x-72 bg-gray-50 transition duration-150 hover:bg-gray-100">

                <div className="flex-1 flex-col space-y-2">
                    <div className="text-lg text-indigo-600">{this.props.origin.name}</div>
                    <div>{this.props.origin.description}</div>
                </div>
                <div className="flex justify-center">
                    <div className="text-xl">{this.props.origin.percentage}</div>
                    <p>标注度</p>
                </div>
            </div>
        );
    }
}

export default DatasetSingle;