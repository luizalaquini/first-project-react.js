import React from "react";
import { render, screen } from "@testing-library/react";
import { type } from '@testing-library/user-event/dist/type';
import { TextInput } from '.'

describe('<TextInput/>', () => {
    it('should call handleChange function on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'}/>);
        //debug();
    });

    it('should have the respective value on searchValue when typed', async () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue='valor qualquer' />);

        const input = screen.getByPlaceholderText(/Your search/i);
        const value = 'testando';

        type(input, value);

        expect(input.value).toBe('valor qualquer');
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it('should match snapshot', async () => {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn} searchValue=''/>);

        expect(container).toMatchSnapshot();
    });
})