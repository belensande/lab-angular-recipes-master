const express    = require('express');
const router     = express.Router();
const Ingredient = require('../../models/ingredient');

router.get('/', (req, res, next) => {
  Ingredient.find({}, (err, ingredients) => {
    if (err)									{ return res.status(500).json(err); }
	if (!ingredients || !ingredients.length)	{ return res.status(404).json({message: "No ingredients found" }) }

    return res.json(ingredients);
  });
});

router.get('/:id', (req, res, next) => {
  Ingredient.findById(req.params.id, (err, ingredient) => {
    if (err)         { return res.status(500).json(err); }
	if (!ingredient) { return res.status(404).json({message: "Ingredient not found" }) }

    return res.json(ingredient);
  });
});

router.post('/', (req, res, next) => {
  const newIngredient = new Ingredient({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  });

  newIngredient.save( (err, ingredient) => {
    if (err)			{ return res.status(500).json(err); }
	if (!ingredient)	{ return res.status(500).json({message: "Ingredient not saved"}) }

    return res.json(newIngredient);
  });
});

module.exports = router;
