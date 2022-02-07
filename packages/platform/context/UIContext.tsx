import {
  createContext,
  FC,
  useCallback,
  useMemo,
  useReducer
} from "react";
import {Theme, useMediaQuery} from "@mui/material";

export interface State {
  isDetailDrawerOpen: boolean
  isMobile: boolean
  isPrimarySidebarOpen: boolean
  closeDetailDrawer: () => void,
  closePrimarySidebar: () => void,
  openDetailDrawer: () => void,
  openPrimarySidebar: () => void,
  togglePrimarySidebar: () => void
}

const initialState = {
  isDetailDrawerOpen: false,
  isMobile: false,
  isPrimarySidebarOpen: false
}

type Action =
  | {
  type: 'OPEN_PRIMARY_SIDEBAR'
}
  | {
  type: 'CLOSE_PRIMARY_SIDEBAR'
}
  | {
  type: 'OPEN_DETAIL_DRAWER'
}
  | {
  type: 'CLOSE_DETAIL_DRAWER'
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
      }
    }
    case 'CLOSE_DETAIL_DRAWER': {
      return {
        ...state,
        isDetailDrawerOpen: false,
      }
    }
  }
}

export const UIProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState as State)
  // const isMobile = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));
  const isMobile = false;

  const openPrimarySidebar = useCallback(
    () => dispatch({type: 'OPEN_PRIMARY_SIDEBAR'}),
    [dispatch]
  )
  const closePrimarySidebar = useCallback(
    () => dispatch({type: 'CLOSE_PRIMARY_SIDEBAR'}),
    [dispatch]
  )
  const togglePrimarySidebar = useCallback(
    () =>
      state.isPrimarySidebarOpen
        ? dispatch({type: 'CLOSE_PRIMARY_SIDEBAR'})
        : dispatch({type: 'OPEN_PRIMARY_SIDEBAR'}),
    [dispatch, state.isPrimarySidebarOpen]
  )

  const openDetailDrawer = useCallback(
    () => dispatch({type: 'OPEN_DETAIL_DRAWER'}),
    [dispatch]
  )
  const closeDetailDrawer = useCallback(
    () => dispatch({type: 'CLOSE_DETAIL_DRAWER'}),
    [dispatch]
  )

  const value = useMemo(
    () => ({
      ...state,
      isMobile,
      openPrimarySidebar,
      closePrimarySidebar,
      togglePrimarySidebar,
      openDetailDrawer,
      closeDetailDrawer
    }),
    [
      isMobile,
      closeDetailDrawer,
      closePrimarySidebar,
      openDetailDrawer,
      openPrimarySidebar,
      state,
      togglePrimarySidebar
    ]
  )

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}
