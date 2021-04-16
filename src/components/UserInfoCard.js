import profilePlaceholder from '../images/profile-placeholder.png';
import React, { useEffect } from "react";
import { Card, Spin, Collapse, Divider } from "antd";
import { useStore } from "../store/index";
import { getUserInfo, getUserPicture } from "../Api";
import { ACTIONS } from "../store/index";
import UploadPictureForm from "./UploadPictureForm";
import DeleteUserButton from "./DeleteUserButton";
import placeholder from "../images/Placeholder.png";
import UpdateUserForm from "./UpdateUserForm";

// import CollapsePanel from "antd/lib/collapse/CollapsePanel";

function UserInfoCard(props) {
  const {username, name, about, img} = useStore((state) => state.currentUser);
  const profilePagePicture = useStore((state) => state.profilePagePicture);
  const dispatch = useStore((state) => state.dispatch);

  useEffect(() => {
    getUserInfo(props.match.params.username).then((userData) => {
      dispatch({ type: ACTIONS.GET_USER_INFO, payload: userData });
    });
    // getUserPicture(props.match.params.username, Date.now()).then((data) => {
    //   console.log(data);
    //   if (data.status === 200) {
    //     dispatch({
    //       type: ACTIONS.GET_PROFILE_PICTURE,
    //       payload: data.url,
    //     });
    //   }
    //   if (data.status === 404) {
    //     dispatch({
    //       type: ACTIONS.ACTIONS.GET_PROFILE_PICTURE,
    //       payload: placeholder,
    //     });
    //   }
    // });
    return () => {
      dispatch({ type: ACTIONS.GET_PROFILE_PICTURE, payload: null });
      dispatch({ type: ACTIONS.GET_USER_INFO, payload: null });
    };
  }, [props.match.params.username]);

  return (
    <div className="userInfoCard">
      <Card
        style={{ width: "350px", background: 'var(--third-color)', border: 'transparent', margin: '10px auto' }}
        cover={<img alt="userAvatar" src={img||profilePlaceholder} />}
      >
        <Card.Meta
          title={username}
          description={name}
        />
        <p>{about || 'This User Hasn\'t Given Us Anything To Put Here!'}</p>
        {props.match.params.profile === username && (
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