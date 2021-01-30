import { useCallback, useEffect, useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import ProgressiveImage from './ProgressiveImage';

import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@windmill/react-ui';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;
const CROPMAXWIDTH = 600;

const getCroppedImg = (image, crop, element) => {
  const canvas = element;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // canvas.width = crop.width;
  // canvas.height = crop.height;
  canvas.width =
    crop.width * scaleX > CROPMAXWIDTH ? CROPMAXWIDTH : crop.width * scaleX;
  canvas.height =
    crop.height * scaleY > CROPMAXWIDTH ? CROPMAXWIDTH : crop.width * scaleY;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    // 0,
    // 0,
    crop.width * scaleX * pixelRatio,
    crop.height * scaleY * pixelRatio,
    0,
    0,
    canvas.width > CROPMAXWIDTH ? CROPMAXWIDTH : canvas.width,
    canvas.height > CROPMAXWIDTH ? CROPMAXWIDTH : canvas.height
    // crop.width,
    // crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        try {
          blob.name = 'memberImage';
          const file = URL.createObjectURL(blob);
          resolve(file);
        } catch (e) {
          reject(e);
        }
      },
      'image/jpeg',
      1
    );
  });
};

const ImageCropper = ({ formik, initialImage }) => {
  const { setFieldValue, submitForm } = formik;

  const [img, setImg] = useState(null);
  const [cropData, setCropData] = useState({
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  });
  const [completedCropData, setCompletedCropData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const ImgRef = useRef(null);
  const PreviewCanvasRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (!completedCropData || !PreviewCanvasRef.current || !ImgRef.current) {
      return;
    }

    getCroppedImg(ImgRef.current, completedCropData, PreviewCanvasRef.current)
      .then((image) => {
        fetch(image).then(async (r) => {
          const blobImg = await r.blob();
          const reader = new FileReader();
          reader.readAsDataURL(blobImg);
          reader.onloadend = function () {
            const base64data = reader.result;
            setFieldValue('photo', base64data);
          }; // convert to base64 for sending to server
          //  setPhoto(blobImg);
        }); // convert blob URL Object back to blob
      })
      .catch((error) => {
        console.log({ error });
        setFieldValue('photo', undefined);
      });
  }, [completedCropData, setFieldValue]);

  const onLoad = useCallback((img) => {
    ImgRef.current = img;
  }, []);

  const onSelectFile = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      openModal();
    }
  }, []);

  const handleConfirm = useCallback(() => {
    setFormSubmitted(true);
    submitForm();
  }, [submitForm]);

  return (
    <>
      {!completedCropData ? (
        <ProgressiveImage
          preview={initialImage}
          image={initialImage}
          alt="Avatar"
        />
      ) : (
        <>
          <canvas ref={PreviewCanvasRef} className="w-full" />
          {!formSubmitted && (
            <>
              <div className="flex items-center justify-between">
                <Button onClick={openModal} className="block m-2">
                  Crop
                </Button>
                <Button onClick={handleConfirm} className="block m-2">
                  Confirm
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="block m-2"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </>
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="p-2 mt-2 text-sm bg-gray-200 rounded-md"
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Crop Image</ModalHeader>
        <ModalBody>
          <ReactCrop
            src={img}
            onImageLoaded={onLoad}
            crop={cropData}
            onChange={setCropData}
            onComplete={setCompletedCropData}
            minWidth="50"
          />
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" onClick={closeModal}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ImageCropper;
