// import "./UserInfoCard.scss";
import React, { useEffect } from "react";
import { Card, Spin, Collapse, Divider } from "antd";
import { useStore } from "../store/index";
import { getUserInfo, getUserPicture } from "../Api";
import { GET_USER_INFO, GET_PROFILE_PICTURE } from "../store/index";
import UploadPictureForm from "./UploadPictureForm";
import DeleteUserButton from "./DeleteUserButton";
import placeholder from "../images/Placeholder.png";
import UpdateUserForm from "./UpdateUserForm";

// import CollapsePanel from "antd/lib/collapse/CollapsePanel";

function UserInfoCard(props) {
  const currentUser = useStore((state) => state.currentUser);
  const profilePagePicture = useStore((state) => state.profilePagePicture);
  const dispatch = useStore((state) => state.dispatch);

  useEffect(() => {
    getUserInfo(props.match.params.username).then((userData) => {
      dispatch({ type: GET_USER_INFO, payload: userData });
    });
    getUserPicture(props.match.params.username, Date.now()).then((data) => {
      console.log(data);
      if (data.status === 200) {
        dispatch({
          type: GET_PROFILE_PICTURE,
          payload: data.url,
        });
      }
      if (data.status === 404) {
        dispatch({
          type: GET_PROFILE_PICTURE,
          payload: placeholder,
        });
      }
    });
    return () => {
      dispatch({ type: GET_PROFILE_PICTURE, payload: null });
      dispatch({ type: GET_USER_INFO, payload: null });
    };
  }, [props.match.params.username]);

  return (
    <div className="userInfoCard">
      <Card
        hoverable
        style={{ width: "350px" }}
        cover={
          profilePagePicture ? (
            <img alt="userAvatar" src={profilePagePicture} />
          ) : (
            <div className="spinnerContainer">
              <Spin tip="Loading Avatar..." className="spinner" size="large" />
            </div>
          )
        }
      >
        <Card.Meta
          title={currentUser ? currentUser.username : null}
          description={currentUser ? currentUser.name : null}
        />
        {currentUser ? (
          currentUser.about ? (
            <p>{currentUser.about}</p>
          ) : (
            <p>This User Hasn't Given Us Anything To Put Here!</p>
          )
        ) : null}
        {props.match.params.profile === currentUser.username && (
          <>
            <Divider orientation="left">User Settings</Divider>
            <Collapse>
              <Collapse.Panel header="Upload or Change Profile Image" key="1">
                <UploadPictureForm {...props} />
              </Collapse.Panel>
              <Collapse.Panel header="Update User Info" key="2">
                <UpdateUserForm {...props} />
              </Collapse.Panel>
              <Collapse.Panel header="Delete User Account" key="3">
                <DeleteUserButton {...props} />
              </Collapse.Panel>
            </Collapse>
          </>
        )}
      </Card>
    </div>
  );
}

export default UserInfoCard;