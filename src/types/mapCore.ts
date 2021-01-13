export interface ILngLat {
    lng: Number;
    lat: Number;
}

export interface ILngLatBounds {
    _ne: ILngLat;
    _sw: ILngLat;
}

export interface IPoint {
    x: number;
    y: number;
}

export interface ISource {
    id: string;
    layers: string[];
    value: any;
    added: boolean;
}

export type PointLike = [number, number];

export interface IListerners {
    [key: string]: IListerner[];
}

export interface IListerner {
    (event: Event): void;
}

export type SupportEnterEvents = 'click' | 'dbclick' | 'mouseup' | 'contextmenu';

export type SupportMoveEvents = 'mouseenter' | 'mouseover' | 'mousemove' | 'mouseout';

export type SupportDragEvents = 'dragstart' | 'drag' | 'dragend';

export type EventType = SupportEnterEvents | SupportMoveEvents | SupportDragEvents;
