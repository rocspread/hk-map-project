import { randomString } from '../utils/math';
import defalutStyle from '../static/mapStyle/autonavi.json';
const accessToken = 'pk.eyJ1Ijoicm9jc3ByZWFkIiwiYSI6ImNqaHB5ZmNjOTRnajUzZG4zY3JiYjB5N2MifQ.ESJZ03a470JNkWYLM5oWig';

/**
 * 默认中心点
 */
const center: Array<number> = [116.407387, 39.904179];

/**
 * 默认地图最大缩放层级
 */
const maxZoom: number = 18;

/**
 * 默认地图最小缩放层级
 */
const minZoom: number = 3;

const zoom: number = 16;
/**
 * 地图默认配置
 */
const mapOptions: any = {
    MAP_ID: 'map-container',
    STYLE: 'mapbox://styles/rocspread/cjepfva159qno2rqk8utkoodt',
    CENTER: center,
    MAX_ZOOM: maxZoom,
    MIN_ZOOM: minZoom,
    ZOOM: zoom,
};
//  MAP_ID: `map_${randomString(-9)}`,
export { accessToken, mapOptions, minZoom, maxZoom, center, defalutStyle };
