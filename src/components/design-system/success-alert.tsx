import { InfoAlert, type InfoAlertProps } from "./info-alert";

type SuccessAlertProps = Omit<InfoAlertProps, "tone">;

export function SuccessAlert(props: SuccessAlertProps) {
  return <InfoAlert tone="success" {...props} />;
}
