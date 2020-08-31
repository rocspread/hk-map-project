import './app.css';
import cat from '../assets/cat.png';

const root = document.querySelector('#root');
const imageTest = document.querySelector('#imageTest');

root.innerHTML = 'webpack + react';
imageTest.src = cat;
