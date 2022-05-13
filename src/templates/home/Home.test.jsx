import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Home } from '.';


const handlers = [
    // o asterísco (*) faz interceptar toda chamada derivada desse site 
    // nesse caso faz economizarmos um segundo rest.get colocando todos os parametros em um só
    rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
        return res (
            ctx.json([
                {
                    userId: 1,
                    id: 1,
                    title: 'title1',
                    body: 'body1',
                    url: 'img1.jpg',
                },
                {
                    userId: 2,
                    id: 2,
                    title: 'title2',
                    body: 'body2',
                    url: 'img2.jpg',
                },
                {
                    userId: 3,
                    id: 3,
                    title: 'title3',
                    body: 'body3',
                    url: 'img3.jpg',
                },
                {
                    userId: 4,
                    id: 4,
                    title: 'title4',
                    body: 'body4',
                    url: 'img4.jpg',
                },
                {
                    userId: 5,
                    id: 5,
                    title: 'title5',
                    body: 'body5',
                    url: 'img5.jpg',
                },
                {
                    userId: 6,
                    id: 6,
                    title: 'title6',
                    body: 'body6',
                    url: 'img6.jpg',
                },
                {
                    userId: 7,
                    id: 7,
                    title: 'title7',
                    body: 'body7',
                    url: 'img7.jpg',
                },
                {
                    userId: 8,
                    id: 8,
                    title: 'title8',
                    body: 'body8',
                    url: 'img8.jpg',
                },
                {
                    userId: 9,
                    id: 9,
                    title: 'title9',
                    body: 'body9',
                    url: 'img9.jpg',
                },
                {
                    userId: 10,
                    id: 10,
                    title: 'title10',
                    body: 'body10',
                    url: 'img10.jpg',
                },
                {
                    userId: 11,
                    id: 11,
                    title: 'title11',
                    body: 'body11',
                    url: 'img11.jpg',
                },
                {
                    userId: 12,
                    id: 12,
                    title: 'title12',
                    body: 'body12',
                    url: 'img12.jpg',
                },
                {
                    userId: 13,
                    id: 13,
                    title: 'title13',
                    body: 'body13',
                    url: 'img13.jpg',
                },
            ]),
        );
    }),
];

const server = setupServer(...handlers);

describe('<Home/>', () => {
    beforeAll(() => {
        server.listen(); // liga o servidor
    });

    afterEach(() => {
        server.resetHandlers(); // para nenhum afetar o outro
    });

    afterAll(() => {
        server.close(); // desliga o servidor
    });

    it('should render search, posts and button "load more"', async () => {
        render(<Home/>);
        const noPosts = screen.getByText('Nao foi possível encontrar =(');

        expect.assertions(3); // importante quando temos chamadas assincronas como o await abaixo

        await waitForElementToBeRemoved(noPosts);
        //screen.debug();

        const search = screen.getByPlaceholderText(/Type your search/i);
        expect(search).toBeInTheDocument();

        const images = screen.getAllByRole('img', {name: /title/i});
        expect(images).toHaveLength(12);

        const button = screen.getByRole('button', {name: /load more posts/i});
        expect(button).toBeInTheDocument();
    });

    it('should serach for more posts', async () => {
        render(<Home/>);
        const noPosts = screen.getByText('Nao foi possível encontrar =(');

        expect.assertions(7); // importante quando temos chamadas assincronas como o await abaixo

        await waitForElementToBeRemoved(noPosts);
 
        const search = screen.getByPlaceholderText(/Type your search/i);
    
        userEvent.type(search, 'title3');

        expect(screen.getByRole('heading', { name: 'Your search: title3'})).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'title1 1'})).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'title2 2'})).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'title3 3'})).toBeInTheDocument();

        userEvent.clear(search);

        expect(screen.getByRole('heading', { name: 'title1 1'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'title2 2'})).toBeInTheDocument();

        userEvent.type(search, 'blabla');

        expect(screen.getByText('Nao foi possível encontrar =(')).toBeInTheDocument();
    });

    it('should load more posts when button is pressed', async () => {
        render(<Home/>);
        const noPosts = screen.getByText('Nao foi possível encontrar =(');
        const button = screen.getByRole('button', { name: /load more posts/i});

        //expect.assertions(3); // importante quando temos chamadas assincronas como o await abaixo

        await waitForElementToBeRemoved(noPosts);
        
        userEvent.click(button);

        expect(screen.getByRole('heading', { name: 'title13 13'})).toBeInTheDocument();
        expect(button).toBeDisabled();
    });
});