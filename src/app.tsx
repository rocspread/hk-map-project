import React from 'react';
import './app.css';
import Header from 'Components/Header';

interface IProps {
    name: string;
    age: number;
}

export default function App(properties: IProps) {
    const { name, age } = properties;
    return (
        <div className="app">
            <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
            <Header a={1} b={2} />
        </div>
    );
}
