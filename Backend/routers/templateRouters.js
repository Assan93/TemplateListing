const express = require('express');
const Model = require('../models/templateModels');

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        })

        .catch((err) => {
            if (err?.code === 11000) {
                res.status(400).json({ message: 'Template already registered' });
            }
            else {
                res.status(500).json({ message: 'some error occurred' });
            }
            console.log(err);
        });
});

// Get all templates //

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GettemplatebyId //

router.get('/getTemplatebyId/:_id', (req, res) => {
    // Model.findOne()
    Model.find({ _id: req.params._id })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// createdTemplate   //


router.get('/created/:_id', (req, res) => {
    // Model.findOne()
    Model.find({ createdBy: req.params.createdBy })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});



// Update template
router.put('/update/:_id', (req, res) => {
    Model.findByIdAndUpdate(req.params._id, req.body, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Template not found' });
            }
            res.status(200).json({
                message: 'Template updated successfully',
                data: result
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: 'Error updating template',
                error: err
            });
        });
});

// Delete template //

router.delete('/delete/:_id', (req, res) => {
    Model.findByIdAndDelete(req.params._id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'Template not found' });
            }
            res.status(200).json({ message: 'Template deleted successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error deleting template', error: err });
        });
});


module.exports = router;