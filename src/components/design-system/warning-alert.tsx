import { InfoAlert, type InfoAlertProps } from "./info-alert";

type WarningAlertProps = Omit<InfoAlertProps, "tone">;

export function WarningAlert(props: WarningAlertProps) {
  return <InfoAlert tone="warning" {...props} />;
}
