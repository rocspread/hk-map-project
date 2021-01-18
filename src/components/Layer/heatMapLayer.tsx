/**
 * @description 热力图模块
 * @example 测试用例
 * @module 热力图
 */
import React, { Component } from 'react';
import * as _ from 'lodash';
import { map } from 'lodash';

export default class HeatmapLayer extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try {
            let map = this.props;
            console.log('map', map);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return <div></div>;
    }
}
