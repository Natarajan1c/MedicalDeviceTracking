/**
 * The Regulator Issues a Medical Device tracking order to a Manufacturer
 * @param {composer.regulator.IssueTrackingOrder} IssueTrackingOrder - the IssueTrackingOrder transaction
 * @transaction
 */
function IssueTrackingOrder (IssueTrackingOrder) {
   
  var NS_M = 'composer.manufacturer';
  var NS_R = 'composer.regulator';
    
  var factory = getFactory();
  var product = factory.newResource(NS_R, 'Product', IssueTrackingOrder.productId);

  product.productDescription = IssueTrackingOrder.productDescription;
  product.tracking = 'YES';
  product.manufacturer = factory.newRelationship(NS_M, 'Manufacturer', IssueTrackingOrder.manufacturer.getIdentifier());

  return getAssetRegistry(NS_R + '.Product')
    .then(function(ProductRegistry) {
    return ProductRegistry.add(product);
  }) 

} 

