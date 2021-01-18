/**
 * @description 热力图模块
 * @example 测试用例
 * @module heartMap
 */
import React, { useEffect, Component } from 'react';
import MapGL from 'Src/map/map';
import * as _ from 'lodash';
import '../../map/Map.css';
import { mapOptions } from '../../js/mapConfig';
import HeatMapLayer from '../Layer/heatMapLayer';

export default class Heatmap extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            mapDefs: {},
        };
    }

    componentDidMount() {
        try {
            const map = this.mapInit();
            window['mapDefs'] = map; //挂载map
        } catch (error) {
            console.log(error);
        }
    }

    mapInit() {
        return new MapGL(mapOptions)._map;
    }

    render() {
        const { mapDefs } = this.state;
        return (
            <div className="map-container" id="map-container">
                {mapDefs && <HeatMapLayer mapDefs={mapDefs} />}
            </div>
        );
    }
}
