import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";  
import dotenv from "dotenv";
dotenv.config();

//create a gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    //hum photo or baaki ka data alag alag lege or phr dono ko merge kr dege to enhance performance
    //populate:- retrieve the details of the referenced Category document for each product document.
    const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      total_count: products.length,
      success: true,
      message: "All Products",
      products
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      err
    })
  }
}

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      err
    })
  }
}

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo")
    if (product.photo.data) {
      // "Content-type" header to the product.photo.contentType, 
      // which specifies the content type of the photo (e.g., "image/jpeg", "image/png", etc.).
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data)
    }
    else {
      // Handle case when photo is not found
      res.status(404).send("Photo not found");
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      err
    })
  }
}

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully"
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      err
    })
  }
}

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(req.params.id, {
      ...req.fields, slug: slugify(name)
    }, { new: true })
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      err
    })
  }
}

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {}//object created
    if (checked.length > 0)
      args.category = checked;
    if (radio.length)
      args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Error while filtering products",
      error
    })
  }
}

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Error in product count",
      err
    })
  }
}

export const productListController = async (req, res) => {
  try {
    const perPage = 6
    const page = req.params.page ? req.params.page : 1//we are dynamically accessing page
    //perPage represents the number of products to be displayed per page, and page represents the current page number. 
    //The page value is obtained from the req.params.page
    const products = await productModel.find({})
    .select("-photo")
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ createdAt: -1 });
    res.status(200).send({
      success:true,
      products
    })
  } catch (err) {
    res.status(500).send({
      success: true,
      message: "Error while getting product",
      err
    })
  }
}

export const searchProductController=async(req,res)=>{
  try{
    const keyword=req.params.keyword
    const results=await productModel.find({$or:[
      {name:{$regex:keyword,$options:"i"}},
      {description:{$regex:keyword,$options:"i"}}
    ]}).select("-photo")
    res.json(results);
  }catch(err){
    console.log(err)
    res.status(500).send({
      success:false,
      message:"Error in searching product",
      err
    })
  }
}

export const relatedProductController=async(req,res)=>{
  try{
    const {pid,cid}=req.params;
    const products=await productModel.find({
      category:cid,_id:{$ne:pid}//id include nahi ki hai kyuki hum nahi chahte ki similar products me woh product aaye
    }).select("-photo").limit(3).populate("category")
    res.status(200).send({
      success:true,
      products
    })
  }catch(err){
    console.log(err)
    res.status(500).send({
      success:false,
      message:"Error while getting related product",
      err
    })
  }
}


export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

export const braintreeTokenController=async(req,res)=>{
  try{
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).send(err);
      }else{
        res.send(response);//server is responding with the client token
      }
    })//{}-> object
  }catch(err){
    console.log(err);
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};