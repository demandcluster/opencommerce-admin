import { FC, ReactNode, useState } from "react";
import DialogTitle from '@mui/material/DialogTitle';
import { default as MuiDialog } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';

export type DialogProps = {
  title: string,
  content?: string | ReactNode
  closeTitle?: string
} & ({
  onConfirm: () => void | Promise<void>,
  confirmTitle: string,
  confirmLoading?: boolean,
  autocloseOnConfirm?: boolean,
  confirmColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
} | {
  onConfirm: undefined,
  confirmTitle: undefined,
  confirmColor: undefined,
  confirmLoading: undefined,
  autoclose: undefined
})

const Dialog: FC<DialogProps & { onClose: () => void }> = ({
  title,
  content,
  closeTitle = "Cancel",
  onConfirm,
  confirmTitle,
  confirmLoading = false,
  confirmColor = "error",
  // @ts-ignore
  autocloseOnConfirm = true,
  onClose
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  return (
    <MuiDialog open={true}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>{closeTitle}</Button>
        {onConfirm && (
          <LoadingButton
            loading={confirmLoading || internalLoading}
            onClick={async () => {
              setInternalLoading(true);
              await onConfirm();
              setInternalLoading(false);
              autocloseOnConfirm && onClose();
            }}
            disableElevation
            autoFocus
            variant="contained"
            color={confirmColor}>
            {confirmTitle}
          </LoadingButton>
        )}
      </DialogActions>
    </MuiDialog>
  )
}

export default Dialog;
