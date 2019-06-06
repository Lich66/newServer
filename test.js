class A {
    constructor() {
        // this.b = ()=>{
        //     console.log('c')
        // };
    }
    b() {
        console.log('b')
    }
    bc() {
        console.log('bc')
    }
}

const a = new A();
// a.a()
// a['a']();
// a.b();
a['b'+'c']();