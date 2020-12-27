const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const configurationSchema = new mongoose.Schema({
  siteID: {
    type: Number,
    default: 1,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  phone_2: String,
  address_1: String,
  address_2: String,
  city: String,
  country: String,
  description:{
    type: String,
    trim: true
  },
  logo:{
    type: String,
    trim: true
  },
  copy:{
    type: String,
    trim: true,
    default: '®2020-2021 | Juan Iriart (matecito.com.ar)'
  },
  active: {
    type: Boolean,
    default: 1,
    required: true,
  },
});

module.exports = mongoose.model('Configuration', configurationSchema);
