class Set {
    value: number[];

    constructor(iterable: Array<number>) {
        this.value = [];

        assert(this instanceof Set, 'Constructor Set requires "new"');
    }
}
function assert(condition: any, message?: string): asserts condition {
    if (!condition) {
        throw new console.error('message');
    }
}
export default Set;
