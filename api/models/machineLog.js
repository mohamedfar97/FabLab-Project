const mongoose = require('mongoose');

const MachineLogSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    machineType: {
        type: String,
        required: true,
        enum: ['workspace','laser cutter','3d printer',
        'cnc precision milling machine','3d scanner','vinyl cutter',
        'electronics bench']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const MachineLog = mongoose.model('MachineLog', MachineLogSchema);

module.exports = {
    MachineLog
};