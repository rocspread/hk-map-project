import React, { Suspense, useState } from 'react';
import './app.css';

interface IProps {
    name: string;
    age: number;
}

const Header = React.lazy(() => import('Components/Header/index'));
const Body = React.lazy(() => import('Components/Header/body'));

export default function App(properties: IProps) {
    const { name, age } = properties;
    const [showTwo, setShowTwo] = useState<boolean>(false);
    return (
        <div className="app">
            <Suspense fallback={<div> Loading...</div>}>
                <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
                <Header a={6} b={2} />
                {showTwo && <Body a={3} b={4} />}
                <button
                    type="button"
                    onClick={() => {
                        setShowTwo(true);
                    }}
                >
                    display
                </button>
            </Suspense>
        </div>
    );
}
