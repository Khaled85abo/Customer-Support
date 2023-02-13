import { Request, Response } from "express";
import { ERRORS } from "../constants/errors";
import Product from "../models/product.model";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductsById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new Error(ERRORS.not_found);
  res.json(product);
};

export { getProducts, getProductsById };
