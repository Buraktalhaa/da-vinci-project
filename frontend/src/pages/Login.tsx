import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Mail, Lock } from "lucide-react";
import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

export default function Login() {
  const [email, setEmail] = useState("da-vinci@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "da-vinci@example.com" && password === "password") {
      localStorage.setItem("token", "demo-token");
      navigate("/");
    } else {
      setError("Incorrect email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-300 px-4">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-2 text-center text-sky-700">
          Sign In
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Welcome to Da Vinci Project! Please enter your credentials to continue.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label className="mb-2 block text-left">
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="da-vinci@example.com"
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-left">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                className="pl-10"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" variant={"default"}>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
