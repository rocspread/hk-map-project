import React from 'react';

interface IProps {
    a: number;
    b: number;
}

const Body = (properties: IProps): JSX.Element => {
    const { a, b } = properties;

    return <p className="computed-one">{`Hi, I'm computed two, my sum is ${a} and ${b}.`}</p>;
};

export default Body;
