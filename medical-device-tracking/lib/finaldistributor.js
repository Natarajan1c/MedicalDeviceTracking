/**
 * Final Distributor to Accept custody of a Medical Device from a Distributor
 * @param {composer.finaldistributor.AcceptDeviceCustody} AcceptDeviceCustody - the AcceptDeviceCustody transaction
 * @transaction
 */
function AcceptDeviceCustody (AcceptDeviceCustody ){
  console.log('Accept Device Custody');
  
  var NS_M = 'composer.manufacturer';
  var NS_D = 'composer.distributor';
  var NS_F = 'composer.finaldistributor';
  
  if (!AcceptDeviceCustody.receiver.incomingMedicalDevices) {
          throw new Error('no incoming medical devices');
    	  return;
    }
  
  AcceptDeviceCustody.medicaldevice.status = 'WITH_DISTRIBUTOR';
  AcceptDeviceCustody.medicaldevice.custodian = 'C_FINAL_DISTRIBUTOR';
  AcceptDeviceCustody.medicaldevice.custodianId = AcceptDeviceCustody.receiver.FinalDistId; 
  
  return getAssetRegistry(NS_M + '.MedicalDevice')
      .then(function (MedicalDeviceRegistry) {
            return MedicalDeviceRegistry.update(AcceptDeviceCustody.medicaldevice);
        })
  
  AcceptDeviceCustody.receiver.incomingMedicalDevices = AcceptDeviceCustody.receiver.incomingMedicalDevices
    .filter(function(MedicalDevices) {
        return MedicalDevices.UID !== AcceptDeviceCustody.medicaldevice.UID;
    });
  
  return getParticipantRegistry(NS_D + '.FinalDistributor')
      .then(function (FinalDistributorRegistry) {
            return FinalDistributorRegistry.update(AcceptDeviceCustody.receiver);
        })
  }

/**
 * Final Distributor to Implant a Medical Device to a Patient
 * @param {composer.finaldistributor.ImplantDevice } ImplantDevice  - the ImplantDevice transaction
 * @transaction
 */
function ImplantDevice (ImplantDevice ){
  console.log('Implant Device');
  
  var NS_M = 'composer.manufacturer';
  var NS_D = 'composer.finaldistributor';
  
  ImplantDevice.medicaldevice.status = 'IMPLANTED';
  ImplantDevice.medicaldevice.custodian = 'D_PATIENT';
  ImplantDevice.medicaldevice.dofImplant = ImplantDevice.dofImplant;
  ImplantDevice.medicaldevice.Implantby = ImplantDevice.implantby.FinalDistId
  
  if(ImplantDevice.PatientInfoRelease){
    ImplantDevice.medicaldevice.custodianId = ImplantDevice.patient.PatientId;
  }
  else {
    ImplantDevice.medicaldevice.custodianId = '0000';
  }
  
  return getAssetRegistry(NS_M + '.MedicalDevice')
      .then(function (MedicalDeviceRegistry) {
            return MedicalDeviceRegistry.update(ImplantDevice.medicaldevice);
        })
 }