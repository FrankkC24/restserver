const { response, request } = require('express');

const getUser = ( req = request, res = response ) => {

    const { nombre, tst } = req.query;

    res.json({
        ok: true,
        msg: 'get API - controller ',
        nombre,
        tst,
    });
};

const postUser = ( req = request, res = response ) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad,
    });
};

const putUser = ( req= request, res = response ) => {
    const { id } = req.params;

    res.status(200).json({
        ok: true,
        msg: 'put API - controller',
        id,
    });
};

const deleteUser = ( req = request, res = response ) => {
    res.json({
        ok: true,
        msg: 'delete API - controller',
    });
};

module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
};