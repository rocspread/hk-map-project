import { randomString } from '../utils/math';
import defalutStyle from '../static/mapStyle/autonavi.json';
const accessToken = 'pk.eyJ1IjoiZWR5ZGF0YSIsImEiOiJjajZobmwzdzcwYjMxMzJteTd2Y3A0MGVyIn0.kw8CoNgHKeywtca6JlK2UA';

/**
 * 默认中心点
 */
const center: Array<number> = [120.209947, 30.245853];

/**
 * 默认地图最大缩放层级
 */
const maxZoom: number = 18;

/**
 * 默认地图最小缩放层级
 */
const minZoom: number = 3;

/**
 * 地图默认配置
 */
const mapOptions: Object = {
    MAP_ID: `map_${randomString(-9)}`,
    STYLE: defalutStyle,
    CENTER: center,
    MAX_ZOOM: maxZoom,
    MIN_ZOOM: minZoom,
};

export { accessToken, mapOptions, minZoom, maxZoom, center, defalutStyle };
