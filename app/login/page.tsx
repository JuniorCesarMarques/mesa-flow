import LoginForm from "@/components/LoginForm";
import { getSession } from "@/services/auth.service";
import { redirect } from "next/navigation";


export default async function LoginPage(){

  const session = await getSession();

  if(session) redirect("/painel");


  return(
    <LoginForm />
  )
}