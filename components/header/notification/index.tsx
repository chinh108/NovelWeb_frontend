import React, { Dispatch, useEffect } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Bell } from "react-feather";
import { Action } from "../../../types";
import { Payload } from "../../../types/action";
import { connect } from "react-redux";
import { cleanHtml } from "../../../shared/utils";
import { getNotification } from "../../../redux/actions/notificationActions";

const Notification = (pops: any) => {
  const { getNotification, currentUser, notifications = [] } = pops;

  const getComments = (key: string, id: string) => {
    getNotification();
  };

  useEffect(() => {
    getComments("createBy._id", currentUser?.id);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id]);

  return (
    <UncontrolledDropdown inNavbar nav>
      <DropdownToggle caret nav>
        <Bell size={23} />
      </DropdownToggle>
      <DropdownMenu end>
        {notifications.map((comment: any) => (
          <DropdownItem key={comment.id} href={comment.url}>
            {cleanHtml(comment.content)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getNotification: (payload: Payload) => dispatch(getNotification(payload)),
});

const mapStateToProps = (state: any) => {
  const { user } = state.authReducer;
  const { notifications, isLoading } = state.notificationReducer;
  return { currentUser: user, notifications, isLoading };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Notification);
