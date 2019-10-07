const add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += req.body.price;
    cart.countGoods++;

    return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    if(req.body.quantity === -1){
        cart.amount -= find.price;
    } else {
        cart.amount += find.price;
    }

    cart.countGoods += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

const remove = (cart, req) => {
    if(req.body.quantity === 0) {
        cart.contents.length = 0;
        cart.amount = 0;
        cart.countGoods = 0;
    } else {
        const find = cart.contents.find(el => el.id_product === +req.params.id);
        cart.contents.splice(cart.contents.indexOf(find), 1);
        cart.amount -= find.price;
        cart.countGoods--;
    }

    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove,
};