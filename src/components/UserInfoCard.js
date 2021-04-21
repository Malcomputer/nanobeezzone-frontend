import profilePlaceholder from '../images/profile-placeholder.png';
import React, {useEffect, useState} from "react";
import { Card, Spin, Collapse, Divider } from "antd";
import { useStore } from "../store/index";
import {getUser, getUserInfo, getUserPicture} from "../Api";
import { ACTIONS } from "../store/index";
import UploadPictureForm from "./UploadPictureForm";
import DeleteUserButton from "./DeleteUserButton";
import UpdateUserForm from "./UpdateUserForm";
import Header from "./Header";

// import CollapsePanel from "antd/lib/collapse/CollapsePanel";

function UserInfoCard(props) {
  const currentUser = useStore((state) => state.currentUser);
  const [{username, name, about, img, error}, setState] = useState(currentUser);
  useEffect(() => {
    if (props.match.params.profile !== currentUser.username) getUser(props.match.params.profile).then(setState);
  }, [props.match.params.profile]);
  return (
    <>
      <Header title="Profile" />
      <div className="userInfoCard">
        <Card
          style={{ width: "350px", background: 'var(--third-color)', border: 'transparent', margin: '10px auto' }}
          cover={<img alt="userAvatar" src={img||profilePlaceholder} />}
        >
          <Card.Meta
            title={username}
            description={name}
          />
          {error?.status === 404 ?<p style={{textAlign: 'center'}}>This user does not exist</p> : <p style={{textAlign: 'center'}}>{about || 'This User Hasn\'t Given Us Anything To Put Here!'}</p>}
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
    </>
  );
}

export default UserInfoCard;