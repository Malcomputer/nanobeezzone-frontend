// import "./DeleteUsersButton.scss";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useStore, LOGOUT } from "../store/index";
import { deleteUser } from "../Api";

function DeleteUserButton(props) {
  const user = useStore((state) => state.user);
  const dispatch = useStore((state) => state.dispatch);
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setShowModal(true);
  }

  function handleDelete() {
    deleteUser(user.token, user.username).then((data) => {
      console.log(data);
      setShowModal(false)
      dispatch({type: LOGOUT})
      props.history.push("/")
    });
  }

  return (
    <div className="deleteUserWrapper">
      <Button type="primary" danger onClick={(event) => handleClick()}>
        Delete User Account
      </Button>
      <Modal
        visible={showModal}
        onOk={handleDelete}
        onCancel={(event) => setShowModal(false)}
        footer={[
          <Button onClick={(event) => setShowModal(false)}>
            On Second Thought...
          </Button>,
          <Button type="primary" danger onClick={(event) => handleDelete()}>
            Yes, I'm Sure
          </Button>,
        ]}
      >
        Are You Sure You Wish To Delete This Account? All Information, Likes,
        and Posts Will Be Lost.
      </Modal>
    </div>
  );
}

export default DeleteUserButton;