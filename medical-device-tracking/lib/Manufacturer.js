/**
 * Manufacturer manufactures a batch of Medical Devices
 * @param {composer.manufacturer.BatchManufactureDevices} BatchManufactureDevices - the BatchManufactureDevices transaction
 * @transaction
 */
function BatchManufactureDevices (BatchManufactureDevices) {
   
  var NS_M = 'composer.manufacturer';
  var NS_R = 'composer.regulator';
  var medicaldevices = [];
  
  for(var i=0; i<BatchManufactureDevices.UDI.length; i++) {
     
     var factory = getFactory();
   	 var MedicalDevice = factory.newResource(NS_M, 'MedicalDevice', BatchManufactureDevices.UDI[i]);
     
     MedicalDevice.deviceName = BatchManufactureDevices.deviceName;
     MedicalDevice.batchNumber = BatchManufactureDevices.batchnumber;
     MedicalDevice.status = 'MANUFACTURED';
     MedicalDevice.custodian = 'A_MANUFACTURER';
     MedicalDevice.custodianId = BatchManufactureDevices.manufacturer.ManufacturerId;
     MedicalDevice.dofManufacture = BatchManufactureDevices.dofM;
     MedicalDevice.dofExpiry = BatchManufactureDevices.dofE;

     MedicalDevice.product = factory.newRelationship(NS_R, 'Product', BatchManufactureDevices.product.getIdentifier());
     MedicalDevice.manufacturer = factory.newRelationship(NS_M, 'Manufacturer', BatchManufactureDevices.manufacturer.getIdentifier());

     medicaldevices.push(MedicalDevice);
    
   }
  
  return getAssetRegistry(NS_M + '.MedicalDevice')
    .then(function(MedicalDeviceRegistry) {
    return MedicalDeviceRegistry.addAll(medicaldevices);
  }) 

} 

/**
 * Manufacturer ships a batch of Medical Devices to Distributor
 * @param {composer.manufacturer.ShipDevices} ShipDevices - the ShipDevices transaction
 * @transaction
 */
function ShipDevices (ShipDevices){
    
  var NS_M = 'composer.manufacturer';
  var NS_D = 'composer.distributor';
  
  for(var i=0; i<ShipDevices.medicaldevice.length; i++) {
     
     ShipDevices.medicaldevice[i].status = 'IN_TRANSIT';
  	 ShipDevices.medicaldevice[i].dofShipment = ShipDevices.dofShipment;
   
     if (ShipDevices.receiver.incomingMedicalDevices) {
        ShipDevices.receiver.incomingMedicalDevices.push(ShipDevices.medicaldevice[i]);
      } else {
        ShipDevices.receiver.incomingMedicalDevices = [ShipDevices.medicaldevice[i]];
        }
  }
        
  return getAssetRegistry(NS_M + '.MedicalDevice')
      .then(function (MedicalDeviceRegistry) {
            return MedicalDeviceRegistry.updateAll(ShipDevices.medicaldevice);
      })
  	  .then(function() {
      		return getParticipantRegistry(NS_D + '.Distributor');
  	  })
      .then(function (DistributorRegistry) {
            return DistributorRegistry.update(ShipDevices.receiver);
      });
  }