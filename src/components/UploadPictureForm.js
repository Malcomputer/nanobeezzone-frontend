import "./UploadPictureForm.scss";
import React, { useState } from "react";
import { Input } from "antd";
import { useStore, GET_PROFILE_PICTURE } from "../../store/store";
// import { putUserPicture, getUserPicture } from "../../fetchRequests";

function UploadPictureFom(props) {
  const user = useStore((state) => state.user);
  const profilePagePicture = useStore((state) => state.profilePagePicture);
  const dispatch = useStore((state) => state.dispatch);

  const [imageFile, setImageFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (imageFile) {
      putUserPicture(user.token, user.username, imageFile).then((data) => {
        if (data.statusCode === 200) {
          getUserPicture(props.match.params.username, Date.now()).then(
            (data) => {
              dispatch({
                type: GET_PROFILE_PICTURE,
                payload: data.url,
              });
            }
          );
        }
      });
    }
  }

  return (
    <div className="uploadPictureFormDiv">
      <form
        className="uploadForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <Input
          type="file"
          name="imageInput"
          accept="image/jpeg, image/gif, image/png"
          onChange={(event) => setImageFile(event.target.files[0])}
          required
        />

        <button>Upload Image</button>
      </form>
    </div>
  );
}

export default UploadPictureFom;