// Kindly lent from: https://egorpanok.com/2018-11-11-how-to-emulate-a-foreign-key-constraint-check-on-mongo-with-mongoose/

module.exports = (model, id) => {
  return new Promise((resolve, reject) => {
    model.findOne({ id }, (err, result) => {
      if (result) {
        return resolve(true)
      } else
        return reject(
          new Error(
            `FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`
          )
        )
    })
  })
}