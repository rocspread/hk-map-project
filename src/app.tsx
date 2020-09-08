import React from 'react';

interface IProps {
    name: string;
    age: number;
}

export default function App(properties: IProps) {
    const { name, age } = properties;
    return (
        <div className="app">
            <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
        </div>
    );
}
