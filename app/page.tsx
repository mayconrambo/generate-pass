"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Clipboard } from "lucide-react";
import { toast } from "sonner"

const generatePassword = (length: number, options: { numbers: boolean; symbols: boolean; uppercase: boolean }) => {
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+{}[]<>";

  let charSet = lowerChars;
  if (options.uppercase) charSet += upperChars;
  if (options.numbers) charSet += numberChars;
  if (options.symbols) charSet += symbolChars;

  return Array.from({ length }, () => charSet[Math.floor(Math.random() * charSet.length)]).join("");
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({ numbers: true, symbols: true, uppercase: true });
  const [password, setPassword] = useState("");

  const handleGenerate = () => {
    setPassword(generatePassword(length, options));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast("A senha foi copiada com sucesso!", {
      duration: 2000,
      position: "top-center",
      action: {
        label: "Fechar",
        onClick: () => {},
      },
    });
  setPassword("");
};

return (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <Card className="w-96 p-6 shadow-lg">
      <CardHeader>
        <CardTitle>Gerador de Senhas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input type="text" value={password} readOnly className="w-full" />
          <Button onClick={copyToClipboard} disabled={!password}>
            <Clipboard size={18} />
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <label className="flex justify-between items-center">
            Comprimento: {length}
            <Input
              type="range"
              min={6}
              max={24}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </label>
          <label className="flex justify-between items-center">
            Números
            <Switch checked={options.numbers} onCheckedChange={() => setOptions((o) => ({ ...o, numbers: !o.numbers }))} />
          </label>
          <label className="flex justify-between items-center">
            Símbolos
            <Switch checked={options.symbols} onCheckedChange={() => setOptions((o) => ({ ...o, symbols: !o.symbols }))} />
          </label>
          <label className="flex justify-between items-center">
            Maiúsculas
            <Switch checked={options.uppercase} onCheckedChange={() => setOptions((o) => ({ ...o, uppercase: !o.uppercase }))} />
          </label>
        </div>
        <Button className="w-full mt-4" onClick={handleGenerate}>Gerar Senha</Button>
      </CardContent>
    </Card>
  </div>
);
}
