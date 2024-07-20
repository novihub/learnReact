import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Settings from './Settings'

const authRedirectComponent = withAuthRedirect(Settings)

export default authRedirectComponent
