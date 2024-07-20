import { withAuthRedirect } from '../hoc/withAuthRedirect'
import Music from './Music'

const authRedirectComponent = withAuthRedirect(Music)

export default authRedirectComponent
