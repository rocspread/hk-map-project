/**
 * @description 热力图模块
 * @example 测试用例
 * @module heartMap
 */
import React, { useEffect, Component } from 'react';
import MapGL from 'Src/map/map';
import * as _ from 'lodash';
import '../../map/Map.css';

export default class Heatmap extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try {
            const mapOptions: any = {
                container: 'map-container',
                style: 'mapbox://styles/rocspread/cjepfva159qno2rqk8utkoodt',
                center: [116.407387, 39.904179],
                maxZoom: 18,
                minZoom: 3,
                zoom: 10,
            };
            const map = new MapGL(mapOptions);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return <div className="map-container" id="map-container"></div>;
    }
}
