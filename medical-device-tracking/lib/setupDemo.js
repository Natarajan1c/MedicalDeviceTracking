/**
 * Setup demo with sample participant entries
 * @param {composer.base.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
function SetupDemo(SetupDemo) {
    console.log('setupDemo');

    var factory = getFactory();
    var NS_M = 'composer.manufacturer';
    var NS_D = 'composer.distributor';
    var NS_F = 'composer.finaldistributor';
    var NS_R = 'composer.regulator';
        
    var manufacturers = [];
    var distibutors = [];
    var finaldistributors = [];
    var patients = [];
    var products = [];
    var medicaldevices = [];
    var regulators = [];
  
 // Participant: Manufacturers
  	var manufacturer = factory.newResource(NS_M, 'Manufacturer', 'ALPHA');
  	manufacturer.ManufactureName = 'ALPHA COMPANY';
    manufacturers.push(manufacturer);
  
    var manufacturer = factory.newResource(NS_M, 'Manufacturer', 'BETA');
  	manufacturer.ManufactureName = 'BETA COMPANY';
    manufacturers.push(manufacturer);
 
 // Participant: Regulator
    var regulator = factory.newResource(NS_R, 'Regulator', 'FDA');
    regulator.regulator = 'FDA';
    regulators.push(regulator); 
    
 // Participant: Distributors
  	var distributor = factory.newResource(NS_D, 'Distributor', 'DIST1');
  	distributor.DistributorName = 'DIST1_REGIONAL1_SUPPLIER';
    distibutors.push(distributor);
  
    var distributor = factory.newResource(NS_D, 'Distributor', 'DIST2');
  	distributor.DistributorName = 'DIST2_WESTCOAST_SUPPLIER';
    distibutors.push(distributor);
  
    var distributor = factory.newResource(NS_D, 'Distributor', 'DIST3');
  	distributor.DistributorName = 'DIST3_MIDLANDS_SUPPLIER';
    distibutors.push(distributor);
  
 //Participant: Final Distributors
    var finaldistributor = factory.newResource(NS_F, 'FinalDistributor', 'FD1_ALICE');
  	finaldistributor.type = 'LICENSED_PRACTIONOR';
  	finaldistributor.FinalDistributorName = 'FIN_DIST1_DR_ALICE';
    finaldistributors.push(finaldistributor);
  
    var finaldistributor = factory.newResource(NS_F, 'FinalDistributor', 'FD2_GEMMA');
  	finaldistributor.type = 'LICENSED_PRACTIONOR';
  	finaldistributor.FinalDistributorName = 'FIN_DIST2_DR_GEMMA';
    finaldistributors.push(finaldistributor);
  
    var finaldistributor = factory.newResource(NS_F, 'FinalDistributor', 'FD3_ABC');
  	finaldistributor.type = 'HOSPITAL';
  	finaldistributor.FinalDistributorName = 'FIN_DIST3_ABC HOSPITAL';
    finaldistributors.push(finaldistributor);
  
 //Participant: Patients
    var patient = factory.newResource(NS_F, 'Patient', '0000');
  	patient.PatientName = 'PATIENT INFO NOT RELEASED';
  	patients.push(patient);
  
    var patient = factory.newResource(NS_F, 'Patient', 'BOB');
  	patient.PatientName = 'BOB';
  	patients.push(patient);
  
    var patient = factory.newResource(NS_F, 'Patient', 'CHARLIE');
  	patient.PatientName = 'CHARLIE';
  	patients.push(patient);
  
    var patient = factory.newResource(NS_F, 'Patient', 'DOUG');
  	patient.PatientName = 'DOUG';
  	patients.push(patient);
  
    var patient = factory.newResource(NS_F, 'Patient', 'ELAN');
  	patient.PatientName = 'ELAN';
  	patients.push(patient);
  
    var patient = factory.newResource(NS_F, 'Patient', 'FIN');
  	patient.PatientName = 'FIN';
  	patients.push(patient);
  
 //Asset: Product
    var product = factory.newResource(NS_R, 'Product', 'LWQ');
    product.manufacturer = factory.newRelationship (NS_M, 'Manufacturer', 'ALPHA'); 
    product.productDescription = 'Heart valve mechanical-LWQ';
    product.tracking = 'YES';
    products.push(product); 
 
 //Asset: Medical Device
    var medicaldevice = factory.newResource(NS_M, 'MedicalDevice', 'UDI_001');
    medicaldevice.product = factory.newRelationship (NS_R, 'Product', 'LWQ'); 
    medicaldevice.manufacturer = factory.newRelationship (NS_M, 'Manufacturer','ALPHA');
  	medicaldevice.deviceName = 'Heart valve mechanical-LWQ';
    medicaldevice.batchNumber = 'batch001';
    medicaldevice.status = 'MANUFACTURED';
  	medicaldevice.custodian = 'A_MANUFACTURER';
    medicaldevice.custodianId = 'ALPHA';
    medicaldevice.dofManufacture = "20/July/2017";
    medicaldevice.dofExpiry = "20/July/2057";
  	medicaldevices.push(medicaldevice);
  
    var medicaldevice = factory.newResource(NS_M, 'MedicalDevice', 'UDI_002');
    medicaldevice.product = factory.newRelationship (NS_R, 'Product', 'LWQ'); 
  	medicaldevice.manufacturer = factory.newRelationship (NS_M, 'Manufacturer','ALPHA');
  	medicaldevice.deviceName = 'Heart valve mechanical-LWQ';
    medicaldevice.batchNumber = 'batch001';
    medicaldevice.status = 'MANUFACTURED';
  	medicaldevice.custodian = 'A_MANUFACTURER';
    medicaldevice.custodianId = 'ALPHA';
    medicaldevice.dofManufacture = "20/July/2017";
    medicaldevice.dofExpiry = "20/July/2057";
  	medicaldevices.push(medicaldevice);
  
  
 //Add all Demo Participants & Assets to registry
   	return getParticipantRegistry(NS_M + '.Manufacturer')
        .then(function(ManufacturerRegistry) {
            return ManufacturerRegistry.addAll(manufacturers);
        })
  		.then(function() {
            return getParticipantRegistry(NS_D + '.Distributor');
        })
        .then(function(DistributorRegistry) {
            return DistributorRegistry.addAll(distibutors);
        })
  		.then(function() {
            return getParticipantRegistry(NS_R + '.Regulator');
        })
        .then(function(RegulatorRegistry) {
            return RegulatorRegistry.addAll(regulators);
        })
        .then(function() {
            return getParticipantRegistry(NS_F + '.FinalDistributor');
        })
        .then(function(FinalDistributorRegistry) {
            return FinalDistributorRegistry.addAll(finaldistributors);
        })
        .then(function() {
            return getParticipantRegistry(NS_F + '.Patient');
        })
        .then(function(PatientRegistry) {
            return PatientRegistry.addAll(patients);
        })
        .then(function() {
            return getAssetRegistry(NS_R + '.Product');
        })
        .then(function(ProductRegistry) {
            return ProductRegistry.addAll(products);
        })
        .then(function() {
            return getAssetRegistry(NS_M + '.MedicalDevice');
        })
        .then(function(MedicalDeviceRegistry) {
            return MedicalDeviceRegistry.addAll(medicaldevices);
        }) 
}
  