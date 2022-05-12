import React, { Component } from 'react';
import P from 'prop-types';

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

Button.propTypes = {
    text: P.string.isRequired,
    onClick: P.func.isRequired,
    disabled: P.bool, // quando nao passa isRequired é necessario passar um padrao
};

Button.defaultProps = {
    disabled: false,
};