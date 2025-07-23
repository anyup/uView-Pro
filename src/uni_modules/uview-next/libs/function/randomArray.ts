/**
 * 打乱数组顺序
 * @param array 需要打乱的数组
 * @returns 打乱后的新数组
 */
function randomArray<T>(array: T[] = []): T[] {
    // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.5大于或者小于0
    return array.sort(() => Math.random() - 0.5);
}

export default randomArray;
