import React from 'react';

interface IProps {
    a: number;
    b: number;
}

function Header(properties: IProps) {
    const { a } = properties;

    return <p className="computed-one">{`Hi, I'm computed one, my sum is ${a}.`}</p>;
}

export default Header;
