import { requireUnauth } from "@/lib/auth-utils";
import RegisterUI from "@/feature/auth/component/RegisterUI"

const Register = async () => {

  await requireUnauth();

  return (
    <RegisterUI />
  )
}

export default Register