import express from "express";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import { createProductController,getProductController,getSingleProductController
,productPhotoController,deleteProductController,updateProductController,
productFilterController,productCountController,productListController,
searchProductController,relatedProductController,productCategoryController,
braintreeTokenController ,braintreePaymentController} from "../controllers/productController.js";
import formidable from "express-formidable";

const router=express.Router();

router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController)
router.get("/get-product",getProductController)

//get single product:-slug k basis p chahiyE
router.get("/get-product/:slug",getSingleProductController)

//for photo 
router.get("/product-photo/:id",productPhotoController)
router.delete("/delete-product/:id",deleteProductController)

//updating product
router.put("/update-product/:id",requireSignIn,isAdmin,formidable(),updateProductController)

//filter product:-
router.post("/product-filters",productFilterController);

//for pagination:- product count
router.get("/product-count",productCountController);

//product per page
router.get("/product-list/:page",productListController);

//search product:-
router.get("/search/:keyword",searchProductController);

//similar products:-
router.get("/related-products/:pid/:cid",relatedProductController);

//to show products categorywise
router.get("/product-category/:slug",productCategoryController);

//PAYMENT ROUTES
//token
router.get("/braintree/token",braintreeTokenController);
//payment
router.post("/braintree/payment",requireSignIn,braintreePaymentController);

export default router;

