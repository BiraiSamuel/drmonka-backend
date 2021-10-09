const Doctor = require("../models/doctor");
const admin = require("firebase-admin");
const PRIVATEKEY =
  process.env.PRIVATEKEY1 +
  process.env.PRIVATEKEY2 +
  process.env.PRIVATEKEY3 +
  process.env.PRIVATEKEY4 +
  process.env.PRIVATEKEY5 +
  process.env.PRIVATEKEY6 +
  process.env.PRIVATEKEY7 +
  process.env.PRIVATEKEY8;
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECTID,
  private_key_id: process.env.PROJECTKEYID,
  private_key: PRIVATEKEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENTEMAIL,
  client_id: process.env.CLIENTID,
  auth_uri: process.env.AUTHURI,
  token_uri: process.env.TOKENURI,
  auth_provider_x509_cert_url: process.env.AUTHPROVIDERX509CERTURL,
  client_x509_cert_url: process.env.CLIENTX509CERTURL,
};

module.exports = class DoctorService {
  static async getAllDoctors() {
    const allDoctors = await Doctor.find();
    return allDoctors;
  }

  static async createDoctor(data) {
    const newDoctor = {
      title: data.title,
      body: data.body,
      article_image: data.article_image,
    };
    const response = await new Doctor(newDoctor).save();
    return response;
  }

  static async getDoctorbyId(articleId) {
    const singleDoctorResponse = await Doctor.findById({
      _id: articleId,
    });
    return singleDoctorResponse;
  }

  static async updateDoctor(title, body, articleImage) {
    const updateResponse = await Doctor.updateOne(
      { title, body, articleImage },
      { $set: { date: new Date.now() } }
    );
    return updateResponse;
  }

  static async deleteDoctor(articleId) {
    const deletedResponse = await Doctor.findOneAndDelete(articleId);
    return deletedResponse;
  }
};