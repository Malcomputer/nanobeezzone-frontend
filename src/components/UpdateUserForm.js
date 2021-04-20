import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useStore, ACTIONS } from "../store/index";
import { getUserInfo, updateRequest } from "../Api";

function UpdateUserForm(props) {
  const [password, setPassword] = useState({ password: "" });
  const [about, setAbout] = useState({ about: "" });
  const [displayName, setDisplayName] = useState({ displayName: "" });

  const dispatch = useStore((state) => state.dispatch);
  const user = useStore((state) => state.user);

  // const [formData, setFormData] = useState({
  //   password: "",
  //   about: "",
  //   displayName: "",
  // });

  const handleUpdate = (event) => {
    //event.preventDefault();
    let newUserInfo = {};
    if (password.password.length > 3) {
      newUserInfo = Object.assign(newUserInfo, password);
    }
    if (about.about.length > 1) {
      newUserInfo = Object.assign(newUserInfo, about);
    }
    if (displayName.displayName.length > 3) {
      newUserInfo = Object.assign(newUserInfo, displayName);
    }

    console.log(newUserInfo);
    updateRequest(user.token, user.username, newUserInfo).then((data) => {
      console.log(data);
      if (data.status === 200) {
        getUserInfo(user.username).then((data) =>
          dispatch({
            type: ACTIONS.GET_USER_INFO,
            payload: data,
          })
        );
      }
    });
  };

  //   const handleChange = (e) => {
  //     const inputName = e.target.name;
  //     const inputValue = e.target.value;
  //     setFormData((state) => ({ ...state, [inputName]: inputValue }));
  //   };

  return (
    <div className="UpdateForm">
      <Form className="UpdateForm" onFinish={(event) => handleUpdate(event)}>
        <Form.Item
          label="password"
          //rules={}
        >
          <Input.Password
            name={"password"}
            onChange={(event) => setPassword({ password: event.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="about"
          //rules={}
        >
          <Input
            name={"about"}
            onChange={(event) => setAbout({ about: event.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="displayName"
          // rules={}
        >
          <Input
            name={"displayName"}
            onChange={(event) =>
              setDisplayName({ displayName: event.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button id="SubmitButton" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UpdateUserForm;
