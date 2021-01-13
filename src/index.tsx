import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// 代码改动后的局部刷新
if (module && module.hot) {
    module.hot.accept();
}
ReactDOM.render(<App />, document.querySelector('#root'));
