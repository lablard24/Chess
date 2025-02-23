import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from "@/store/common-slice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast({ title: "Image uploaded successfully." });
      }
    });
  }

  function handleDeleteImage(imageId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    
    if (confirmDelete) {
      dispatch(deleteFeatureImage(imageId)).then(() => {
        dispatch(getFeatureImages()); // Refresh list after deletion
        toast({ title: "Image deleted successfully.", variant: "destructive" });
      });
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      {/* Image Upload */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      {/* Display Uploaded Images */}
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div key={featureImgItem._id} className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                {/* Delete Button */}
                <Button
                  onClick={() => handleDeleteImage(featureImgItem._id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))
          : <p>No feature images found.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
