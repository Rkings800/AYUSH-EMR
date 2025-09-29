import express from 'express';
import { getAllUsers, getUser } from './../Controller/userController.js';
import { abhaLogin, abhaCallback, protect, logout } from '../Controller/abhaAuthController.js';
import { uploadBundle, getBundle } from '../Controller/bundleController.js';

const router = express.Router();

// localhost:271017/api/v1/namaste/getDoctors 

router
.route('/getDoctors')
.get(getAllUsers); // only for the admin gets all the doctor list.

// localhost:271017/api/v1/getDoctors/:id  --> id is the id of the given doctor id will mongo gen id.

router
.route('/getDoctors/:id')
.get(getUser); // only for the admin gets the list for a specific doctor.

// Bundle routes for FHIR data
router
.route('/bundles/upload')
.post(uploadBundle); // Upload FHIR bundle

export default router;