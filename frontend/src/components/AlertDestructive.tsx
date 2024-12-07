import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertDestructiveParams {
  title: string;
  msg: string;
}

function AlertDestructive({ title, msg }: AlertDestructiveParams) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{msg}</AlertDescription>
    </Alert>
  );
}

export default AlertDestructive;
