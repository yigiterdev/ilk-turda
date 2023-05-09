import styles from "@/styles/ImageUpload.module.css";
import {Button, FormLabel, Input} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import {useRef, useState} from "react";

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.ImageUpload}>
      <div>
        <FormLabel>Fotoğraf Yükle</FormLabel>
        <Input type="file" accept="image/*" onChange={onImageChange} />
      </div>

      <div className={styles.GeneratedImageWrapper}>
        <div ref={imageWrapperRef} className={styles.GeneratedImage}>
          <img className={styles.BackgroundImage} src={"/bg-image.jpg"} />

          {image && <img className={styles.UploadedImage} src={image} />}
        </div>
      </div>

      <Button colorScheme="red" onClick={exportAsImage}>
        Fotoğrafı İndir
      </Button>
    </div>
  );

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function exportAsImage() {
    const canvas = await html2canvas(imageWrapperRef.current as HTMLDivElement, {
      scale: 5
    });

    const image = canvas.toDataURL("image/png", 5.0);
    downloadImage(image);
  }

  function downloadImage(blob: string) {
    const fakeLink = window.document.createElement("a");

    fakeLink.style.display = "none";
    fakeLink.download = "ilkturda.png";

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  }
}
