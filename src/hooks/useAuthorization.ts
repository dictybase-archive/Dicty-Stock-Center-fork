import { useAuthStore } from "components/authentication/AuthStore"
import { dsccontent, MAIN_RESOURCE } from "constants/resources"
import jwtDecode from "jwt-decode"

type RoleItem = {
  id: string
  role: string
  permissions: Array<PermItem>
}

type PermItem = {
  id: string
  permission: string
  resource: string
  description?: string
}

const verifyToken = (token: string) => {
  if (token === "") {
    return false
  }
  const decodedToken = jwtDecode(token)
  // get current time in plain UTC
  const currentTime = Date.now().valueOf() / 1000
  // check if current time is less than token expiration date
  // @ts-ignore
  if (currentTime < decodedToken.exp) {
    return true
  }
  return false
}

const verifyPermissions = (
  permissions: Array<PermItem>,
  perm: string,
  resource: string,
) => {
  const allowedResources = [resource, MAIN_RESOURCE]
  const validPerms = (item: PermItem) =>
    item.permission === "admin" ||
    (item.permission === perm && allowedResources.includes(item.resource))
  const filteredPerms = permissions.filter(validPerms)
  // check if array is empty
  if (!Array.isArray(filteredPerms) || !filteredPerms.length) {
    return false
  }
  // valid permission found, return true
  return true
}

/**
 * useAuthorization is used to handle user authorization checks.
 */

const useAuthorization = () => {
  const [state] = useAuthStore()
  let canEditPages = false

  if (state.user.id) {
    if (state.user.roles.length) {
      const roles = state.user.roles.map((item: RoleItem) => item.role)
      if (roles.includes("superuser")) {
        canEditPages = true
      }
      // need to flatten since it initially comes back as nested array
      const permissions = state.user.roles
        .map((item: RoleItem) => item.permissions)
        .flat()
      canEditPages = verifyPermissions(permissions, "write", dsccontent)
    }
  }

  const verifiedToken = verifyToken(state.token)
  return { user: state.user, canEditPages, verifiedToken }
}

export default useAuthorization
