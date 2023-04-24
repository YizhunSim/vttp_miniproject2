//package vttp.miniproject.ecommerce.backend.vision;
//
//import com.google.api.gax.longrunning.OperationFuture;
//import com.google.cloud.vision.v1.BatchOperationMetadata;
//import com.google.cloud.vision.v1.CreateProductSetRequest;
//import com.google.cloud.vision.v1.ImageAnnotatorClient;
//import com.google.cloud.vision.v1.ImportProductSetsGcsSource;
//import com.google.cloud.vision.v1.ImportProductSetsGcsSource.Builder;
//import com.google.cloud.vision.v1.Product.KeyValue;
//import com.google.common.io.Files;
//import com.google.protobuf.FieldMask;
//import com.google.protobuf.compiler.PluginProtos.CodeGeneratorResponse.File;
//import com.google.cloud.vision.v1.ImportProductSetsInputConfig;
//import com.google.cloud.vision.v1.ImportProductSetsResponse;
//import com.google.cloud.vision.v1.LocationName;
//import com.google.cloud.vision.v1.Product;
//import com.google.cloud.vision.v1.ProductName;
//import com.google.cloud.vision.v1.ProductSearchClient;
//import com.google.cloud.vision.v1.ProductSet;
//import com.google.cloud.vision.v1.ProductSetName;
//import com.google.cloud.vision.v1.ReferenceImage;
//
//import java.io.IOException;
//import java.io.PrintStream;
//import javax.swing.JPanel;
//
//public class ProductManagement {
//
//    // [START vision_product_search_create_product_set]
//    /**
//     * Create a product set
//     *
//     * @param projectId             - Id of the project.
//     * @param computeRegion         - Region name.
//     * @param productSetId          - Id of the product set.
//     * @param productSetDisplayName - Display name of the product set.
//     * @throws IOException - on I/O errors.
//     */
//    public static void createProductSet(
//            String projectId, String computeRegion, String productSetId, String productSetDisplayName)
//            throws IOException {
//        try (ProductSearchClient client = ProductSearchClient.create()) {
//
//            // A resource that represents Google Cloud Platform location.
//            String formattedParent = LocationName.format(projectId, computeRegion);
//
//            // Create a product set with the product set specification in the region.
//            ProductSet myProductSet = ProductSet.newBuilder().setDisplayName(productSetDisplayName).build();
//            CreateProductSetRequest request = CreateProductSetRequest.newBuilder()
//                    .setParent(formattedParent)
//                    .setProductSet(myProductSet)
//                    .setProductSetId(productSetId)
//                    .build();
//            ProductSet productSet = client.createProductSet(request);
//            // Display the product set information
//            System.out.println(String.format("Product set name: %s", productSet.getName()));
//        }
//    }
//    // [END vision_product_search_create_product_set]
//
//    /**
//     * Create one product.
//     *
//     * @param projectId          - Id of the project.
//     * @param computeRegion      - Region name.
//     * @param productId          - Id of the product.
//     * @param productDisplayName - Display name of the product.
//     * @param productCategory    - Category of the product.
//     * @throws IOException - on I/O errors.
//     */
//    public static void createProduct(
//            String projectId,
//            String computeRegion,
//            String productId,
//            String productDisplayName,
//            String productCategory)
//            throws IOException {
//        try (ProductSearchClient client = ProductSearchClient.create()) {
//
//            // A resource that represents Google Cloud Platform location.
//            String formattedParent = LocationName.format(projectId, computeRegion);
//            // Create a product with the product specification in the region.
//            // Multiple labels are also supported.
//            Product myProduct = Product.newBuilder()
//                    .setName(productId)
//                    .setDisplayName(productDisplayName)
//                    .setProductCategory(productCategory)
//                    .build();
//            Product product = client.createProduct(formattedParent, myProduct, productId);
//            // Display the product information
//            System.out.println(String.format("Product name: %s", product.getName()));
//        }
//    }
//
//    // [START vision_product_search_update_product_labels]
//    /**
//     * Update the product labels.
//     *
//     * @param projectId     - Id of the project.
//     * @param computeRegion - Region name.
//     * @param productId     -Id of the product.
//     * @param productLabels - Labels of the product.
//     * @throws IOException - on I/O errors.
//     */
//    public static void updateProductLabels(
//            String projectId, String computeRegion, String productId, String productLabels)
//            throws IOException {
//        try (ProductSearchClient client = ProductSearchClient.create()) {
//
//            // Get the full path of the product.
//            String formattedName = ProductName.format(projectId, computeRegion, productId);
//
//            // Set product name, product labels and product display name.
//            // Multiple labels are also supported.
//            Product product = Product.newBuilder()
//                    .setName(formattedName)
//                    .addProductLabels(
//                            KeyValue.newBuilder()
//                                    .setKey(productLabels.split(",")[0].split("=")[0])
//                                    .setValue(productLabels.split(",")[0].split("=")[1])
//                                    .build())
//                    .build();
//
//            // Set product update field name.
//            FieldMask updateMask = FieldMask.newBuilder().addPaths("product_labels").build();
//
//            // Update the product.
//            Product updatedProduct = client.updateProduct(product, updateMask);
//            // Display the product information
//            System.out.println(String.format("Product name: %s", updatedProduct.getName()));
//            System.out.println(String.format("Updated product labels: "));
//            for (Product.KeyValue element : updatedProduct.getProductLabelsList()) {
//                System.out.println(String.format("%s: %s", element.getKey(), element.getValue()));
//            }
//        }
//    }
//    // [END vision_product_search_update_product_labels]
//
//}
