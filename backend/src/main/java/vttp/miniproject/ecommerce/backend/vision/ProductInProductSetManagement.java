//package vttp.miniproject.ecommerce.backend.vision;
//
//import java.io.IOException;
//
//import com.google.cloud.vision.v1.ProductName;
//import com.google.cloud.vision.v1.ProductSearchClient;
//import com.google.cloud.vision.v1.ProductSetName;
//
//public class ProductInProductSetManagement {
//    // [START vision_product_search_add_product_to_product_set]
//
//  /**
//   * Add a product to a product set.
//   *
//   * @param projectId - Id of the project.
//   * @param computeRegion - Region name.
//   * @param productId - Id of the product.
//   * @param productSetId - Id of the product set.
//   * @throws IOException - on I/O errors.
//   */
//  public static void addProductToProductSet(
//    String projectId, String computeRegion, String productId, String productSetId)
//    throws IOException {
//  try (ProductSearchClient client = ProductSearchClient.create()) {
//
//    // Get the full path of the product set.
//    String formattedName = ProductSetName.format(projectId, computeRegion, productSetId);
//
//    // Get the full path of the product.
//    String productPath = ProductName.of(projectId, computeRegion, productId).toString();
//
//    // Add the product to the product set.
//    client.addProductToProductSet(formattedName, productPath);
//
//    System.out.println(String.format("Product added to product set."));
//  }
//}
//// [END vision_product_search_add_product_to_product_set]
//}
