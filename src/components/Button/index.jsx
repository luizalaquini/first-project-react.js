import { Component } from 'react';

import './style.css'

export class Button extends Component{
    render () {
        const {text, onClick, disabled} = this.props
        return (
            <button className='btn' onClick={onClick} disabled={disabled}> 
                {text} 
            </button>
        )
    }
}

// export const Button = ({ text, onClick, disabled }) => (
//     <button
//       className='button'
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {text}
//     </button>
// );
// [COMO USAR CSS AQUI?]