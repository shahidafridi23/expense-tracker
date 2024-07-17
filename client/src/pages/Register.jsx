import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Logo from "@/components/ui/Logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterValidator } from "@/lib/validators/register";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/passwordInput";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const registerUser = async (newUser) => {
  const response = await axios.post("/auth/register", newUser);
  return response.data;
};

const Register = () => {
  const { user, setUser } = useContext(UserContext);
  if (user) {
    console.log("fromRegister", user);
    return <Navigate to={"/"} />;
  }

  const form = useForm({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({ mutationFn: registerUser });

  const onSubmit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        setUser(data);
        toast("Registered Successfully!", {
          description: "Explore the expense tracker.",
        });
        console.log("User registered successfully:", data);
      },
      onError: (error) => {
        toast(error?.response.data.msg, {
          description: "Try with other Email Address..",
        });
        console.error("Error registering user:", error);
      },
    });
  };

  return (
    <MaxWidthWrapper className={"flex items-center justify-center"}>
      <div className="w-screen  flex flex-col items-center justify-center text-center py-10 px-5 sm:p-20">
        <Logo />
        <p className="mt-2 text-2xl font-thin">
          Create your account to track your expenses
        </p>

        <div className="p-5 rounded-md md:p-8 m-5 w-full sm:max-w-sm shadow-md  text-left ">
          <h2 className="text-center text-2xl font-semibold">Register</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jhondoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={"w-full"}>
                {isPending ? "Creating..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="mb-6">
          <span className="text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#7c3aed] underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Register;
