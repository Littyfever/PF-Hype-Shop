const { Router } = require("express");
const { Product, User, Attribute, Variation, Size, Color } = require("../db");

const {
   allData,
   getProductById,
   createProduct,

   updateProduct,
   deleteProduct,
   deshabilitarUser,
   habilitarUser,
   darAdmin,
   sacarAdmin,
   createOrder,
   getOrdersAdmin,
   getOrdersUser,
   orderState,
   createReview,
   getAllReviews,
} = require("../controllers/sneakers.controller");
const { objectFormatter } = require("../utils/objectFormatter");

const router = Router();

router.get("/sneakers", allData);

router.get("/sneakers/:productId", getProductById);

router.get("/filters/:filter", async (req, res) => {
   const filter = req.params.filter;
   try {
      const attributeFromDb = await Product.findAll({
         include: [
            {
               model: Attribute,
            },
         ],
      });

      const productsObject = JSON.parse(JSON.stringify(attributeFromDb));
      const products = productsObject.map((prod) => objectFormatter(prod));

      const results = products.map((attr) => attr[filter]);
      res.status(200).json(Array.from(new Set(results)));
   } catch (e) {
      res.status(400).json({ Error: e.message });
   }
});

router.post("/sneakersCreate", createProduct);

router.post("/authentication", async (req, res, next) => {
   try {
      const { email, name } = req.body;
      if (email === "hypeshopcompany@gmail.com") {
         const user = await User.findOrCreate({
            where: { email: email, isAdmin: true },
            defaults: {
               name,
               email,
            },
         });
         res.status(200).json(user);
      } else {
         const user = await User.findOrCreate({
            where: { email: email },
            defaults: {
               name,
               email,
            },
         });
         res.status(200).json(user);
      }
   } catch (error) {
      next(error);
   }
});
router.get("/usuarios", async (req, res) => {
   const productsData = await User.findAll();

   res.send(productsData);
});

//Dashboard Admin

router.put("/sneakersUpdate", updateProduct);
router.put("/sneakersDelete", deleteProduct);

router.put("/deshabilitarUser", deshabilitarUser);
router.put("/habilitarUser", habilitarUser);

router.put("/admin", darAdmin);
router.put("/sacarAdmin", sacarAdmin);

router.post("/createReview", createReview);

router.post("/createOrder", createOrder);
router.get("/adminOrders", getOrdersAdmin);
router.put("/adminOrders", orderState);
router.get("/userOrders/:id", getOrdersUser);

router.get("/allReviews", getAllReviews);
//   res.status(200).json({created, pokemon})
//   }
//   catch (error) {
//       next(error);
//   }
// })

module.exports = router;
