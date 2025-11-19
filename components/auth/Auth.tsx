import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LoginForm } from "@/components/auth/Login";
import { SignupForm } from "@/components/auth/SignUp";

const Auth = () => {
  return (
    <div className="container md:w-full w-[90vw]">
      <Tabs defaultValue="login">
        <TabsList className="mx-auto">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm></LoginForm>
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm></SignupForm>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
