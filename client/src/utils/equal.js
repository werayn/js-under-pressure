function equality (left, right) {
    if (left === right || Object(left) === Object(right)) {
        return true;
    }
    if (Array.isArray(left)) {
        if (!Array.isArray(right) || left.length !== right.length) {
            return false;
        }
        return left.every(function testArrayItemEquality (item, idx) {
            return equality(item, right[idx]);
        });
    }
    return false;
}

export { equality };
