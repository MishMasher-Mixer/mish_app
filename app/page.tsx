"use client"

import { useAuth } from "@/auth/AuthContext";
import CreateDeposit from "@/components/deposit/CreateDeposit";
import GenerateKeys from "@/components/deposit/GenerateKeys";
import RecentDataTable from "@/components/deposit/RecentDataTable";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {

  const [mode, setMode] = useState<"with_account" | "without_account" | null>(null)

  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <section className="py-6">
        <div className="container flex flex-col gap-6">

          <div className="rounded-xl p-6 bg-background-subtle space-y-6">

            <div className="flex items-center gap-2">

              <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <span className="text-white leading-none text-sm">
                  +
                </span>
              </div>
              <h2 className="uppercase font-medium text-xl">
                New deposit
              </h2>
            </div>

            <CreateDeposit />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6">
      <div className="container flex flex-col gap-6">

        <div className="rounded-xl p-6 bg-background-subtle space-y-6">

          <div className="flex items-center gap-2">

            <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
              <span className="text-white leading-none text-sm">
                +
              </span>
            </div>
            <h2 className="uppercase font-medium text-xl">
              Make a Deposit
            </h2>
          </div>

          <div className="flex items-center gap-4 mt-10">
            {(!mode || mode === "with_account") && <Button variant={"secondary"} className="rounded-full cursor-pointer" onClick={() => setMode(mode === "with_account" ? null : "with_account")}>
              Deposit with account
            </Button>}

            {(!mode || mode === "without_account") && <Button variant={"secondary"} className="bg-muted text-foreground cursor-pointer hover:bg-muted/50" onClick={() => setMode(mode === "without_account" ? null : "without_account")}>
              Deposit without account
            </Button>}
          </div>

          {mode === "with_account" && <GenerateKeys />}

          {mode === "without_account" && <CreateDeposit />
          }
        </div>

        <div className="rounded-xl p-6 bg-background-strong">
          <p className="text-white leading-[1.6]">
            <span className="text-accent font-bold">Note:</span> Using Deposit with Account generates site-only credentials (PubKey/PrivKey) so you can log in later and view your deposit history. With Deposit without Account, no history is stored — you must record your Withdraw Key yourself to retrieve past deposits on this site.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className='w-full p-4 bg-background-subtle rounded-md space-y-4'>
            <h3 className='uppercase text-xl font-medium'>
              Latest deposits
            </h3>

            <p className='mt-4 leading-[1.6]'>
              Deposits from which your withdrawal will potentially originate.
            </p>

            <RecentDataTable
              id="left-table"
              startValue={7526}
              firstDelay={30 * 1000}
              secondDelay={3 * 60 * 1000}
            />
          </div>

          <div className='w-full p-4 bg-background-subtle rounded-md space-y-4'>
            <h3 className='uppercase text-xl font-medium'>
              Latest Withdraws
            </h3>

            <p className='mt-4 leading-[1.6]'>
              Users which already withdrawed their deposits.
            </p>

            <RecentDataTable
              id="right-table"
              startValue={7498}
              firstDelay={5 * 60 * 1000}
              secondDelay={25 * 60 * 1000}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
