/* globals data */
class User extends Seemple.Object {
    constructor(data) {
        super(data);
        this.on('render', () => {
            this.bindNode({
                name: ':sandbox .name',
                email: ':sandbox .email',
                phone: ':sandbox .phone'
            }, Seemple.binders.html());
        });
    }
}


class Users extends Seemple.Array {
    get Model() {
        return User;
    }
    get itemRenderer() {
        return '#user_template';
    }
    constructor(data) {
        super(...data);
        this.bindNode('sandbox', '.users')
            .bindNode('container', ':sandbox tbody')
            .rerender();
    }
}

const users = new Users(data); // eslint-disable-line no-unused-vars
