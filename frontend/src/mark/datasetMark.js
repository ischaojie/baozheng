import React from 'react';

const sourceExample = {
    name: "test source",
    detail: "This is a test source",
    origin: {
        name: "spam message",
        description: "what the fuck",
    }
}

class DatasetMark extends React.Component {

    render() {
        return (
            <div className="flex flex-col p-8 max-w-md mx-auto bg-white text-center">
                <div className="py-12 text-lg font-medium text-black">is this {sourceExample.origin.name} ？</div>
                <SingleSource source={sourceExample}/>
                <div className="flex pt-8">
                    <Button name={'Yes'}/>
                    <Button name={'No'}/>
                </div>

            </div>
        );
    }
}

class SingleSource extends React.Component {

    render() {
        return (
            <div className="p-8 rounded-xl shadow-md">
                <div className="">{this.props.source.name}</div>
                <p className="text-gray-400">{this.props.source.detail}</p>
            </div>
        );

    }
}

class Button extends React.Component {

    render() {
        return (
            <button onClick="" className="flex-1 mx-4 px-6 py-1
                        text-sm text-purple-600 font-semibold
                        rounded-full border border-purple-200
                        hover:text-white hover:bg-purple-600 hover:border-transparent
                        focus:outline-none
                        "
            >{this.props.name}
            </button>
        );
    }
}

export default DatasetMark