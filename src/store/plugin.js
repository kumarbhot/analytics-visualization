// tslint:disable-next-line:variable-name
export const Storex = {
    // tslint:disable-next-line:variable-name no-shadowed-variable
    install (Vue) {
        Vue.mixin({
            beforeCreate () {
                const options = this.$options;

                // Used by rootInstance as store is injected into it
                if (options.store$) {
                    this.store$ = options.store$;
                } else if (options.parent && options.parent.store$) {
                    this.store$ = this.$parent.store$;
                }
            }
        });
    }

};
