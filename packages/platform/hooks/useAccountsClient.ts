import { useContext } from "react"
import { AuthGraphQLContext } from "../context/AuthGraphQLContext"

export default function useAccountsClient() {
    const context = useContext(AuthGraphQLContext)
  if (context === undefined) {
    throw new Error(`useAccountsClient must be used within a AuthGraphQLProvider`)
  }
  return context
};