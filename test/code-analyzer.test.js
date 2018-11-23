import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {assert.equal(JSON.stringify(parseCode('')), '[]');});
    it('test #1', () => {assert.equal(JSON.stringify(parseCode(test1(), null, 0)), result1());});
    it('test #2', () => {assert.equal(JSON.stringify(parseCode(test2(), null, 0)), result2());});
    it('test #3', () => {assert.equal(JSON.stringify(parseCode(test3(), null, 0)), result3());});
    it('test #4', () => {assert.equal(JSON.stringify(parseCode(test4(), null, 0)), result4());});
    it('test #5', () => {assert.equal(JSON.stringify(parseCode(test5(), null, 0)), result5());});
    it('test #6', () => {assert.equal(JSON.stringify(parseCode(test6(), null, 0)), result6());});
    it('test #7', () => {assert.equal(JSON.stringify(parseCode(test7(), null, 0)), result7());});
    it('test #8', () => {assert.equal(JSON.stringify(parseCode(test8(), null, 0)), result8());});
    it('test #9', () => {assert.equal(JSON.stringify(parseCode(test9(), null, 0)), result9());});
    it('test #10', () => {assert.equal(JSON.stringify(parseCode(test10(), null, 0)), result10());});
});

const test1 = () => {
    return 'function binarySearch(X, V, n){\n' +
        '    let low, high, mid;\n' +
        '    low = 0;\n' +
        '    high = n - 1;\n' +
        '    while (low <= high) {\n' +
        '        mid = (low + high)/2;\n' +
        '        if (X < V[mid])\n' +
        '            high = mid - 1;\n' +
        '        else if (X > V[mid])\n' +
        '            low = mid + 1;\n' +
        '        else\n' +
        '            return mid;\n' +
        '    }\n' +
        '    return -1;\n' +
        '}';
};

const result1 = () => {
    return '[{"Line":1,"Type":"function declaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"V","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"n","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"low","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"high","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"mid","Condition":"","Value":""},{"Line":3,"Type":"assignment expression","Name":"low","Condition":"","Value":"0"},{"Line":4,"Type":"assignment expression","Name":"high","Condition":"","Value":"n - 1"},{"Line":5,"Type":"while statement","Name":"","Condition":"low <= high","Value":""},{"Line":6,"Type":"assignment expression","Name":"mid","Condition":"","Value":"(low + high)/2"},{"Line":7,"Type":"if statement","Name":"","Condition":"X < V[mid]","Value":""},{"Line":8,"Type":"assignment expression","Name":"high","Condition":"","Value":"mid - 1"},{"Line":9,"Type":"else if statement","Name":"","Condition":"X > V[mid]","Value":""},{"Line":10,"Type":"assignment expression","Name":"low","Condition":"","Value":"mid + 1"},{"Line":12,"Type":"return statement","Name":"","Condition":"","Value":"mid"},{"Line":14,"Type":"return statement","Name":"","Condition":"","Value":"-1"}]';
};

const test2 = () => {
    return 'function asd (x,n){\n' +
        'if (x > 1){n++;}\n' +
        'else if (x < 1){n++;}\n' +
        'else {n--;}\n' +
        'let a = 0, b = 1 - (5 * 30)\n' +
        'a++, b = 0;\n' +
        'for (let i = 0; i < n; i++){\n' +
        'n++;\n' +
        '}\n' +
        'while (x > 0){\n' +
        'x--;\n' +
        '}\n' +
        '}';
};

const result2 = () => {
    return '[{"Line":1,"Type":"function declaration","Name":"asd","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"x","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"n","Condition":"","Value":""},{"Line":2,"Type":"if statement","Name":"","Condition":"x > 1","Value":""},{"Line":2,"Type":"update expression","Name":"n","Condition":"","Value":"n + 1"},{"Line":3,"Type":"else if statement","Name":"","Condition":"x < 1","Value":""},{"Line":3,"Type":"update expression","Name":"n","Condition":"","Value":"n + 1"},{"Line":4,"Type":"update expression","Name":"n","Condition":"","Value":"n - 1"},{"Line":5,"Type":"variable declaration","Name":"a","Condition":"","Value":"0"},{"Line":5,"Type":"variable declaration","Name":"b","Condition":"","Value":"1 - (5 * 30)"},{"Line":6,"Type":"update expression","Name":"a","Condition":"","Value":"a + 1"},{"Line":6,"Type":"assignment expression","Name":"b","Condition":"","Value":"0"},{"Line":7,"Type":"for statement","Name":"","Condition":"i < n","Value":""},{"Line":7,"Type":"variable declaration","Name":"i","Condition":"","Value":"0"},{"Line":7,"Type":"update expression","Name":"i","Condition":"","Value":"i + 1"},{"Line":8,"Type":"update expression","Name":"n","Condition":"","Value":"n + 1"},{"Line":10,"Type":"while statement","Name":"","Condition":"x > 0","Value":""},{"Line":11,"Type":"update expression","Name":"x","Condition":"","Value":"x - 1"}]';
};

const test3 = () => {
    return 'for (;;){}\n' +
        'a--;';
};

const result3 = () => {
    return '[{"Line":1,"Type":"for statement","Name":"","Condition":"","Value":""},{"Line":2,"Type":"update expression","Name":"a","Condition":"","Value":"a - 1"}]';
};

const test4 = () => {
    return 'if (x < 3){}';
};

const result4 = () => {
    return '[{"Line":1,"Type":"if statement","Name":"","Condition":"x < 3","Value":""}]';
};

const test5 = () => {
    return 'let a = 0, b;';
};

const result5 = () => {
    return '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":"0"},{"Line":1,"Type":"variable declaration","Name":"b","Condition":"","Value":""}]';
};

const test6 = () => {
    return 'if (x < 1){}\n' +
        'else {}';
};

const result6 = () => {
    return '[{"Line":1,"Type":"if statement","Name":"","Condition":"x < 1","Value":""}]';
};

const test7 = () => {
    return 'function asd () {}';
};

const result7 = () => {
    return '[{"Line":1,"Type":"function declaration","Name":"asd","Condition":"","Value":""}]';
};

const test8 = () => {
    return 'if (y == 2)  {}\n' +
        'else if (y > 2) {}';
};

const result8 = () => {
    return '[{"Line":1,"Type":"if statement","Name":"","Condition":"y == 2","Value":""},{"Line":2,"Type":"else if statement","Name":"","Condition":"y > 2","Value":""}]';
};

const test9 = () => {
    return 'let a = (5 * 2) - (10 / 3)';
};

const result9 = () => {
    return '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":"(5 * 2) - (10 / 3)"}]';
};

const test10 = () => {
    return 'while (x < 1){\n' +
        'a = a + 5;\n' +
        'x--;\n' +
        '}';
};

const result10 = () => {
    return '[{"Line":1,"Type":"while statement","Name":"","Condition":"x < 1","Value":""},{"Line":2,"Type":"assignment expression","Name":"a","Condition":"","Value":"a + 5"},{"Line":3,"Type":"update expression","Name":"x","Condition":"","Value":"x - 1"}]';
};
