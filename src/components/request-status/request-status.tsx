import { FC } from "react";
import { RequestState } from "../../types/application-types/request-state";
import { Modal } from "../modal/modal";
import { MyNotification } from "../my-notification/my-notification";
import styles from "./request-status.module.scss";

type RequestStatusPropTypes = {
  state: RequestState;
  errorMessage?: string;
  successMessage?: string;
};

export const RequestStatus: FC<RequestStatusPropTypes> = ({
  state,
  errorMessage = "",
  successMessage = "",
}) => {
  return (
    <>
      {state === "init" && <></>}
      {state === "pending" && (
        <Modal title="" closeModal={() => {}} hideClose={true}>
          <div className={`${styles.loading}`} data-cy="loading">
            <p className="text text_type_main-medium p-15">Загрузка...</p>
          </div>
        </Modal>
      )}
      {state === "error" && errorMessage !== "" && (
        <MyNotification success={false} message={errorMessage} />
      )}
      {state === "success" && successMessage !== "" && (
        <MyNotification success={true} message={successMessage} />
      )}
    </>
  );
};
