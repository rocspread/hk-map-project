export function add(a: number, b: number): number {
    return a + b;
}

export function minus(a: number, b: number): number {
    return a - b;
}

/**
 * 生成随机数
 * @param num 返回随机值长度，默认 num?=>-8
 */
let randomString: (num: number) => string = function (num = -8) {
    return Math.random().toString(36).slice(num);
};

export { randomString };
