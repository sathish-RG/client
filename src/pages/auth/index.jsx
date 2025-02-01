
import Victory from "../../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
    <div className="h-[90vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-fit rounded-3xl grid xl:grid-cols-1">
      {/* Left Section */}
      <div className="flex flex-col gap-10 items-center justify-center p-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center">
            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
            <img src={Victory} alt="victory emoji" className="h-[100px]" />
          </div>
          <p className="font-medium">
            Fill in the details to get started with the best chat app!
          </p>
        </div>

        {/* Tabs Section */}
        <div className="flex items-center justify-center w-full">
          <Tabs className="w-full max-w-md" defaultValue="login">
            {/* Tabs List: Horizontal Tabs */}
            <TabsList className="flex justify-between bg-transparent w-full border-b">
              <TabsTrigger
                value="login"
                className="w-1/2 text-center py-3 border-b-2 data-[state=active]:border-purple-500 
            data-[state=active]:text-black text-gray-500 font-medium transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-1/2 text-center py-3 border-b-2 data-[state=active]:border-purple-500 
            data-[state=active]:text-black text-gray-500 font-medium transition-all"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content: Login and Signup Forms */}
            <TabsContent value="login" className="flex flex-col gap-4 mt-6">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-4 border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-4 border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="rounded-full py-3 px-6 mt-4"
                onClick={handleLogin}
              >
                Login
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="flex flex-col gap-4 mt-6">
              <Input
                placeholder="Email"
                type="email"
                className="rounded-full p-4 border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                className="rounded-full p-4 border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                className="rounded-full p-4 border-gray-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                className="rounded-full py-3 px-6 mt-4"
                onClick={handleSignup}
              >
                Signup
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Section: Background Image */}
      
    </div>
  </div>
);
}
export default Auth;
