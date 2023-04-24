package vttp.miniproject.ecommerce.backend.vision;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;

import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Feature.Type;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageContext;
import com.google.cloud.vision.v1.ProductSearchParams;
import com.google.cloud.vision.v1.ProductSearchResults.Result;
import com.google.cloud.vision.v1.ProductSetName;
import com.google.protobuf.ByteString;

public class ProductSearch {
    // [START vision_product_search_get_similar_products]
    /**
     * Search similar products to image in local file.
     *
     * @param projectId       - Id of the project.
     * @param computeRegion   - Region name.
     * @param productSetId    - Id of the product set.
     * @param productCategory - Category of the product.
     * @param filePath        - Local file path of the image to be searched
     * @param filter          - Condition to be applied on the labels. Example for
     *                        filter: (color = red OR
     *                        color = blue) AND style = kids It will search on all
     *                        products with the following labels:
     *                        color:red AND style:kids color:blue AND style:kids
     * @throws IOException - on I/O errors.
     */
    public static void getSimilarProductsFile(
            String projectId,
            String computeRegion,
            String productSetId,
            String productCategory,
            String filePath,
            String filter)
            throws IOException {
        try (ImageAnnotatorClient queryImageClient = ImageAnnotatorClient.create()) {

            // Get the full path of the product set.
            String productSetPath = ProductSetName.format(projectId, computeRegion, productSetId);

            // Read the image as a stream of bytes.
            File imgPath = new File(filePath);
            byte[] content = Files.readAllBytes(imgPath.toPath());

            // Create annotate image request along with product search feature.
            Feature featuresElement = Feature.newBuilder().setType(Type.PRODUCT_SEARCH).build();
            // The input image can be a HTTPS link or Raw image bytes.
            // Example:
            // To use HTTP link replace with below code
            // ImageSource source = ImageSource.newBuilder().setImageUri(imageUri).build();
            // Image image = Image.newBuilder().setSource(source).build();
            Image image = Image.newBuilder().setContent(ByteString.copyFrom(content)).build();
            ImageContext imageContext = ImageContext.newBuilder()
                    .setProductSearchParams(
                            ProductSearchParams.newBuilder()
                                    .setProductSet(productSetPath)
                                    .addProductCategories(productCategory)
                                    .setFilter(filter))
                    .build();

            AnnotateImageRequest annotateImageRequest = AnnotateImageRequest.newBuilder()
                    .addFeatures(featuresElement)
                    .setImage(image)
                    .setImageContext(imageContext)
                    .build();
            List<AnnotateImageRequest> requests = Arrays.asList(annotateImageRequest);

            // Search products similar to the image.
            BatchAnnotateImagesResponse response = queryImageClient.batchAnnotateImages(requests);

            List<Result> similarProducts = response.getResponses(0).getProductSearchResults().getResultsList();
            System.out.println("Similar Products: ");
            for (Result product : similarProducts) {
                System.out.println(String.format("\nProduct name: %s", product.getProduct().getName()));
                System.out.println(
                        String.format("Product display name: %s", product.getProduct().getDisplayName()));
                System.out.println(
                        String.format("Product description: %s", product.getProduct().getDescription()));
                System.out.println(String.format("Score(Confidence): %s", product.getScore()));
                System.out.println(String.format("Image name: %s", product.getImage()));
            }
        }
    }
    // [END vision_product_search_get_similar_products]
}
