import React from "react";
import { render, screen } from "@testing-library/react";
import { PostCard } from "."
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe ('<PostCard/>', () => {
    it('should render correctly', () => {
        // console.log do componente no terminal: 
        // const {debug} = render(<PostCard {...props} />);
        // debug();

        render(<PostCard {...props} />);

        expect(screen.getByRole('img', {name: props.title})).toBeInTheDocument();
        expect(screen.getByRole('img', {name: props.title})).toHaveAttribute('src', props.cover);
        expect(screen.getByRole('heading', {name: /title 1/i})).toBeInTheDocument();
        expect(screen.getByText('body 1')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const container = render(<PostCard {...props} />);
        expect(container).toMatchSnapshot();
    });
});