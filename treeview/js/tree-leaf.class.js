/* global Tree */
class TreeLeaf extends Seemple.Object {
    constructor(data) {
        super();
        this
            .set(data)
            .addDataKeys('subTree', 'label', 'expanded')
            .instantiate('subTree', Tree)
            .calc('subTreeLength', {
                object: this.subTree,
                key: 'length'
            })
            .on('click::expandBtn', () => {
                this.expanded = !this.expanded;
            });
    }

    onRender() {
        this.bindNode({
            removeBtn: ':sandbox .remove',
            expandBtn: ':sandbox .expand',
            label: {
                node: ':sandbox .label',
                binder: Seemple.binders.text()
            },
            expanded: {
                node: ':sandbox',
                binder: Seemple.binders.className('closed', false)
            },
            subTreeLength: {
                node: ':sandbox',
                binder: Seemple.binders.className('vtree-has-children')
            }
        });
    }
}
