import React, { Component } from 'react'

export class Button extends Component {
    render() {
        return (
            <div>
                <button class="w-1/2 flex items-center justify-center rounded-md bg-black text-white" type="submit">{this.props.name}</button>
            </div>
        )
    }
}

export default Button
