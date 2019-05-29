class A {
    public test() {
        console.log('test');
    }
}

let a = new A();
let stra = JSON.stringify(a);
console.log(a);
console.log(JSON.parse(stra));
