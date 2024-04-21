import SignatureCanvas from "react-signature-canvas";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () =>{
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    const a = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");

    fetch(a)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "File name",{ type: "image/png" });
      console.log(file);
    })
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <br />
      <br />
      {/* if our we have a non-null image url we should
      show an image and pass our imageURL state to it*/}
      {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "200px",
            height: "100px"
          }}
        />
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 500, height: 300, className: "sigCanvas" }}
          />
          <button onClick={save}>Save</button>
          <button onClick={clear}>Clear</button>
        </Box>
      </Modal>
    </div>
  );
}
