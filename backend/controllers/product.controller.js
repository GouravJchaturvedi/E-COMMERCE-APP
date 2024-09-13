import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.log("product controller error", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }
    //if not in redis then fetch from mongodb
    //.lean is used to return the plain JS object instead of MONGODB document which is good for performance
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured Products" });
    }
    //store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in product Controller");
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
      price,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      //Getting the id of the image from the cloudinary
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Deleted Image from cloudinary");
      } catch (error) {
        console.log("Error in deleting Image from Cloudinary", error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Product deletd successfully" });
  } catch (error) {
    console.log("Error in product Controller", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          price: 1,
          description: 1,
          name: 1,
          image: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.log("Error in product controller ", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory Controoler", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      //Updating DB Mongo
      const updatedProduct = product.save();
      //Updating Redis
      await updateFeaturedProductsCache();
      res.json(updatedProduct);
    } else {
      res
        .status(404)
        .json({ message: "No Product Found", error: error.message });
    }
  } catch (error) {
    console.log("toggleFeaturedProduct Controller Error ", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const feturedProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_produts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("error in update cache function");
  }
}
