"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Cropper from "react-easy-crop";
import { motion } from "framer-motion";
import { Upload, Zap, Shield, Clock } from "lucide-react";

const ASPECT_RATIOS = {
  free: { value: null, label: "Free Crop" },
  square: { value: 1, label: "1:1 Square" },
  widescreen: { value: 16 / 9, label: "16:9 Widescreen" },
  standard: { value: 4 / 3, label: "4:3 Standard" },
};

// Adaptive Canva-style Cropper Component
const CanvaCropper = ({
  image,
  onCropChange,
  cropArea,
  containerRef,
  aspectRatio = null,
  rotation = 0,
  imageAspectRatio = 1,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startCrop, setStartCrop] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const imageRef = useRef(null);

  const handleMouseDown = useCallback(
    (e, type) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragType(type);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartCrop({ ...cropArea });
    },
    [cropArea]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      // Direct container-based relative coordinates
      const relativeX = deltaX / containerRect.width;
      const relativeY = deltaY / containerRect.height;

      let newCrop = { ...startCrop };

      switch (dragType) {
        case "move":
          newCrop.x = Math.max(
            0,
            Math.min(1 - newCrop.width, startCrop.x + relativeX)
          );
          newCrop.y = Math.max(
            0,
            Math.min(1 - newCrop.height, startCrop.y + relativeY)
          );
          break;

        case "nw":
          if (aspectRatio) {
            const deltaW = -relativeX;
            const deltaH = -relativeY;
            const avgDelta =
              (Math.abs(deltaW) + Math.abs(deltaH * aspectRatio)) / 2;
            const newWidth = Math.max(
              0.05,
              Math.min(startCrop.width + avgDelta, 1)
            );
            const newHeight = newWidth / aspectRatio;

            if (
              startCrop.x + startCrop.width - newWidth >= 0 &&
              startCrop.y + startCrop.height - newHeight >= 0
            ) {
              newCrop.width = newWidth;
              newCrop.height = newHeight;
              newCrop.x = startCrop.x + startCrop.width - newWidth;
              newCrop.y = startCrop.y + startCrop.height - newHeight;
            }
          } else {
            newCrop.width = Math.max(0.05, startCrop.width - relativeX);
            newCrop.height = Math.max(0.05, startCrop.height - relativeY);
            newCrop.x = startCrop.x + startCrop.width - newCrop.width;
            newCrop.y = startCrop.y + startCrop.height - newCrop.height;
          }
          break;

        case "ne":
          if (aspectRatio) {
            const deltaW = relativeX;
            const deltaH = -relativeY;
            const avgDelta =
              (Math.abs(deltaW) + Math.abs(deltaH * aspectRatio)) / 2;
            const newWidth = Math.max(
              0.05,
              Math.min(startCrop.width + avgDelta, 1 - startCrop.x)
            );
            const newHeight = newWidth / aspectRatio;

            if (startCrop.y + startCrop.height - newHeight >= 0) {
              newCrop.width = newWidth;
              newCrop.height = newHeight;
              newCrop.y = startCrop.y + startCrop.height - newHeight;
            }
          } else {
            newCrop.width = Math.max(
              0.05,
              Math.min(startCrop.width + relativeX, 1 - startCrop.x)
            );
            newCrop.height = Math.max(0.05, startCrop.height - relativeY);
            newCrop.y = startCrop.y + startCrop.height - newCrop.height;
          }
          break;

        case "sw":
          if (aspectRatio) {
            const deltaW = -relativeX;
            const deltaH = relativeY;
            const avgDelta =
              (Math.abs(deltaW) + Math.abs(deltaH * aspectRatio)) / 2;
            const newWidth = Math.max(0.05, startCrop.width + avgDelta);
            const newHeight = newWidth / aspectRatio;

            if (
              startCrop.x + startCrop.width - newWidth >= 0 &&
              startCrop.y + newHeight <= 1
            ) {
              newCrop.width = newWidth;
              newCrop.height = newHeight;
              newCrop.x = startCrop.x + startCrop.width - newWidth;
            }
          } else {
            newCrop.width = Math.max(0.05, startCrop.width - relativeX);
            newCrop.height = Math.max(
              0.05,
              Math.min(startCrop.height + relativeY, 1 - startCrop.y)
            );
            newCrop.x = startCrop.x + startCrop.width - newCrop.width;
          }
          break;

        case "se":
          if (aspectRatio) {
            const deltaW = relativeX;
            const deltaH = relativeY;
            const avgDelta =
              (Math.abs(deltaW) + Math.abs(deltaH * aspectRatio)) / 2;
            const newWidth = Math.max(
              0.05,
              Math.min(startCrop.width + avgDelta, 1 - startCrop.x)
            );
            const newHeight = newWidth / aspectRatio;

            if (startCrop.y + newHeight <= 1) {
              newCrop.width = newWidth;
              newCrop.height = newHeight;
            }
          } else {
            newCrop.width = Math.max(
              0.05,
              Math.min(startCrop.width + relativeX, 1 - startCrop.x)
            );
            newCrop.height = Math.max(
              0.05,
              Math.min(startCrop.height + relativeY, 1 - startCrop.y)
            );
          }
          break;

        case "n":
          if (!aspectRatio) {
            newCrop.height = Math.max(0.05, startCrop.height - relativeY);
            newCrop.y = startCrop.y + startCrop.height - newCrop.height;
          }
          break;

        case "s":
          if (!aspectRatio) {
            newCrop.height = Math.max(
              0.05,
              Math.min(startCrop.height + relativeY, 1 - startCrop.y)
            );
          }
          break;

        case "w":
          if (!aspectRatio) {
            newCrop.width = Math.max(0.05, startCrop.width - relativeX);
            newCrop.x = startCrop.x + startCrop.width - newCrop.width;
          }
          break;

        case "e":
          if (!aspectRatio) {
            newCrop.width = Math.max(
              0.05,
              Math.min(startCrop.width + relativeX, 1 - startCrop.x)
            );
          }
          break;
      }

      // Ensure bounds
      newCrop.x = Math.max(0, Math.min(1 - newCrop.width, newCrop.x));
      newCrop.y = Math.max(0, Math.min(1 - newCrop.height, newCrop.y));
      newCrop.width = Math.min(newCrop.width, 1 - newCrop.x);
      newCrop.height = Math.min(newCrop.height, 1 - newCrop.y);

      onCropChange(newCrop);
    },
    [isDragging, dragType, startPos, startCrop, onCropChange, aspectRatio]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const cropStyle = useMemo(
    () => ({
      left: `${cropArea.x * 100}%`,
      top: `${cropArea.y * 100}%`,
      width: `${cropArea.width * 100}%`,
      height: `${cropArea.height * 100}%`,
    }),
    [cropArea]
  );

  const clipPath = useMemo(
    () =>
      `polygon(0% 0%, 0% 100%, ${cropArea.x * 100}% 100%, ${
        cropArea.x * 100
      }% ${cropArea.y * 100}%, ${(cropArea.x + cropArea.width) * 100}% ${
        cropArea.y * 100
      }%, ${(cropArea.x + cropArea.width) * 100}% ${
        (cropArea.y + cropArea.height) * 100
      }%, ${cropArea.x * 100}% ${(cropArea.y + cropArea.height) * 100}%, ${
        cropArea.x * 100
      }% 100%, 100% 100%, 100% 0%)`,
    [cropArea]
  );

  const imageStyle = useMemo(
    () => ({
      transform: `rotate(${rotation}deg)`,
      transformOrigin: "center center",
    }),
    [rotation]
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900 select-none rounded-lg">
      <img
        ref={imageRef}
        src={image}
        alt="Crop target"
        className="w-full h-full object-cover pointer-events-none transition-transform duration-200"
        style={imageStyle}
        draggable={false}
      />

      <div
        className="absolute inset-0 bg-black bg-opacity-60 pointer-events-none"
        style={{ clipPath }}
      />

      <div
        className="absolute border-2 border-white shadow-lg cursor-move bg-transparent"
        style={cropStyle}
        onMouseDown={(e) => handleMouseDown(e, "move")}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-white opacity-40" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-white opacity-40" />
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white opacity-40" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white opacity-40" />
        </div>

        {/* Corner handles */}
        <div
          className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 cursor-nw-resize rounded-sm shadow-md hover:scale-110 transition-transform"
          onMouseDown={(e) => handleMouseDown(e, "nw")}
        />
        <div
          className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 cursor-ne-resize rounded-sm shadow-md hover:scale-110 transition-transform"
          onMouseDown={(e) => handleMouseDown(e, "ne")}
        />
        <div
          className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-blue-500 cursor-sw-resize rounded-sm shadow-md hover:scale-110 transition-transform"
          onMouseDown={(e) => handleMouseDown(e, "sw")}
        />
        <div
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-500 cursor-se-resize rounded-sm shadow-md hover:scale-110 transition-transform"
          onMouseDown={(e) => handleMouseDown(e, "se")}
        />

        {/* Edge handles - only for free crop */}
        {!aspectRatio && (
          <>
            <div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-2 border-blue-500 cursor-n-resize rounded-sm shadow-md hover:scale-110 transition-transform"
              onMouseDown={(e) => handleMouseDown(e, "n")}
            />
            <div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-2 border-blue-500 cursor-s-resize rounded-sm shadow-md hover:scale-110 transition-transform"
              onMouseDown={(e) => handleMouseDown(e, "s")}
            />
            <div
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 cursor-w-resize rounded-sm shadow-md hover:scale-110 transition-transform"
              onMouseDown={(e) => handleMouseDown(e, "w")}
            />
            <div
              className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 cursor-e-resize rounded-sm shadow-md hover:scale-110 transition-transform"
              onMouseDown={(e) => handleMouseDown(e, "e")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default function FreaImageCropper() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [cropArea, setCropArea] = useState({
    x: 0.1,
    y: 0.1,
    width: 0.8,
    height: 0.8,
  });
  const [aspect, setAspect] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useCanvaStyle, setUseCanvaStyle] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // React-easy-crop fallback states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const containerRef = useRef(null);

  // Calculate adaptive container dimensions
  const containerDimensions = useMemo(() => {
    if (!imageAspectRatio) return { width: "100%", height: "400px" };

    const maxWidth = 600; // Max width in pixels
    const maxHeight = 500; // Max height in pixels

    let width, height;

    if (imageAspectRatio >= 1) {
      // Landscape or square
      width = Math.min(maxWidth, window.innerWidth * 0.6);
      height = width / imageAspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * imageAspectRatio;
      }
    } else {
      // Portrait
      height = Math.min(maxHeight, window.innerHeight * 0.5);
      width = height * imageAspectRatio;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / imageAspectRatio;
      }
    }

    return {
      width: `${Math.round(width)}px`,
      height: `${Math.round(height)}px`,
    };
  }, [imageAspectRatio]);

  // Convert crop area to pixels
  const getCroppedAreaPixels = useCallback(
    (imageSrc, cropArea, rotation = 0) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          const pixels = {
            x: Math.round(cropArea.x * image.naturalWidth),
            y: Math.round(cropArea.y * image.naturalHeight),
            width: Math.round(cropArea.width * image.naturalWidth),
            height: Math.round(cropArea.height * image.naturalHeight),
          };
          resolve(pixels);
        };
        image.src = imageSrc;
      });
    },
    []
  );

  // Handle crop change
  const handleCanvaCropChange = useCallback(
    async (newCropArea) => {
      setCropArea(newCropArea);

      if (imageSrc) {
        const pixels = await getCroppedAreaPixels(
          imageSrc,
          newCropArea,
          rotation
        );
        setCroppedAreaPixels(pixels);
      }
    },
    [imageSrc, getCroppedAreaPixels, rotation]
  );

  // Handle file selection
  const handleFileSelect = useCallback((file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, GIF, etc.)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        setImageAspectRatio(aspectRatio);
        setImageSrc(reader.result);
        setCropArea({ x: 0.1, y: 0.1, width: 0.8, height: 0.8 });
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setCroppedImage(null);
        setCroppedAreaPixels(null);
        setShowPreview(false);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle crop complete for react-easy-crop
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Generate preview
  const generatePreview = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsProcessing(true);
      const croppedImageUrl = await createCroppedPreview(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImageUrl);
      setShowPreview(true);
    } catch (error) {
      console.error("Error generating preview:", error);
      alert("Failed to generate preview. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  // Create preview
  const createCroppedPreview = useCallback(
    (imageSrc, pixelCrop, rotation = 0) => {
      return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }

          // Exact crop coordinates
          const crop = {
            x: Math.max(0, Math.min(pixelCrop.x, image.naturalWidth - 1)),
            y: Math.max(0, Math.min(pixelCrop.y, image.naturalHeight - 1)),
            width: Math.max(
              1,
              Math.min(pixelCrop.width, image.naturalWidth - pixelCrop.x)
            ),
            height: Math.max(
              1,
              Math.min(pixelCrop.height, image.naturalHeight - pixelCrop.y)
            ),
          };

          canvas.width = crop.width;
          canvas.height = crop.height;

          if (rotation === 0) {
            ctx.drawImage(
              image,
              crop.x,
              crop.y,
              crop.width,
              crop.height,
              0,
              0,
              crop.width,
              crop.height
            );
          } else {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(
              image,
              crop.x,
              crop.y,
              crop.width,
              crop.height,
              -crop.width / 2,
              -crop.height / 2,
              crop.width,
              crop.height
            );
            ctx.restore();
          }

          canvas.toBlob(
            (blob) => {
              if (blob && blob.size > 0) {
                resolve(URL.createObjectURL(blob));
              } else {
                reject(new Error("Failed to create preview"));
              }
            },
            "image/jpeg",
            0.9
          );
        };

        image.onerror = () => reject(new Error("Failed to load image"));
        image.src = imageSrc;
      });
    },
    []
  );

  // Download image
  const downloadImage = async (format = "jpeg") => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsProcessing(true);
      const croppedImageUrl = await getCroppedImageForDownload(
        imageSrc,
        croppedAreaPixels,
        format,
        rotation
      );

      const link = document.createElement("a");
      link.href = croppedImageUrl;
      link.download = `cropped-image.${format === "jpeg" ? "jpg" : "png"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(croppedImageUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Create download image
  const getCroppedImageForDownload = (
    imageSrc,
    pixelCrop,
    format,
    rotation = 0
  ) => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("No 2d context"));
          return;
        }

        const crop = {
          x: Math.max(0, Math.min(pixelCrop.x, image.naturalWidth - 1)),
          y: Math.max(0, Math.min(pixelCrop.y, image.naturalHeight - 1)),
          width: Math.max(
            1,
            Math.min(pixelCrop.width, image.naturalWidth - pixelCrop.x)
          ),
          height: Math.max(
            1,
            Math.min(pixelCrop.height, image.naturalHeight - pixelCrop.y)
          ),
        };

        canvas.width = crop.width;
        canvas.height = crop.height;

        if (format === "jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (rotation === 0) {
          ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
          );
        } else {
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            -crop.width / 2,
            -crop.height / 2,
            crop.width,
            crop.height
          );
          ctx.restore();
        }

        const mimeType = format === "jpeg" ? "image/jpeg" : "image/png";
        const quality = format === "jpeg" ? 0.95 : 1.0;

        canvas.toBlob(
          (blob) => {
            if (blob && blob.size > 0) {
              resolve(URL.createObjectURL(blob));
            } else {
              reject(new Error("Canvas is empty"));
            }
          },
          mimeType,
          quality
        );
      };

      image.onerror = () => reject(new Error("Failed to load image"));
      image.src = imageSrc;
    });
  };

  // Handle aspect ratio change
  const handleAspectChange = useCallback(
    (newAspect) => {
      setAspect(newAspect);
      setShowPreview(false);

      if (newAspect && imageSrc && useCanvaStyle) {
        let newCropArea = { ...cropArea };

        if (newAspect === 1) {
          const size = Math.min(cropArea.width, cropArea.height, 0.8);
          newCropArea.width = size;
          newCropArea.height = size;
        } else if (newAspect > 1) {
          newCropArea.width = Math.min(0.8, cropArea.height * newAspect);
          newCropArea.height = newCropArea.width / newAspect;
        } else {
          newCropArea.height = Math.min(0.8, cropArea.width / newAspect);
          newCropArea.width = newCropArea.height * newAspect;
        }

        // Center the crop area
        newCropArea.x = Math.max(
          0.05,
          Math.min(0.95 - newCropArea.width, 0.5 - newCropArea.width / 2)
        );
        newCropArea.y = Math.max(
          0.05,
          Math.min(0.95 - newCropArea.height, 0.5 - newCropArea.height / 2)
        );

        handleCanvaCropChange(newCropArea);
      }
    },
    [cropArea, useCanvaStyle, handleCanvaCropChange, imageSrc]
  );

  // Handle rotation
  const handleRotationChange = useCallback((newRotation) => {
    const normalizedRotation = ((newRotation % 360) + 360) % 360;
    setRotation(normalizedRotation);
    setShowPreview(false);
  }, []);

  const handleRotate = useCallback(
    (degrees) => {
      const newRotation = (rotation + degrees) % 360;
      handleRotationChange(newRotation);
    },
    [rotation, handleRotationChange]
  );

  // Reset crop
  const resetCrop = useCallback(() => {
    if (useCanvaStyle) {
      const newCropArea = { x: 0.1, y: 0.1, width: 0.8, height: 0.8 };
      handleCanvaCropChange(newCropArea);
    } else {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
    setRotation(0);
    setShowPreview(false);
  }, [useCanvaStyle, handleCanvaCropChange]);

  // Fit to center
  const fitToCenter = useCallback(() => {
    if (useCanvaStyle) {
      const newCropArea = { x: 0.1, y: 0.1, width: 0.8, height: 0.8 };
      handleCanvaCropChange(newCropArea);
    } else {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
    setShowPreview(false);
  }, [useCanvaStyle, handleCanvaCropChange]);

  // Handle drag and drop
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      if (!dropZone.contains(e.relatedTarget)) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    };

    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("dragleave", handleDragLeave);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [handleFileSelect]);

  // Handle paste
  useEffect(() => {
    const handlePaste = (e) => {
      const items = Array.from(e.clipboardData.items);
      const imageItem = items.find((item) => item.type.startsWith("image/"));

      if (imageItem) {
        const file = imageItem.getAsFile();
        handleFileSelect(file);
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handleFileSelect]);

  // Initialize crop area when image loads
  useEffect(() => {
    if (imageSrc && useCanvaStyle) {
      handleCanvaCropChange(cropArea);
    }
  }, [imageSrc, useCanvaStyle]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-black">Crop Images</span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              Instantly & Precisely
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Crop, resize, and adjust your images in seconds. Maintain sharp
            quality while making them ready for social media, websites, or
            personal use.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Zap, text: "Lightning Fast" },
              { icon: Shield, text: "100% Private" },
              { icon: Clock, text: "No Time Limits" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200"
              >
                <feature.icon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {!imageSrc ? (
          // Upload Area
          <div className="max-w-4xl mx-auto">
            <div
              ref={dropZoneRef}
              className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "border-blue-500 bg-blue-50 scale-105"
                  : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <motion.div
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Drop your images here
                  </h3>
                  <p className="text-gray-600">
                    or click to browse • Supports JPEG, PNG, WEBP
                  </p>
                </div>
              </motion.div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        ) : (
          // Cropper Interface
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
              {/* Cropper Section */}
              <div className="xl:col-span-3">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex-1">
                      Crop Your Image
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setUseCanvaStyle(!useCanvaStyle)}
                        className={`px-3 py-1 text-xs sm:text-sm rounded transition-colors ${
                          useCanvaStyle
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Canva Style
                      </button>
                      <button
                        onClick={() => setImageSrc(null)}
                        className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        Upload New
                      </button>
                    </div>
                  </div>

                  {/* Aspect Ratio Controls */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aspect Ratio
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(ASPECT_RATIOS).map(
                        ([key, { value, label }]) => (
                          <button
                            key={key}
                            onClick={() => handleAspectChange(value)}
                            className={`px-3 py-1 text-xs sm:text-sm rounded-lg transition-all duration-200 ${
                              aspect === value
                                ? "bg-blue-600 text-white shadow-md transform scale-105"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
                            }`}
                          >
                            {label}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Rotation Controls */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rotation
                    </label>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <button
                        onClick={() => handleRotate(-90)}
                        className="px-3 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all hover:scale-105"
                      >
                        ↶ 90°
                      </button>
                      <button
                        onClick={() => handleRotate(90)}
                        className="px-3 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all hover:scale-105"
                      >
                        ↷ 90°
                      </button>
                      <button
                        onClick={() => handleRotate(180)}
                        className="px-3 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all hover:scale-105"
                      >
                        ↻ 180°
                      </button>
                      <button
                        onClick={() => setRotation(0)}
                        className="px-3 py-1 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all hover:scale-105"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600">
                          Custom Angle:
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">
                          {rotation}°
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="359"
                        step="1"
                        value={rotation}
                        onChange={(e) =>
                          handleRotationChange(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${
                            (rotation / 359) * 100
                          }%, #E5E7EB ${
                            (rotation / 359) * 100
                          }%, #E5E7EB 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0°</span>
                        <span>90°</span>
                        <span>180°</span>
                        <span>270°</span>
                        <span>360°</span>
                      </div>
                    </div>
                  </div>

                  {/* Adaptive Cropper Container */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div
                      ref={containerRef}
                      className="bg-gray-100 border border-gray-200 overflow-hidden mx-auto"
                      style={containerDimensions}
                    >
                      {useCanvaStyle ? (
                        <CanvaCropper
                          image={imageSrc}
                          cropArea={cropArea}
                          onCropChange={handleCanvaCropChange}
                          containerRef={containerRef}
                          aspectRatio={aspect}
                          rotation={rotation}
                          imageAspectRatio={imageAspectRatio}
                        />
                      ) : (
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={aspect}
                          rotation={rotation}
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onRotationChange={setRotation}
                          onCropComplete={onCropComplete}
                          cropShape="rect"
                          showGrid={true}
                        />
                      )}
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="text-center text-xs sm:text-sm text-gray-500 mb-4">
                    Image: {Math.round(imageAspectRatio * 1000) / 1000} ratio •
                    Container: {containerDimensions.width} ×{" "}
                    {containerDimensions.height}
                  </div>

                  {/* Zoom Control - Only for react-easy-crop */}
                  {!useCanvaStyle && (
                    <div className="mb-4 sm:mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zoom: {Math.round(zoom * 100)}%
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Control Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={resetCrop}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Reset Crop
                    </button>
                    <button
                      onClick={fitToCenter}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Fit to Center
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview and Download Section */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Preview & Download
                  </h3>

                  {/* Preview Button */}
                  <div className="mb-6">
                    <button
                      onClick={generatePreview}
                      disabled={!croppedAreaPixels || isProcessing}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium mb-4 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Generating...
                        </span>
                      ) : (
                        "👁️ Preview Image"
                      )}
                    </button>

                    {/* Preview Display */}
                    <div className="border-2 border-gray-200 rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[200px] flex items-center justify-center">
                      {showPreview && croppedImage ? (
                        <img
                          src={croppedImage}
                          alt="Cropped preview"
                          className="max-w-full max-h-64 rounded-lg shadow-md"
                          style={{
                            objectFit: "contain",
                            imageRendering: "crisp-edges",
                          }}
                          onError={() => {
                            setCroppedImage(null);
                            setShowPreview(false);
                          }}
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <div className="text-4xl mb-2">🖼️</div>
                          <div className="text-sm">
                            Click "Preview Image" to see result
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Download Buttons */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-700">Download As:</h4>

                    <button
                      onClick={() => downloadImage("jpeg")}
                      disabled={!croppedAreaPixels || isProcessing}
                      className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
                    >
                      {isProcessing ? "Processing..." : "📥 Download JPG"}
                    </button>

                    <button
                      onClick={() => downloadImage("png")}
                      disabled={!croppedAreaPixels || isProcessing}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none"
                    >
                      {isProcessing ? "Processing..." : "📥 Download PNG"}
                    </button>
                  </div>

                  {croppedAreaPixels && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Crop size:</span>
                        <span className="font-mono">
                          {croppedAreaPixels.width} × {croppedAreaPixels.height}
                          px
                        </span>
                      </div>
                      {rotation !== 0 && (
                        <div className="flex justify-between">
                          <span>Rotation:</span>
                          <span className="font-mono">{rotation}°</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span>Original quality</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
