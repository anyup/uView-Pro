export const apis = `
# deepClone 对象深度克隆

> 由于JS对象包括的范围非常广，加上ES6又有众多的新特性，很难、也没必要做到囊括所有的类型和情况，这里说的"对象"，指的是普通的对象，不包括修改对象原型链，
> 或者为"Function"，"Promise"等的情况，请留意。

<br>

场景：  

- 我们平时可能会遇到需要通过\`console.log\`打印一个对象，至执行打印的时刻，此对象为空，后面的逻辑中对此对象进行了修改赋值，但是我们在控制台直接看到的打印结果
却是修改后的值，这让人匪夷所思，虽然我们可以通过\`console.log(JSON.parse(JSON.stringify(object)))\`的形式处理，但是需要写这长长的一串，难免让人心生抵触。

- 当我们将一个对象(变量A)赋值给另一个变量(变量B)时，修改变量B，因为对象引用的特性，导致A也同时被修改，所以有时候我们需要将A克隆给B，这样修改B的时候，就不会
导致A也被修改。

### deepClone(object = {})

- \`object\` <Object\> 需要被克隆的对象

\`\`\`js
let a = {
	name: 'mary'
};

// 直接赋值，为对象引用，即修改b等于修改a，因为a和b为同一个值
let b = a;

b.name = 'juli';
console.log(b); // 结果为 {name: 'juli'}
console.log(a); // 结果为 {name: 'juli'}


// 深度克隆
let b = uni.$u.deepClone(a);

b.name = 'juli';
console.log(b); // 结果为 {name: 'juli'}
console.log(a); // 结果为 {name: 'mary'}
\`\`\`
`;
