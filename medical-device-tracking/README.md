# Medical Device Tracking

> This solution is a submission to "INTRO TO BLOCKCHAIN AND HYPERLEDGER - REGULATION RESEARCH & IMPLEMENTATION" challenge 1
Submitted by: Natarajan Chandrasekhar (natarajan1.c@outlook.com)


This is an interactive, distributed, Medical Device Tracking demo. The objective of the solution is to enable compliance to **US code of federal regulation: 21 CFR Part 821- Medical Device Tracking Requirements**. This solution enables tracking of devices from the manufacturing facility, through the distributor network and, ultimately, to the patient. This is necessary for the effectiveness of remedies prescribed by the agency (FDA), such as: patient notification (or)  device recall.
 

This business network defines:

**Participants:**
`Regulator` `Manufacturer` `Distributor` `FinalDistributor` `Patient`

**Assets:**
`Product` `MedicalDevice`

**Transactions:**
`SetupDemo` `IssueTrackingOrder` `BatchManufactureDevices` `ShipDevices` `AcceptShipment` `DistributeDevice` `AcceptDeviceCustody` `ImplantDevice`

To test the solution, run the `SetupDemo` function & it creates the listed sample Participant entries in the registry.

In the `Regulator` participant registry, FDA is created by `SetupDemo`:

```
FDA
{
  "$class": "composer.regulator.Regulator",
  "RegId": "FDA",
  "regulator": "FDA"
}
```

In the `Manufacturer` participant registry, 2 manufacturers are created by `SetupDemo`:

```
ALPHA
{
  "$class": "composer.manufacturer.Manufacturer",
  "ManufacturerId": "ALPHA",
  "ManufactureName": "ALPHA COMPANY"
}

BETA
{
  "$class": "composer.manufacturer.Manufacturer",
  "ManufacturerId": "BETA",
  "ManufactureName": "BETA COMPANY"
}
```

In the `Distributor` participant registry, 3 distributors are created by `SetupDemo`:

```
DIST1
{
  "$class": "composer.distributor.Distributor",
  "DistId": "DIST1",
  "DistributorName": "DIST1_REGIONAL1_SUPPLIER"
}

DIST2
{
  "$class": "composer.distributor.Distributor",
  "DistId": "DIST2",
  "DistributorName": "DIST2_WESTCOAST_SUPPLIER"
}

DIST3
{
  "$class": "composer.distributor.Distributor",
  "DistId": "DIST3",
  "DistributorName": "DIST3_MIDLANDS_SUPPLIER"
}
```

In the `FinalDistributor` participant registry, 3 final distributors are created by `SetupDemo`:

```
FD1_ALICE
{
  "$class": "composer.finaldistributor.FinalDistributor",
  "FinalDistId": "FD1_ALICE",
  "type": "LICENSED_PRACTIONOR",
  "FinalDistributorName": "FIN_DIST1_DR_ALICE"
}


FD2_GEMMA
{
  "$class": "composer.finaldistributor.FinalDistributor",
  "FinalDistId": "FD2_GEMMA",
  "type": "LICENSED_PRACTIONOR",
  "FinalDistributorName": "FIN_DIST2_DR_GEMMA"
}


FD3_ABC
{
  "$class": "composer.finaldistributor.FinalDistributor",
  "FinalDistId": "FD3_ABC",
  "type": "HOSPITAL",
  "FinalDistributorName": "FIN_DIST3_ABC HOSPITAL"
}
```

In the `Patient` participant registry, 6 patients are created by `SetupDemo`. Please note that PatientId:0000 will be used if a patient receiving a medical device (implant) decides not to release personal information for tracking

```
0000
{
  "$class": "composer.finaldistributor.Patient",
  "PatientId": "0000",
  "PatientName": "PATIENT INFO NOT RELEASED"
}


BOB
{
  "$class": "composer.finaldistributor.Patient",
  "PatientId": "BOB",
  "PatientName": "BOB"
}


CHARLIE
{
  "$class": "composer.finaldistributor.Patient",
  "PatientId": "CHARLIE",
  "PatientName": "CHARLIE"
}


DOUG
{
  "$class": "composer.finaldistributor.Patient",
  "PatientId": "DOUG",
  "PatientName": "DOUG"
}


ELAN
{
  "$class": "composer.finaldistributor.Patient",
  "PatientId": "ELAN",
  "PatientName": "ELAN"
}


FIN
{
  "$class": "composer.finaldistributor.Patient",
  "PatientId": "FIN",
  "PatientName": "FIN"
}
```

The `IssueTrackingOrder` function is called by `Regulator` (FDA) to issue a tracking order for a `Product` (productId:"MRM") to the `Manufacturer` (ManufacturerId:"ALPHA").

```
{
  "$class": "composer.regulator.IssueTrackingOrder",
  "productId": "MRM",
  "productDescription": "Defibrillator implantable dual chamber",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}
```


The `Manufacturer` (ManufacturerId:"ALPHA") calls `BatchManufactureDevices` with an array of (Unique Device Identifiers) UDI to record a batch of manufactured Medical Devices in the `MedicalDevice` Asset registry [Total # of devices = 4 in "batch50" ; UDI = "UDI_51" , "UDI_52" , "UDI_53" , "UDI_54]

```
{
  "$class": "composer.manufacturer.BatchManufactureDevices",
  "UDI": ["UDI_51","UDI_52","UDI_53","UDI_54"],
  "deviceName": "Defibrillator implantable dual chamber",
  "batchnumber": "batch50",
  "dofM": "28/Jul/2017",
  "dofE": "28/Jul/2097",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA",
  "product": "resource:composer.regulator.Product#MRM"
}
```
```
UDI_51
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_51",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "MANUFACTURED",
  "custodian": "A_MANUFACTURER",
  "custodianId": "ALPHA",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}

UDI_52
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_52",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "MANUFACTURED",
  "custodian": "A_MANUFACTURER",
  "custodianId": "ALPHA",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}

UDI_53
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_53",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "MANUFACTURED",
  "custodian": "A_MANUFACTURER",
  "custodianId": "ALPHA",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}

UDI_54
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_54",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "MANUFACTURED",
  "custodian": "A_MANUFACTURER",
  "custodianId": "ALPHA",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}

```


The `Manufacturer` (ManufacturerId:"ALPHA") uses `ShipDevices` function to ship a batch of devices (UDI_51, UDI_52 & UDI_53) to the `Distributor` (DistId: "DIST1") 

```
{
  "$class": "composer.manufacturer.ShipDevices",
  "dofShipment": "29/Jul/2017",
  "medicaldevice": ["UDI_51","UDI_52","UDI_53"],
  "sender": "resource:composer.manufacturer.Manufacturer#ALPHA",
  "receiver": "resource:composer.distributor.Distributor#DIST1"
}

UDI_51
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_51",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "IN_TRANSIT",
  "custodian": "A_MANUFACTURER",
  "custodianId": "ALPHA",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "dofShipment": "29/Jul/2017",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}

(Same data for UDI_52 & UDI_53)
```

The `Distributor` (DistId: "DIST1") accepts the shipment & acknowledges the custody of the medical devices (UDI_51, UDI_52 & UDI_53) using `AcceptShipment` function.

```
{
  "$class": "composer.distributor.AcceptShipment",
  "medicaldevice": ["UDI_51","UDI_52","UDI_53"],
  "sender": "resource:composer.manufacturer.Manufacturer#ALPHA",
  "receiver": "resource:composer.distributor.Distributor#DIST1"
}
```
```
UDI_51
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_51",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "WITH_DISTRIBUTOR",
  "custodian": "B_DISTRIBUTOR",
  "custodianId": "DIST1",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "dofShipment": "29/Jul/2017",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}

(Same data for UDI_52 & UDI_53)
```


The `Distributor` (DistId: "DIST1") uses ``DistributeDevice` function to distrbute a Medical device (UDI_51) to the `FinalDistributor`(FD1_ALICE).
```
{
  "$class": "composer.distributor.DistributeDevice",
  "medicaldevice": "resource:composer.manufacturer.MedicalDevice#UDI_51",
  "sender": "resource:composer.distributor.Distributor#DIST1",
  "receiver": "resource:composer.finaldistributor.FinalDistributor#FD1_ALICE"
}

```
```
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_51",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "IN_TRANSIT",
  "custodian": "B_DISTRIBUTOR",
  "custodianId": "DIST1",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "dofShipment": "29/Jul/2017",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}
```

The `FinalDistributor`(FD1_ALICE) accepts the device & acknowledges it's custody using `AcceptDeviceCustody` function.
```
{
  "$class": "composer.finaldistributor.AcceptDeviceCustody",
  "medicaldevice": "resource:composer.manufacturer.MedicalDevice#UDI_51",
  "sender": "resource:composer.distributor.Distributor#DIST1",
  "receiver": "resource:composer.finaldistributor.FinalDistributor#FD1_ALICE"
}
```
```
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_51",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "WITH_DISTRIBUTOR",
  "custodian": "C_FINAL_DISTRIBUTOR",
  "custodianId": "FD1_ALICE",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "dofShipment": "29/Jul/2017",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}
```

The `FinalDistributor`(FD1_ALICE) implants the Medical device (UDI_51) to a `Patient`( PatientId:"BOB") & record in the registry using the function `ImplantDevice`  

```
{
  "$class": "composer.finaldistributor.ImplantDevice",
  "dofImplant": "31/Jul/2017",
  "PatientInfoRelease": true,
  "implantby": "resource:composer.finaldistributor.FinalDistributor#FD1_ALICE",
  "patient": "resource:composer.finaldistributor.Patient#BOB",
  "medicaldevice": "resource:composer.manufacturer.MedicalDevice#UDI_51"
}
```
```
UDI_51
{
  "$class": "composer.manufacturer.MedicalDevice",
  "UDI": "UDI_51",
  "deviceName": "Defibrillator implantable dual chamber",
  "batchNumber": "batch50",
  "status": "IMPLANTED",
  "custodian": "D_PATIENT",
  "custodianId": "BOB",
  "dofManufacture": "28/Jul/2017",
  "dofExpiry": "28/Jul/2097",
  "dofShipment": "29/Jul/2017",
  "dofImplant": "31/Jul/2017",
  "Implantby": "FD1_ALICE",
  "product": "resource:composer.regulator.Product#MRM",
  "manufacturer": "resource:composer.manufacturer.Manufacturer#ALPHA"
}
```

This solution enables the `Manufacturer` to trace all `MedicalDevice`(s) right from manufacturing facility through the distribution channel `Distributor` `FinalDistributor`, upto the ultimate user of the device (i.e) the `Patient`.

In turn, it enables the `Manufacturer` to report to the FDA about location of the devices. Also it will enable the `Manufacturer` to effectively respond to patient notice & device recall notice issued by FDA.

Overall this will enable the `Manufacturer` to be compliant with the Federal Regulation: **21 CFR Part 821- Medical Device Tracking Requirements**. 

Thank you!
