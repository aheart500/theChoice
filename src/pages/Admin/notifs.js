import { store } from "react-notifications-component";
export const AddedQuestionNotif = () =>
  store.addNotification({
    title: "Question Added!",
    message: "The new question is added successfully",
    type: "success",
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
export const RemovedQuestionNotif = () =>
  store.addNotification({
    title: "Question Removed!",
    message: "The question is removed successfully",
    type: "success",
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
