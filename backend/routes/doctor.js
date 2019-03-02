const express = require('express');
const router = express.Router();
const Doctor = require('../model/doctor');

router.get('/', async (req, res) => {
  let doctorList;
  try {
     doctorList = await Doctor.find();
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
  res.send(doctorList);
});


router.post('/', async (req, res) => {
  let doctor;
  try {
    doctor = new Doctor(req.body);
    doctor = await doctor.save();
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
  //res.json({ customers });
  res.send(doctor);
  console.log(doctor);
  //res.json({doctor});
});

router.put('/:id', async (req, res) => {
  	const { id } = req.params;
  	let update;
	  try {
	    update  = await Doctor.update({_id: id}, req.body);
	    if(update.ok == 1)
	    	update  = await Doctor.findById({ _id: id });
	    else
	    	throw new Error("Error to update object " + id);
	  } catch (error) {
	    res.status(500).json({ error: error.toString() });
	  }
	 	res.send(update); 
});


router.delete('/:id', async (req, res) => {
	  let { id } = req.params;
	  let deleteDoctor;

	  try {
	    deleteDoctor = await Doctor.remove({_id: id});
	    if(deleteDoctor.ok == 1)
	    	deleteDoctor  = id;
	    else
	    	throw new Error("Error to delete object " + id);
	  } catch (error) {
	    res.status(500).json({ error: error.toString() });
	  }
	 	res.send({_id : deleteDoctor}); 
});




module.exports = router;
