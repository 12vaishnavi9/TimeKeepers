import express from "express";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
import { createCategoryController,updateCategoryController,categoryControlller,
singleCategoryController,deleteCategoryController} from "../controllers/categoryController.js";

const router=express.Router();

//routes
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);
// router.post('/create-category',createCategoryController);
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);//id ke basis p category kl update
// krege
//get all categories & users can access it without bein login:-
router.get("/get-category", categoryControlller);
//single category
router.get("/single-category/:slug",singleCategoryController);//slug ko url m dikahyege or uske basis p product le lege
router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController);

export default router;