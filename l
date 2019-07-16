[1mdiff --git a/client/src/sandbox/index.js b/client/src/sandbox/index.js[m
[1mindex 0b70bce..f33ad50 100644[m
[1m--- a/client/src/sandbox/index.js[m
[1m+++ b/client/src/sandbox/index.js[m
[36m@@ -1,5 +1,6 @@[m
 import WebWorker from './webWorker';[m
 import customWorker from './myWorker';[m
[32m+[m[32mimport { equal } from '../utils/equal.js';[m
 [m
 class sandBox {[m
     constructor() {[m
[36m@@ -14,6 +15,40 @@[m [mclass sandBox {[m
         this.worker.terminate();[m
     }[m
 [m
[32m+[m[32m    execTests(code, tests, name) {[m
[32m+[m[32m        const tested = {[m
[32m+[m[32m            ret: null,[m
[32m+[m[32m            expected: null,[m
[32m+[m[32m            compare: null,[m
[32m+[m[32m        };[m
[32m+[m[32m        this.levels[this.level].tests.map(test => {[m
[32m+[m[32m            this.createWorker();[m
[32m+[m[32m            this.PostMessage(code, name, test.arguments);[m
[32m+[m[32m            this.sandbox.worker.addEventListener('message', (e) => {[m
[32m+[m[32m                if (equal(test.expectedResult === e.data.result)) {[m
[32m+[m[32m                    tested.ret = e.data.result;[m
[32m+[m[32m                    tested.expected = test.expectedResult;[m
[32m+[m[32m                    tested.compare = true;[m
[32m+[m[32m                    this.sandbox.stopWorker();[m
[32m+[m[32m                    if (this.sandBox) {[m
[32m+[m[32m                        try {[m
[32m+[m[32m                            addLine(toJS(tested.res), false);[m
[32m+[m[32m                        }[m
[32m+[m[32m                        catch (e) {[m
[32m+[m[32m                            console.log(e.error);[m
[32m+[m[32m                            return <Error err={ tested.err } />;[m
[32m+[m[32m                        }[m
[32m+[m[32m                    }[m
[32m+[m[32m                    this.props.store.addlineError(tested, true);[m
[32m+[m[32m                }[m
[32m+[m[32m                else {[m
[32m+[m[32m                    this.sandbox.stopWorker();[m
[32m+[m[32m                    this.props.store.addlineError(tested, false);[m
[32m+[m[32m                }[m
[32m+[m[32m            });[m
[32m+[m[32m        });[m
[32m+[m[32m    }[m
[32m+[m
     PostMessage(value, name, arg) {[m
         this.worker.postMessage({[m
             code: value,[m
[36m@@ -24,4 +59,5 @@[m [mclass sandBox {[m
 [m
 }[m
 [m
[32m+[m
 export { sandBox };[m
[1mdiff --git a/client/src/store/index.js b/client/src/store/index.js[m
[1mindex 939c2c7..e482ce2 100644[m
[1m--- a/client/src/store/index.js[m
[1m+++ b/client/src/store/index.js[m
[36m@@ -4,7 +4,6 @@[m [mimport { observable,[m
     toJS,[m
     observe,[m
 } from 'mobx';[m
[31m-import { equal } from '../utils/equal.js';[m
 [m
 [m
 class AppStore {[m
[36m@@ -14,7 +13,6 @@[m [mclass AppStore {[m
     @observable level = 0;[m
     @observable code = '';[m
     @observable save = [];[m
[31m-    @observable match = false;[m
     @observable log = [];[m
 [m
     constructor(api, sand) {[m
[36m@@ -36,7 +34,6 @@[m [mclass AppStore {[m
         observe(this.log, (change) => {[m
             const textLog = document.getElementById('textlog');[m
             textLog.scrollTop = textLog.scrollHeight;[m
[31m-            console.log('aeazeazezzaee');[m
         });[m
     }[m
 [m
[36m@@ -50,30 +47,9 @@[m [mclass AppStore {[m
     }[m
 [m
     @action.bound[m
[31m-    async handleTestCode() {[m
[32m+[m[32m    handleTestCode() {[m
         if (this.parser.length === 0) {[m
[31m-            console.log('exec code');[m
[31m-            const toto = await this.levels[this.level].tests.map( test => {[m
[31m-                this.sandbox.createWorker();[m
[31m-                this.sandbox.PostMessage(toJS(this.code), toJS(this.levels[this.level].name), toJS(test.arguments));[m
[31m-                this.sandbox.worker.addEventListener('message', (e) => {[m
[31m-                    if (equal(test.expectedResult === e.data.result)) {[m
[31m-                        console.log('nice');[m
[31m-                        this.sandbox.stopWorker();[m
[31m-                        this.match = true;[m
[31m-                        //send to logger nice[m
[31m-                    }[m
[31m-                    else {[m
[31m-                        //send to logger bad[m
[31m-                        this.match = false;[m
[31m-                        console.log('bad result');[m
[31m-                        //  this.sandbox.stopWorker();[m
[31m-                    }[m
[31m-                    //     this.props.store.skipLevel();[m
[31m-                });[m
[31m-[m
[31m-            });[m
[31m-            console.log(this.match);[m
[32m+[m[32m            this.sandbox.execTests(toJS(this.code), toJS(this.levels[this.level].name), this.levels[this.level].tests);[m
             if (this.match) {[m
                 console.log('next level');[m
                 this.save.push(this.code);[m
[36m@@ -135,6 +111,11 @@[m [mclass AppStore {[m
         this.log = [];[m
     }[m
 [m
[32m+[m[32m    @action.bound[m
[32m+[m[32m    addLineError(tested, style) {[m
[32m+[m[32m        this.addLine(tested.ret, tested.expected, style);[m
[32m+[m
[32m+[m[32m    }[m
 }[m
 [m
 export { AppStore };[m
[1mdiff --git a/client/src/utils/request.js b/client/src/utils/request.js[m
[1mindex 60a01e3..7796a6c 100644[m
[1m--- a/client/src/utils/request.js[m
[1m+++ b/client/src/utils/request.js[m
[36m@@ -58,6 +58,7 @@[m [maxios.interceptors.response.use([m
     (response) => {[m
         if (isDev()) {[m
             try {[m
[32m+[m[32m                console.log(response);[m
                 console.log(response, 'response');[m
                 const requestDuration = Number(Date.now() - response.config.ts);[m
                 console.log('%c ' + response.status + ' - '[m
[1mdiff --git a/server/src/database/level.json b/server/src/database/level.json[m
[1mindex 738e3e7..77db6b8 100644[m
[1m--- a/server/src/database/level.json[m
[1m+++ b/server/src/database/level.json[m
[36m@@ -1,85 +1,85 @@[m
 [[m
     {[m
[31m-        "name": "square",[m
[31m-        "description": "return x squared",[m
[31m-        "tests" : [[m
[31m-            { "arguments" :  2,   "expectedResult" : 4    },[m
[31m-            { "arguments" :  4,   "expectedResult" : 16   },[m
[31m-            { "arguments" :  1.5, "expectedResult" : 2.25 },[m
[31m-            { "arguments" : -12,  "expectedResult" : 144  },[m
[31m-            { "arguments" : -1.5, "expectedResult" : 2.25 }[m
[31m-        ][m
[32m+[m[32m        'name': 'square',[m
[32m+[m[32m        'description': 'return x squared',[m
[32m+[m[32m        'tests' : [[m
[32m+[m[32m            { 'arguments' :  2,   'expectedResult' : 4    },[m
[32m+[m[32m            { 'arguments' :  4,   'expectedResult' : 16   },[m
[32m+[m[32m            { 'arguments' :  1.5, 'expectedResult' : 2.25 },[m
[32m+[m[32m            { 'arguments' : -12,  'expectedResult' : 144  },[m
[32m+[m[32m            { 'arguments' : -1.5, 'expectedResult' : 2.25 },[m
[32m+[m[32m        ],[m
     },[m
     {[m
[31m-        "name": "invertCase",[m
[31m-        "description": "x is a string. turn lowercase letters to uppercase and vice versa.",[m
[31m-        "tests" : [[m
[31m-            { "arguments" : "funkey monkey", "expectedResult" : "FUNKEY MONKEY" },[m
[31m-            { "arguments" : "MONKEY MAGIC",  "expectedResult" : "monkey magic" },[m
[31m-            { "arguments" : "FlIrPyDuck",    "expectedResult" : "fLiRpYdUCK" },[m
[31m-            { "arguments" : ",", "expectedResult" : "," }[m
[31m-        ][m
[32m+[m[32m        'name': 'invertCase',[m
[32m+[m[32m        'description': 'x is a string. turn lowercase letters to uppercase and vice versa.',[m
[32m+[m[32m        'tests' : [[m
[32m+[m[32m            { 'arguments' : 'funkey monkey', 'expectedResult' : 'FUNKEY MONKEY' },[m
[32m+[m[32m            { 'arguments' : 'MONKEY MAGIC',  'expectedResult' : 'monkey magic' },[m
[32m+[m[32m            { 'arguments' : 'FlIrPyDuck',    'expectedResult' : 'fLiRpYdUCK' },[m
[32m+[m[32m            { 'arguments' : ',', 'expectedResult' : ',' },[m
[32m+[m[32m        ],[m
     },[m
     {[m
[31m-        "name": "sumDigits",[m
[31m-        "description": "sum the digits of the number x",[m
[31m-        "tests" : [[m
[31m-            { "arguments" : 2,     "expectedResult" : 2  },[m
[31m-            { "arguments" : 412,   "expectedResult" : 7  },[m
[31m-            { "arguments" : 8.19,  "expectedResult" : 18 },[m
[31m-            { "arguments" : 4.12,  "expectedResult" : 7  },[m
[31m-            { "arguments" : 0,     "expectedResult" : 0  },[m
[31m-            { "arguments" : -14,   "expectedResult" : 5  },[m
[31m-            { "arguments" : -1.4,  "expectedResult" : 5  }[m
[31m-        ][m
[32m+[m[32m        'name': 'sumDigits',[m
[32m+[m[32m        'description': 'sum the digits of the number x',[m
[32m+[m[32m        'tests' : [[m
[32m+[m[32m            { 'arguments' : 2,     'expectedResult' : 2  },[m
[32m+[m[32m            { 'arguments' : 412,   'expectedResult' : 7  },[m
[32m+[m[32m            { 'arguments' : 8.19,  'expectedResult' : 18 },[m
[32m+[m[32m            { 'arguments' : 4.12,  'expectedResult' : 7  },[m
[32m+[m[32m            { 'arguments' : 0,     'expectedResult' : 0  },[m
[32m+[m[32m            { 'arguments' : -14,   'expectedResult' : 5  },[m
[32m+[m[32m            { 'arguments' : -1.4,  'expectedResult' : 5  },[m
[32m+[m[32m        ],[m
     },[m
     {[m
[31m-        "name": "flatten",[m
[31m-        "description": "x is an arbitrarily nested, multidimensional array. return x flattened (all items in 1 dimension)",[m
[31m-        "tests" : [[m
[31m-            { "arguments" : [], "expectedResult" : [] },[m
[31m-            { "arguments" : [0, 1, 2], "expectedResult" : [0, 1, 2] },[m
[31m-            { "arguments" : [[], 0, [1]], "expectedResult" : [0, 1] },[m
[32m+[m[32m        'name': 'flatten',[m
[32m+[m[32m        'description': 'x is an arbitrarily nested, multidimensional array. return x flattened (all items in 1 dimension)',[m
[32m+[m[32m        'tests' : [[m
[32m+[m[32m            { 'arguments' : [], 'expectedResult' : [] },[m
[32m+[m[32m            { 'arguments' : [0, 1, 2], 'expectedResult' : [0, 1, 2] },[m
[32m+[m[32m            { 'arguments' : [[], 0, [1]], 'expectedResult' : [0, 1] },[m
             {[m
[31m-                "arguments"  : [0, [[[[[1, [2]]]]], 3], [4, [5]]],[m
[31m-                "expectedResult" : [0, 1, 2, 3, 4, 5][m
[31m-            }[m
[31m-        ][m
[32m+[m[32m                'arguments'  : [0, [[[[[1, [2]]]]], 3], [4, [5]]],[m
[32m+[m[32m                'expectedResult' : [0, 1, 2, 3, 4, 5],[m
[32m+[m[32m            },[m
[32m+[m[32m        ],[m
     },[m
     {[m
[31m-        "name": "isBalanced",[m
[31m-        "description": "x is a string. return whether its parentheses are balanced that is, whether every opening ( has a closing )",[m
[31m-        "tests" : [[m
[31m-            { "arguments" : ",", "expectedResult" : true },[m
[31m-            { "arguments" : "(", "expectedResult" : false },[m
[31m-            { "arguments" : "()", "expectedResult" : true },[m
[31m-            { "arguments" : "(1)", "expectedResult" : true },[m
[31m-            { "arguments" : ")(", "expectedResult" : false },[m
[31m-            { "arguments" : "())(()", "expectedResult" : false },[m
[31m-            { "arguments" : "((a()b)c(l(pnq))())", "expectedResult" : true },[m
[31m-            { "arguments" : "((a()b)c(l(pnq))()", "expectedResult" : false }[m
[31m-        ][m
[32m+[m[32m        'name': 'isBalanced',[m
[32m+[m[32m        'description': 'x is a string. return whether its parentheses are balanced that is, whether every opening ( has a closing )',[m
[32m+[m[32m        'tests' : [[m
[32m+[m[32m            { 'arguments' : ',', 'expectedResult' : true },[m
[32m+[m[32m            { 'arguments' : '(', 'expectedResult' : false },[m
[32m+[m[32m            { 'arguments' : '()', 'expectedResult' : true },[m
[32m+[m[32m            { 'arguments' : '(1)', 'expectedResult' : true },[m
[32m+[m[32m            { 'arguments' : ')(', 'expectedResult' : false },[m
[32m+[m[32m            { 'arguments' : '())(()', 'expectedResult' : false },[m
[32m+[m[32m            { 'arguments' : '((a()b)c(l(pnq))())', 'expectedResult' : true },[m
[32m+[m[32m            { 'arguments' : '((a()b)c(l(pnq))()', 'expectedResult' : false },[m
[32m+[m[32m        ],[m
     },[m
     {[m
[31m-        "name": "hasBalancePoint",[m
[31m-        "description": "x is an array of numbers. return whether there is an index where the sum before (excluding) it is equal to the sum after (including) it.",[m
[31m-        "tests" : [[m
[31m-            { "arguments" : [],  "expectedResult" : true },[m
[31m-            { "arguments" : [0], "expectedResult" : true },[m
[31m-            { "arguments" : [42, 6, 19, 11, 11, 7], "expectedResult" : true },[m
[31m-            { "arguments" : [1, 2], "expectedResult" : false }[m
[31m-        ][m
[32m+[m[32m        'name': 'hasBalancePoint',[m
[32m+[m[32m        'description': 'x is an array of numbers. return whether there is an index where the sum before (excluding) it is equal to the sum after (including) it.',[m
[32m+[m[32m        'tests' : [[m
[32m+[m[32m            { 'arguments' : [],  'expectedResult' : true },[m
[32m+[m[32m            { 'arguments' : [0], 'expectedResult' : true },[m
[32m+[m[32m            { 'arguments' : [42, 6, 19, 11, 11, 7], 'expectedResult' : true },[m
[32m+[m[32m            { 'arguments' : [1, 2], 'expectedResult' : false },[m
[32m+[m[32m        ],[m
     },[m
     {[m
[31m-        "name": "mode",[m
[31m-        "description": "x is an array of at least 1 item. return the most frequent item (there won\"t be collisions)",[m
[31m-        "tests" : [[m
[31m-            { "arguments" : [0], "expectedResult" : 0 },[m
[31m-            { "arguments" : [0, 1, 1, 2], "expectedResult" : 1 },[m
[32m+[m[32m        'name': 'mode',[m
[32m+[m[32m        'description': 'x is an array of at least 1 item. return the most frequent item (there won"t be collisions)',[m
[32m+[m[32m        'tests' : [[m
[32m+[m[32m            { 'arguments' : [0], 'expectedResult' : 0 },[m
[32m+[m[32m            { 'arguments' : [0, 1, 1, 2], 'expectedResult' : 1 },[m
             {[m
[31m-                "arguments"  : [{}, 0, [1], "foo", true, false, null, true],[m
[31m-                "expectedResult" : true[m
[31m-            }[m
[31m-        ][m
[31m-    }[m
[31m-][m
[32m+[m[32m                'arguments'  : [{}, 0, [1], 'foo', true, false, null, true],[m
[32m+[m[32m                'expectedResult' : true,[m
[32m+[m[32m            },[m
[32m+[m[32m        ],[m
[32m+[m[32m    },[m
[32m+[m[32m];[m
