import React from 'react';

interface IProps {
    a: number;
    b: number;
}

function Body(properties: IProps) {
    const { a, b } = properties;

    return <p className="computed-one">{`Hi, I'm computed two, my sum is ${a} and ${b}.`}</p>;
}

export default Body;
