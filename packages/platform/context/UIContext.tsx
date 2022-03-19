import {
  createContext,
  FC, ReactNode,
  useCallback,
  useMemo,
  useReducer
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { AlertProps } from "@mui/material";

import Dialog, { DialogProps } from "../components/common/Dialog";

export interface State {
  isDetailDrawerOpen: boolean,
  isDetailDrawerOpening: boolean,
  isMobile: boolean,
  isTablet: boolean,
  isLaptop: boolean,
  isPrimarySidebarOpen: boolean,
  detailDrawerContent: ReactNode,
  globalAlerts: AlertProps[],
  dialog?: DialogProps,
  openDialog: (props: DialogProps) => void,
  closeDetailDrawer: () => void,
  closePrimarySidebar: () => void,
  openDetailDrawer: (children: ReactNode) => void,
  openPrimarySidebar: () => void,
  togglePrimarySidebar: () => void,
  enqueueGlobalAlert: (props: AlertProps) => void,
  removeGlobalAlert: (index: number) => void
}

const initialState = {
  isDetailDrawerOpen: false,
  isDetailDrawerOpening: false,
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isPrimarySidebarOpen: false,
  detailDrawerContent: null,
  globalAlerts: [] as AlertProps[]
}

type Action =
  | {
    type: 'OPEN_PRIMARY_SIDEBAR'
  }
  | {
    type: 'CLOSE_PRIMARY_SIDEBAR'
  }
  | {
    type: 'OPEN_DETAIL_DRAWER',
    payload: ReactNode
  }
  | {
    type: 'CLOSE_DETAIL_DRAWER'
  }
  | {
    type: 'ENQUEUE_GLOBAL_ALERT'
    payload: AlertProps
  }
  | {
    type: 'REMOVE_GLOBAL_ALERT'
    payload: number
  }
  | {
    type: 'CLOSE_DIALOG'
  }
  | {
    type: 'OPEN_DIALOG',
    payload: DialogProps
  }

export const UIContext = createContext<State>({} as State)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_PRIMARY_SIDEBAR': {
      return {
        ...state,
        isPrimarySidebarOpen: true,
      }
    }
    case 'CLOSE_PRIMARY_SIDEBAR': {
      return {
        ...state,
        isPrimarySidebarOpen: false,
      }
    }
    case 'OPEN_DETAIL_DRAWER': {
      return {
        ...state,
        isDetailDrawerOpen: true,
        isDetailDrawerOpening: true,
        detailDrawerContent: action.payload
      }
    }
    case 'CLOSE_DETAIL_DRAWER': {
      return {
        ...state,
        isDetailDrawerOpen: false,
        detailDrawerContent: null
      }
    }
    case 'ENQUEUE_GLOBAL_ALERT': {
      return {
        ...state,
        globalAlerts: [
          ...state.globalAlerts,
          action.payload
        ]
      }
    }
    case 'REMOVE_GLOBAL_ALERT': {
      return {
        ...state,
        globalAlerts: state.globalAlerts.filter((_, index) => index !== action.payload)
      }
    }
    case 'CLOSE_DIALOG': {
      return {
        ...state,
        dialog: undefined
      }
    }
    case 'OPEN_DIALOG': {
      return {
        ...state,
        dialog: action.payload
      }
    }
  }
}

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState as State)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  const openPrimarySidebar = useCallback(
    () => dispatch({ type: 'OPEN_PRIMARY_SIDEBAR' }),
    [dispatch]
  )
  const closePrimarySidebar = useCallback(
    () => dispatch({ type: 'CLOSE_PRIMARY_SIDEBAR' }),
    [dispatch]
  )
  const togglePrimarySidebar = useCallback(
    () =>
      state.isPrimarySidebarOpen
        ? dispatch({ type: 'CLOSE_PRIMARY_SIDEBAR' })
        : dispatch({ type: 'OPEN_PRIMARY_SIDEBAR' }),
    [dispatch, state.isPrimarySidebarOpen]
  )

  const openDetailDrawer = useCallback(
    (children: ReactNode) => dispatch({ type: 'OPEN_DETAIL_DRAWER', payload: children }),
    [dispatch]
  )
  const closeDetailDrawer = useCallback(
    () => dispatch({ type: 'CLOSE_DETAIL_DRAWER' }),
    [dispatch]
  )

  const enqueueGlobalAlert = useCallback(
    (props: AlertProps) => {
      dispatch({ type: 'ENQUEUE_GLOBAL_ALERT', payload: props })
    },
    [dispatch],
  )

  const removeGlobalAlert = useCallback(
    (index: number) => {
      dispatch({ type: 'REMOVE_GLOBAL_ALERT', payload: index })
    },
    [dispatch],
  )

  const openDialog = useCallback(
    (dialogProps: DialogProps) =>
      dispatch({ type: 'OPEN_DIALOG', payload: dialogProps })
    , [dispatch])

  const closeDialog = useCallback(
    () => dispatch({ type: 'CLOSE_DIALOG' })
    , [dispatch])

  const value = useMemo(
    () => ({
      ...state,
      isMobile,
      isTablet,
      isLaptop,
      openPrimarySidebar,
      closePrimarySidebar,
      togglePrimarySidebar,
      openDetailDrawer,
      closeDetailDrawer,
      enqueueGlobalAlert,
      removeGlobalAlert,
      closeDialog,
      openDialog
    }),
    [
      isMobile,
      isTablet,
      isLaptop,
      closeDetailDrawer,
      closePrimarySidebar,
      openDetailDrawer,
      openPrimarySidebar,
      state,
      togglePrimarySidebar,
      enqueueGlobalAlert,
      removeGlobalAlert,
      closeDialog,
      openDialog
    ]
  )

  return (
    <UIContext.Provider value={value}>
      {children}
      {state.dialog && (
        <Dialog
          {...state.dialog}
          onClose={closeDialog}
        />
      )}
    </UIContext.Provider>
  )
}
