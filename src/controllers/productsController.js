const dynamoDB = require('../config/awsConfig');
const { v4: uuidv4 } = require('uuid');

exports.createProduct = (req, res) => {
    const productId = uuidv4();
    const {  name, price, description } = req.body;
    const params = {
      TableName: 'Products',
      Item: {
        productId,
        name,
        price,
        description,
      },
    };
  
    dynamoDB.put(params, (error, result) => {
      if (error) {
        console.error('Error al crear el producto: ', error);
        res.status(400).send(error);
      } else {
        res.status(201).send({ message: 'Producto creado', productId });
      }
    });
  };
  
  exports.getAllProducts = (req, res) => {
    const params = {
      TableName: 'Products',
    };
  
    dynamoDB.scan(params, (error, result) => {
      if (error) {
        console.error('Error al obtener los productos: ', error);
        res.status(400).send(error);
      } else {
        res.status(200).send(result.Items);
      }
    });
  };
  
  exports.getProductById = (req, res) => {
    const { productId } = req.params;
    const params = {
      TableName: 'Products',
      Key: {
        productId,
      },
    };
  
    dynamoDB.get(params, (error, result) => {
      if (error) {
        console.error('Error al obtener el producto: ', error);
        res.status(400).send(error);
      } else {
        res.status(200).send(result.Item);
      }
    });
  };
  

  exports.updateProduct = (req, res) => {
    const { productId } = req.params;
    const { name, price } = req.body;
  
    const params = {
      TableName: 'Products',
      Key: {
        productId,
      },
      UpdateExpression: 'set name = :n, price = :p',
      ExpressionAttributeValues: {
        ':n': name,
        ':p': price,
      },
      ReturnValues: 'UPDATED_NEW',
    };
  
    dynamoDB.update(params, (error, result) => {
      if (error) {
        console.error('Error al actualizar el producto: ', error);
        res.status(400).send(error);
      } else {
        res.status(200).send({ message: 'Producto actualizado', productId });
      }
    });
  };
  

  exports.deleteProduct = (req, res) => {
    const { productId } = req.params;
    const params = {
      TableName: 'Products',
      Key: {
        productId,
      },
    };
  
    dynamoDB.delete(params, (error, result) => {
      if (error) {
        console.error('Error al eliminar el producto: ', error);
        res.status(400).send(error);
      } else {
        res.status(200).send({ message: 'Producto eliminado', productId });
      }
    });
  };
  
