import { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import './styles.scss';

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPT = 'image/jpeg,image/png,image/webp';

export const AdminProductImageUpload = ({
  currentImage,
  onFileChange,
  onError,
  uploadBoxClassName = '',
  previewClassName = '',
}) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(currentImage || null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleSelectFile = (file) => {
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      onError?.('Formato no válido. Usá JPG, PNG o WEBP.');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      onError?.('La imagen supera el tamaño máximo de 5MB.');
      return;
    }

    setPreview(URL.createObjectURL(file));
    onFileChange?.(file);
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <Box className="admin-product-image-upload">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        hidden
        onChange={(event) => {
          handleSelectFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />

      <Box
        className={`admin-product-upload-box ${uploadBoxClassName}`.trim()}
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openFilePicker();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Seleccionar imagen del producto"
      >
        {preview ? (
          <img src={preview} alt="Vista previa del producto" className={`admin-product-upload-preview ${previewClassName}`.trim()} />
        ) : (
          <>
            <CloudUploadOutlinedIcon />
            <Typography variant="body2" className="admin-product-upload-title">
              Arrastra o sube una imagen
            </Typography>
            <Typography variant="caption" className="admin-product-upload-hint">
              Formatos: JPG, PNG, WEBP (Máx 5MB)
            </Typography>
          </>
        )}
      </Box>

      <Button
        type="button"
        variant="outlined"
        className="thumbnail-btn thumbnail-btn--dashed"
        onClick={openFilePicker}
        startIcon={<PhotoCameraOutlinedIcon />}
      >
        {preview ? 'Cambiar imagen' : 'Seleccionar imagen'}
      </Button>
    </Box>
  );
};
