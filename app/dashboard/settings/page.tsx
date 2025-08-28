import { Separator } from "@/components/ui/separator";
import { Settings } from "./_components/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserWallet from "./_components/user-wallet";
import { getUserWallets } from "./action";

export default async function SettingsPage() {
  const wallets = await getUserWallets();

  return (
    <section>
      <div className="flex flex-col  w-full p-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Deposit Funds
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please select a plan to deposit funds into your account.
        </p>
      </div>

      <div className="p-4 max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <UserWallet wallets={wallets} />
          </CardContent>
        </Card>
        <Separator className="my-4" />
        <Settings />
      </div>
    </section>
  );
}
