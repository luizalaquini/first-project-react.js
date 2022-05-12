import React from 'react';
import { jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { Button } from '.';

describe('<Button/>', () => {
    it('should render with the text "Load More"', () => {
        const fn = jest.fn();
        render(<Button text='Load more' onClick={fn}/>);

        expect.assertions(1); // para garantir que pelo menos uma acersao ocorreu (expect)
                              // comum em testes assincronos
                                
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
        const fn = jest.fn();
        render(<Button text='Load more' disabled={true} onClick={fn}/>);
        expect(screen.getByRole('button', {name: /load more/i})).toBeDisabled();
    }); 

    it('should be enabled when "disabled=false"', () => {
        const fn = jest.fn();
        render(<Button text='Load more' disabled={false} onClick={fn}/>);
        expect(screen.getByRole('button', {name: /load more/i})).toBeEnabled();
    }); 

    it('should match snapshot', () => {
        const fn = jest.fn();
        const container = TestRenderer.create(
            <Button text='Load more' disabled={false} onClick={fn} />
        ).toJSON();    
        expect(container).toMatchSnapshot();
    });
});