class Phone extends Seemple.Object {
    constructor(data, parent) {
        super(data);
        this.set('visible', true)
            .on({
                'click::(.remove)': () => parent.pull(this),
                render: () => {
                    const fields = this.$('[data-key]');

                    for (let field of fields) { // eslint-disable-line prefer-const
                        this.bindNode(field.dataset.key, field, Seemple.binders.text());
                    }

                    this.bindNode('visible', ':sandbox', Seemple.binders.display());
                }
            });
    }
}
