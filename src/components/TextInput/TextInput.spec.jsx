import { render, screen } from "@testing-library/react";
import { type } from '@testing-library/user-event/dist/type';
import { TextInput } from '.'

describe('<TextInput/>', () => {
    it('should call handleChange function on each key pressed', () => {
        const fn = jest.fn();
        const {debug} = render(<TextInput handleChange={fn} searchValue={'testando'}/>);

        debug();
    });

    it('should have the respective value on searchValue when typed', async () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn}/>);

        const input = screen.getByPlaceholderText(/Pesquisa/i);
        const value = 'testando';

        type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it('should match snapshot', async () => {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn}/>);

        expect(container).toMatchSnapshot();
    });
})