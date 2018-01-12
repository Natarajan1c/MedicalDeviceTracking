/**
 * Distributor to Accept Shipment of a batch of Medical Device from Manufacturer
 * @param {composer.distributor.AcceptShipment} AcceptShipment - the AcceptShipment transaction
 * @transaction
 */
function AcceptShipment (AcceptShipment){
    
  var NS_M = 'composer.manufacturer';
  var NS_D = 'composer.distributor';
  
  if (!AcceptShipment.receiver.incomingMedicalDevices) {
          throw new Error('no incoming medical devices');
    	  return;
    }
  
  for(var i=0; i<AcceptShipment.medicaldevice.length; i++){
  	  
      AcceptShipment.medicaldevice[i].status = 'WITH_DISTRIBUTOR';
  	  AcceptShipment.medicaldevice[i].custodian = 'B_DISTRIBUTOR';
  	  AcceptShipment.medicaldevice[i].custodianId = AcceptShipment.receiver.DistId; 
  
      AcceptShipment.receiver.incomingMedicalDevices = AcceptShipment.receiver.incomingMedicalDevices
      .filter(function(MedicalDevices) {
          return MedicalDevices.UID !== AcceptShipment.medicaldevice[i].UID;
      });
  
  }
  
  return getAssetRegistry(NS_M + '.MedicalDevice')
      .then(function (MedicalDeviceRegistry) {
            return MedicalDeviceRegistry.updateAll(AcceptShipment.medicaldevice);
        })
  	  .then(function() {
   			return getParticipantRegistry(NS_D + '.Distributor');
  		})
      .then(function (DistributorRegistry) {
            return DistributorRegistry.update(AcceptShipment.receiver);
        })
  }

/**
 * Distributor to distrbute a Medical Device to a Final Distributor
 * @param {composer.distributor.DistributeDevice} DistributeDevice - the DistributeDevice transaction
 * @transaction
 */
function DistributeDevice (DistributeDevice ){
  console.log('Distribute Device');
  
  var NS_M = 'composer.manufacturer';
  var NS_D = 'composer.distributor';
  var NS_F = 'composer.finaldistributor';
  
  DistributeDevice.medicaldevice.status = 'IN_TRANSIT';
  
  return getAssetRegistry(NS_M + '.MedicalDevice')
      .then(function (MedicalDeviceRegistry) {
            return MedicalDeviceRegistry.update(DistributeDevice.medicaldevice);
        })
  .then(function() {
      if (DistributeDevice.receiver.incomingMedicalDevices) {
        DistributeDevice.receiver.incomingMedicalDevices.push(DistributeDevice.medicaldevice);
      } else {
        DistributeDevice.receiver.incomingMedicalDevices = [DistributeDevice.medicaldevice];
        }

  return getParticipantRegistry(NS_F + '.FinalDistributor');
  })
      .then(function (FinalDistributorRegistry) {
            return FinalDistributorRegistry.update(DistributeDevice.receiver);
        });
  }