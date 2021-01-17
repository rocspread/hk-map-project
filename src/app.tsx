import React, { Suspense } from 'react';
import './app.css';
const HeatMap = React.lazy(() => import('Src/components/Map/heatMap'));

const App = (): JSX.Element => {
    return (
        <div className="app">
            <Suspense fallback={<div> Loading...</div>}>
                <HeatMap />
            </Suspense>
        </div>
    );
};

export default App;
