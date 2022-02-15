import {
  createContext,
  FC, ReactNode,
  useCallback,
  useMemo,
  useReducer
} from "react";
import {useMediaQuery, useTheme} from "@mui/material";

export interface State {
  isDetailDrawerOpen: boolean,
  isDetailDrawerOpening: boolean,
  isMobile: boolean,
  isTablet: boolean,
  isLaptop: boolean,
  isPrimarySidebarOpen: boolean,
  detailDrawerContent: ReactNode,
  closeDetailDrawer: () => void,
  closePrimarySidebar: () => void,
  openDetailDrawer: (children: ReactNode) => void,
  openPrimarySidebar: () => void,
  togglePrimarySidebar: () => void,
}

const initialState = {
  isDetailDrawerOpen: false,
  isDetailDrawerOpening: false,
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isPrimarySidebarOpen: false,
  detailDrawerContent: null
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
  }
}

export const UIProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, initialState as State)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

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
    (children: ReactNode) => dispatch({type: 'OPEN_DETAIL_DRAWER', payload: children}),
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
      isTablet,
      isLaptop,
      openPrimarySidebar,
      closePrimarySidebar,
      togglePrimarySidebar,
      openDetailDrawer,
      closeDetailDrawer
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
      togglePrimarySidebar
    ]
  )

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}
