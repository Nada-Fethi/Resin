// routes/address.js
const express = require('express');
const router = express.Router();
const Address = require('./Address'); // نموذج العنوان

// ⬇️ إضافة عنوان جديد
router.post('/add', async (req, res) => {
  const { userId, fullName, phone, addressLine, city, postalCode } = req.body;
  try {
    const newAddress = new Address({ userId, fullName, phone, addressLine, city, postalCode });
    await newAddress.save();
    res.status(200).json({ success: true, message: 'Address added successfully', address: newAddress });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error adding address', error: err.message });
  }
});

// ⬇️ جلب جميع العناوين
router.get('/:userId', async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ⬇️ حذف عنوان
router.delete('/:addressId/:userId', async (req, res) => {
  try {
    await Address.deleteOne({ _id: req.params.addressId, userId: req.params.userId });
    res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
