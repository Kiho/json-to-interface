let test = {
    data() {
        return {
            show: true,
            count: 0
        };
    },
    setup(ctor) {
        ctor.show = (x, store) => store.create(H2, x.refs.counter);
    },
    methods: {
        function1() {
            return 1;
        },
        function2() {
            return "2";
        },
        function3() {
            return { number: 3 };
        },
    }
};