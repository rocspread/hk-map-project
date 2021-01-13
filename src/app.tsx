import React, { Suspense, useState } from 'react';
import './app.css';
import HeatMap from 'src/components/Test/heatMap';

const App = (): JSX.Element => {
    return (
        <div className="app">
            <Suspense fallback={<div> Loading...</div>}>
                <HeatMap></HeatMap>
            </Suspense>
        </div>
    );
};

export default App;
