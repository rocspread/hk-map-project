import { ILngLat, IPoint, ISource, ILngLatBounds } from 'Src/types/mapCore';
import mapboxgl, { Layer, Map } from 'mapbox-gl';
import * as _ from 'lodash';
import { accessToken, defalutStyle } from '../js/mapConfig';

interface ILayer {
    id: string;
    source: string;
    value: Layer;
}

interface IOptions {
    [key: string]: any;
}

interface ILayerList {
    [key: string]: ILayer;
}

interface ISourceList {
    [id: string]: ISource;
}

/**
 * TODO 地图挂载事件待封装
 */
export class map {
    /**
     * `地图挂载对象`
     */
    _map: any;
    /**
     * `_source挂载所有加载到map上的 `source`，以异步的方式显示到`map`的sourcelist`
     */
    _sources: ISourceList;

    /**
     * `_layers` 存储所有添加到map上的 `layer`
     */
    _layers: ILayerList;

    constructor(config = defalutStyle) {
        mapboxgl.accessToken = accessToken;
        this._sources = {};
        this._layers = {};
        this._map = new Map(this.setupOptions(config));
    }
    /**
     * @description 地图初始化参数获取
     * @param options 地图初始化配置，后期可以改为后端接口获取，可以加额外参数传入map
     */
    setupOptions(options: IOptions) {
        const { STYLE, MAP_ID, CENTER, MAX_ZOOM, MIN_ZOOM } = options;
        return {
            container: MAP_ID,
            style: STYLE,
            center: CENTER,
            maxZoom: MAX_ZOOM,
            minZoom: MIN_ZOOM,
        };
    }
    /**
     * @description 获取地图范围
     */
    getBounds(): ILngLatBounds {
        return this._map.getBounds();
    }
    /**
     * @description 设置最小层级
     * @param minZoom 最小层级
     */
    setMinZoom(minZoom: number) {
        return this._map.setMinZoom(minZoom);
    }
    /**
     * @description 获取地图缩放设定的最小层级
     */
    getMinZoom() {
        return this._map.getMinZoom();
    }
    /**
     * @description 设置地图缩放的最大层级
     * @param maxZoom 最大值
     */
    setMaxZoom(maxZoom: number) {
        return this._map.setMaxZoom(maxZoom);
    }
    /**
     * @description 获取最大层级
     */
    getMaxZoom() {
        return this._map.getMaxZoom();
    }
    /**
     *
     * @param id source唯一值
     * @param source 数据源
     */
    addSource(id: string, source: any) {
        const _source: ISource = {
            id,
            layers: [],
            value: source,
            added: false,
        };
        _.assign(this._sources, { [id]: _source });
        return this;
    }
    /**
     * 根据id删除source
     * @param id `sourceId`
     */
    removeSource(id: string) {
        _.unset(this._sources, id);
        this._map.removeSource(id);
    }
    getSource(id: string) {
        return _.get(_.get(this._sources, id), 'value');
    }
    /**
     *添加图层
     * @param layer 被添加图层对象
     * @param beforeId 添加到某个图层之前，相当于setIndex
     */
    addLayer(layer: Layer, beforeId: string) {
        const layerId: string = layer.id;
        const sourceId: string = layer.source as string;
        //构建图层对象
        const _layer = {
            id: layerId,
            sources: sourceId,
            value: layer,
        };

        if (!_.has(this._sources, sourceId)) {
            //TODO 缺少内部友好报错体系,需要构建错误字典表
            console.log('Please add source first');
            return this;
        }
        _.assign(this._layers, { [layerId]: _layer });
        const sourceItem = _.get(this._sources, sourceId);
        const { layers, added, value: source } = sourceItem;

        //如果source不存在，第一次添加到map上
        if (!added) {
            this._map.addSource(sourceId, source);
            _.assign(sourceItem, { added: true });
        }
        _.assign(sourceItem, { layers: layers.push(layerId) });
        this._map.addLayer(layer, beforeId);

        return this;
    }
    /**
     * 移动图层层级
     * @param id layerId
     * @param beforeId 移动到某个图层上方的图层id
     */
    moveLayer(id: string, beforeId: string) {
        return this._map.moveLayer(id, beforeId);
    }
    /**
     * 根据id获取图层
     * @param id layerId
     */
    getLayer(id: string) {
        return _.get(_.get(this._layers, id), 'value');
    }
    /**
     * @description 获取地图容器
     */
    getContainer() {
        return this._map.getContainer();
    }
    /**
     * @description 获取地图canvas DOM
     */
    getCanvasContainer() {
        return this._map.getCanvasContainer();
    }
    /**
     * @description 获取整个canvas
     */
    getCanvas() {
        return this._map.getCanvas();
    }
    /**
     * @description 删除地图
     */
    remove() {
        return this._map.remove();
    }
    /**
     * @description 获取中心点
     */
    getCenter() {
        return this._map.getCenter();
    }
    /**
     * 设置中心点
     * @param center 中心点
     */
    setCenter(center: IPoint) {
        return this._map.setCenter(center);
    }
    /**
     * @description 根据经纬度移动地图
     * @param lnglat 经纬度
     */
    panTo(lnglat: ILngLat) {
        return this._map.panTo(lnglat);
    }
    /**
     * @description 获取地图当前层级
     */
    getZoom() {
        return this._map.getZoom();
    }
    /**
     * 设置地图层级
     * @param zoom 层级
     */
    setZoom(zoom: number) {
        return this._map.setZoom(zoom);
    }
    /**
     * 缩放地图
     * @param zoom 层级
     */
    zoomTo(zoom: number) {
        return this._map.zoomTo(zoom);
    }
    /**
     * @description zoomIn
     */
    zoomIn() {
        return this._map.zoomIn();
    }
    /**
     * @description zoomOut
     */
    zoomOut() {
        return this._map.zoomOut();
    }
    /**
     * @description getPitch
     */
    getPitch() {
        return this._map.getPitch();
    }
    /**
     * setPitch
     * @param pitch 倾斜角
     */
    setPitch(pitch: number) {
        return this._map.setPitch(pitch);
    }
    /**
     * @description fitBounds
     * @param bounds 范围
     */
    fitBounds(bounds: ILngLatBounds) {
        return this._map.fitBounds(bounds);
    }
}
