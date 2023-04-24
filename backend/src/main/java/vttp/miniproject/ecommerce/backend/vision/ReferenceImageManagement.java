//package vttp.miniproject.ecommerce.backend.vision;
//
//import java.io.IOException;
//
//import com.google.cloud.vision.v1.ProductName;
//import com.google.cloud.vision.v1.ProductSearchClient;
//import com.google.cloud.vision.v1.ReferenceImage;
//
//public class ReferenceImageManagement {
//    // [START vision_product_search_create_reference_image]
//    /**
//     * Create a reference image.
//     *
//     * @param projectId        - Id of the project.
//     * @param computeRegion    - Region name.
//     * @param productId        - Id of the product.
//     * @param referenceImageId - Id of the image.
//     * @param gcsUri           - Google Cloud Storage path of the input image.
//     * @throws IOException - on I/O errors.
//     */
//    public static void createReferenceImage(
//            String projectId,
//            String computeRegion,
//            String productId,
//            String referenceImageId,
//            String gcsUri)
//            throws IOException {
//        try (ProductSearchClient client = ProductSearchClient.create()) {
//
//            // Get the full path of the product.
//            String formattedParent = ProductName.format(projectId, computeRegion, productId);
//            // Create a reference image.
//            ReferenceImage referenceImage = ReferenceImage.newBuilder().setUri(gcsUri).build();
//
//            ReferenceImage image = client.createReferenceImage(formattedParent, referenceImage, referenceImageId);
//            // Display the reference image information.
//            System.out.println(String.format("Reference image name: %s", image.getName()));
//            System.out.println(String.format("Reference image uri: %s", image.getUri()));
//        }
//    }
//    // [END vision_product_search_create_reference_image]
//}
