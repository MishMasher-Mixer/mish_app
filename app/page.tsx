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

  // if (isAuthenticated) {
  //   return (
  //     <section className="py-6">
  //       <div className="container flex flex-col gap-6">

  //         <div className="rounded-xl p-6 bg-background-subtle space-y-6">

  //           <div className="flex items-center gap-2">

  //             <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
  //               <span className="text-white leading-none text-sm">
  //                 +
  //               </span>
  //             </div>
  //             <h2 className="uppercase font-medium text-xl">
  //               New deposit
  //             </h2>
  //           </div>

  //           <CreateDeposit />
  //         </div>
  //       </div>
  //     </section>
  //   )
  // }

  return (
    <section className="py-16">
      <div className="container flex flex-col gap-8">

        <div className="rounded-xl flex flex-col w-full">

          <div className="flex items-center gap-2.5 px-6 py-6 bg-background-subtle rounded-t-xl">

            <div className="w-[26px] h-[26px] rounded-full bg-primary flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 0V6.5M6.5 13V6.5M6.5 6.5H0M6.5 6.5H13" stroke="white" strokeWidth="2" />
              </svg>

            </div>
            <h2 className="font-medium text-2xl">
              Make a Deposit
            </h2>
          </div>

          {!isAuthenticated &&
            <div className="grid grid-cols-2">
              <button className={`border border-muted h-[72px] flex items-center justify-center gap-2 font-medium font-mono uppercase text-sm hover:bg-muted/80 ${!mode ? "bg-muted" : mode === "with_account" ? "bg-background-subtle" : "bg-muted"} ${!mode ? "border-r-black/10" : "border-r-muted"}`}
                onClick={() => setMode(mode === "with_account" ? null : "with_account")}
              >
                {mode === "with_account" && <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3.5" cy="3.5" r="3.5" fill="#27282B" />
                </svg>}

                deposit with account
              </button>

              <button className={`border border-l-0 border-muted h-[72px] flex items-center justify-center gap-2 font-medium font-mono uppercase text-sm hover:bg-muted/80 ${!mode ? "bg-muted" : mode === "without_account" ? "bg-background-subtle" : "bg-muted"}`}
                onClick={() => setMode(mode === "without_account" ? null : "without_account")}
              >

                {mode === "without_account" && <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3.5" cy="3.5" r="3.5" fill="#27282B" />
                </svg>}

                deposit without account
              </button>
            </div>
          }

          {mode === "with_account" && <GenerateKeys />}

          {(mode === "without_account" || isAuthenticated) && <CreateDeposit />}

          <div className="px-6 py-6 bg-background-strong rounded-b-xl">
            <p className="text-white leading-[24px]">
              Note: Using Deposit with Account generates site-only credentials (PubKey/PrivKey) so you can log in later and view your deposit history. With Deposit without Account, no history is stored — you must record your Withdraw Key yourself to retrieve past deposits on this site.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className='w-full bg-background-subtle rounded-md space-y-4'>

            <div className="p-6 border-b border-black/10 min-h-[115px]">
              <h3 className='capitalize text-[22px]'>
                Latest deposits
              </h3>

              <p className='text-sm text-foreground-subtle mt-3'>
                Deposits from which your withdrawal will potentially originate.
              </p>
            </div>

            <div className="pb-3">
              <RecentDataTable
                id="left-table"
                startValue={7526}
                firstDelay={30 * 1000}
                secondDelay={3 * 60 * 1000}
              />
            </div>
          </div>

          <div className='w-full bg-background-subtle rounded-md space-y-4'>

            <div className="p-6 border-b border-black/10 min-h-[115px]">
              <h3 className='capitalize text-[22px]'>
                Latest Withdraws
              </h3>

              <p className='text-sm text-foreground-subtle mt-3'>
                Users which already withdrawed their deposits.
              </p>
            </div>

            <div className="pb-3">
              <RecentDataTable
                id="right-table"
                startValue={7498}
                firstDelay={5 * 60 * 1000}
                secondDelay={25 * 60 * 1000}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
