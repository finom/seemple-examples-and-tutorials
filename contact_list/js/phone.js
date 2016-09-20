class Phone extends Matreshka.Object {
    constructor(data, parent) {
        super(data)
            .set('visible', true)
            .on({
                'click::(.remove)': () => parent.pull(this),
                render: () => {
                    const fields = this.$('[data-key]');

                    for (const field of fields) {
                        this.bindNode(field.dataset.key, field, Matreshka.binders.text());
                    }

                    this.bindNode('visible', ':sandbox', Matreshka.binders.display());
                }
            });
    }
}
