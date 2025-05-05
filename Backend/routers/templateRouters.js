const express = require('express');
const Model = require('../models/templateModels');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const uploads = require('../middleware/multer');

// Add template with image upload
router.post('/add', uploads.single('image'), async (req, res) => {
    try {
        // const result = await cloudinary.uploader.upload(req.file.path);

        const template = new Model(req.body);

        const savedTemplate = await template.save();
        res.status(200).json(savedTemplate);

    } catch (err) {
        if (err?.code === 11000) {
            res.status(400).json({ message: 'Template already registered' });
        } else {
            console.error(err);
            res.status(500).json({ message: 'Some error occurred' });
        }
    }
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
    Model.findById(req.params._id)
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

// Update template with image
router.put('/update/:_id', uploads.single('image'), async (req, res) => {
    try {
        let template = await Model.findById(req.params._id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        // Delete old image if exists
        if (template.cloudinary_id) {
            await cloudinary.uploader.destroy(template.cloudinary_id);
        }

        let result;
        if (req.file) {
            // Upload new image
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            ...req.body,
            image: result?.secure_url || template.image,
            cloudinary_id: result?.public_id || template.cloudinary_id
        };

        template = await Model.findByIdAndUpdate(req.params._id, data, { new: true });
        res.status(200).json({
            message: 'Template updated successfully',
            data: template
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error updating template',
            error: err
        });
    }
});

// Delete template with image
router.delete('/delete/:_id', async (req, res) => {
    try {
        const template = await Model.findById(req.params._id);
        if (!template) {
            return res.status(404).json({ message: 'Template not found' });
        }

        // Delete image from cloudinary
        if (template.cloudinary_id) {
            await cloudinary.uploader.destroy(template.cloudinary_id);
        }

        await Model.findByIdAndDelete(req.params._id);
        res.status(200).json({ message: 'Template deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting template', error: err });
    }
});

module.exports = router;