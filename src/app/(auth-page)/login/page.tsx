import LoginUI from "@/feature/auth/component/LoginUI"
import { requireUnauth } from "@/lib/auth-utils";

const Register = async () => {

  await requireUnauth();

  return (
    <LoginUI />
  )
}

export default Register