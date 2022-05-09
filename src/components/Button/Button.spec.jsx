import { fireEvent, getByRole, render, screen } from '@testing-library/react';
//import { userEvent } from '@testing-library/user-event';
import TestRenderer from 'react-test-renderer';
import { Button } from '.';

describe('<Button/>', () => {
    it('should render with the text "Load More"', () => {
        render(<Button text='Load more'/>);

        expect.assertions(1); // para garantir que pelo menos uma acersao ocorreu (expect)
                                // comum em teste assincronos
                                
        const button = screen.getByRole('button', {name: /load more/i});
        expect(button).toBeInTheDocument();
    }); 

    it('should call function on button click', () => {
        const fn = jest.fn();

        render(<Button text='Load more' onClick={fn} />);

        const button = screen.getByRole('button', {name: /load more/i});

        //userEvent.click(button);
        fireEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    }); 

    it('should be disabled when "disabled=true"', () => {
        render(<Button text='Load more' disabled={true} />);
        expect(screen.getByRole('button', {name: /load more/i})).toBeDisabled();
    }); 

    it('should be enabled when "disabled=false"', () => {
        render(<Button text='Load more' disabled={false} />);
        expect(screen.getByRole('button', {name: /load more/i})).toBeEnabled();
    }); 

    it('should match snapshot', () => {
        const container = TestRenderer.create(
            <Button text='Load more' disabled={false} />
        ).toJSON();    
        expect(container).toMatchSnapshot();
    });
});