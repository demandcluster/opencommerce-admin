import { FC, useEffect, useMemo, useState } from 'react'
import { Alert, AlertProps, IconButton, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import useUI from "../../hooks/useUI";

const GlobalAlerts: FC = () => {
  const { globalAlerts, removeGlobalAlert } = useUI();

  useEffect(() => {
    setActiveAlert(globalAlerts.length === 0 ? null : globalAlerts[globalAlerts.length - 1])
    setActiveAlertIndex(globalAlerts.length - 1)
  }, [globalAlerts])

  const [activeAlert, setActiveAlert] = useState<AlertProps | null>(globalAlerts.length === 0 ? null : globalAlerts[globalAlerts.length - 1]);
  const [activeAlertIndex, setActiveAlertIndex] = useState(globalAlerts.length - 1);

  if (!activeAlert) return null;

  const { children, sx, ...alertProps } = activeAlert;

  return (
    <Collapse in>
      <Alert
        severity='error'
        variant='filled'
        sx={{ borderRadius: 0 }}
        {...alertProps}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              removeGlobalAlert(activeAlertIndex)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {children}
        {globalAlerts.length - 1 > 1 && `${globalAlerts.length - 1 - activeAlertIndex}/${globalAlerts.length - 1}`}
      </Alert>
    </Collapse>
  )
}

export default GlobalAlerts