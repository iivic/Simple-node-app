let Bear = require('../models/bear');

module.exports.isOriginalBear = bear => bear.get('created_at').getTime() == bear.get('updated_at').getTime();
