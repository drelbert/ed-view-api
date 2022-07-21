// these are generalized controllers to work for all of the resources

// route methods
// create
// function has param = model to allow use of many diff models in this controller
export const createOne = (model) => async (req, res) => {
  // const createdBy = req.user._id
  try {
    // note the model.create is a mongoose helper function
    const doc = await model.create({ ...req.body })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// read one
export const getOne = (model) => async (req, res) => {
  // get the id from the request
  const id = req.params.id
  // const for the user when adding auth
  // const userId = req.user._id
  try {
    // _id: req.params.id
    // args for findOne take fields to search on
    // _id as the id from mongo
    // will have to add user later createdBy: userId
    const doc = await model.findById(id).exec()

    if (!doc) {
      return res.status(404).end('The record was not found.')
    }
    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// read
export const getAll = (model) => async (req, res) => {
  try {
    // set const with value of mongoose model helper function findById
    const docs = await model.find().lean().exec()

    if (!docs) {
      return res.status(400).end()
    }
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// update
export const updateOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findByIdAndUpdate(
        {
          _id: req.params.id,
          // the update
        },
        req.body,
        // send back the updated object
        { new: true }
      )
      .exec()
    if (!doc) {
      return res.status(400).end('Unable to find record to update.')
    }
    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// delete
export const deleteOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      _id: req.params.id,
    })

    if (!removed) {
      return res.status(400).end('No record to delete.')
    }
    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end('Removed successfully.')
  }
}

export const crudControllers = (model) => ({
  createOne: createOne(model),
  getAll: getAll(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
})
