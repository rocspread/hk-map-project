import React, { Suspense, useState } from 'react';
import './app.css';
import { add } from 'Utils/math';

interface IProps {
    name: string;
    age: number;
}

const Header = React.lazy(() => import('Components/Header/index'));
const Body = React.lazy(() => import('Components/Header/body'));

const App = (properties: IProps): JSX.Element => {
    const { name, age } = properties;
    const [showTwo, setShowTwo] = useState<boolean>(false);
    return (
        <div className="app">
            <Suspense fallback={<div> Loading...</div>}>
                <span>{`Hello! I'm ${name}, ${age} years old.`}</span>
                <span>{add(age, age)}</span>
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
};

export default App;
