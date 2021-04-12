import "./UserInfoCard.scss";
import React, { useEffect } from "react";
import { Card, Spin, Collapse, Divider } from "antd";
// import { useStore } from "../../store/store";
// import { getUserInfo, getUserPicture } from "../../fetchRequests";
// import { GET_USER_INFO, GET_PROFILE_PICTURE } from "../store/store";
import UploadPictureForm from "./UploadPictureForm";
import DeleteUserButton from "./DeleteUserButton";
import placeholder from "../assets/images/Placeholder.png";
import UpdateUserForm from "./UpdateUserForm";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";

function UserInfoCard(props) {
  const userProfile = useStore((state) => state.userForProfile);
  const user = useStore((state) => state.user);
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
          title={userProfile ? userProfile.user.username : null}
          description={userProfile ? userProfile.user.displayName : null}
        />
        {userProfile ? (
          userProfile.user.about ? (
            <p>{userProfile.user.about}</p>
          ) : (
            <p>This User Hasn't Given Us Anything To Put Here!</p>
          )
        ) : null}
        {props.match.params.username === user.username && (
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