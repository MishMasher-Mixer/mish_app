import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="pt-30 pb-20">
        <div className="container">
          <div className='bg-background-subtle px-8 sm:px-12 py-10 min-h-[400px] rounded-b-[12px] rounded-t-[12px] flex flex-col gap-8 relative overflow-hidden'>

            <div className="bg-primary py-3 px-4.5 rounded-[12px] w-min  flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>

              <p className="font-mono text-sm tracking-[1px] text-primary-foreground whitespace-pre-wrap md:whitespace-nowrap">
                MISHMASH: GET STARTED WITH REWARDS TODAY
              </p>
            </div>

            <h1 className="text-[55px] leading-[55px] max-w-[450px] z-10">
              Enabling Compliant
              Onchain Privacy
            </h1>

            <p className="leading-[24px] max-w-[324px] mt-6 z-10">
              Use and build apps that leverage Bitcoin as a
              secure base layer.
            </p>

            <div className="flex gap-4 mt-6 mb-72 md:mb-4 z-10">
              <Button variant={"secondary"} size={"lg"} className="rounded-full">
                get started
              </Button>

              <Button size={"lg"} className="bg-muted text-muted-foreground hover:bg-muted/50">
                learn more
                <ArrowRight />
              </Button>
            </div>

            <img src="/assets/images/hero-shape.svg" alt="" className="absolute top-0 right-0 z-0 hidden md:block" />

            <img src="/assets/images/hero-bg.svg" alt="" className="absolute bottom-0 right-0 z-0" />

          </div>
        </div>
      </section>

      <section className="pt-20 pb-30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4">

            <div className="w-full bg-background-strong p-8 col-span-1 md:col-span-4 rounded-[12px] space-y-12">
              <h2 className="text-white leading-[120%] text-[34px] max-w-6/10">
                Meet the <br />
                new Mishmash
                processing
              </h2>

              <Button size={"lg"}>
                learn more
                <ArrowRight />
              </Button>
            </div>

            <div className="w-full bg-background-subtle p-8 col-span-1 md:col-span-6 rounded-[12px] relative overflow-hidden space-y-8">

              <img src="/assets/images/card-icon.svg" alt="" className="w-12 h-12" />

              <h2 className="text-2xl leading-[100%]">
                Beautiful Bitcoin DeFi
              </h2>

              <p className="font-mono text-sm leading-[140%] max-w-none md:max-w-7/10">
                More flexibility, more composability, more
                security; major upgrades ahead for Bitcoin DeFi on
                the leading Bitcoin L2.
              </p>

              <img src={"/assets/images/line-shape1.svg"} className="absolute bottom-0 left-0 right-0 w-full" />
            </div>

            <div className="w-full bg-background-subtle p-8 col-span-1 md:col-span-6 rounded-[12px] relative overflow-hidden space-y-8">

              <img src="/assets/images/card-icon.svg" alt="" className="w-12 h-12" />

              <h2 className="text-2xl leading-[100%]">
                Beautiful Bitcoin DeFi
              </h2>

              <p className="font-mono text-sm leading-[140%] max-w-none md:max-w-7/10">
                More flexibility, more composability, more
                security; major upgrades ahead for Bitcoin DeFi on
                the leading Bitcoin L2.
              </p>

              <img src={"/assets/images/grid-shape.svg"} className="absolute bottom-0 left-0 right-0 w-full" />
            </div>

            <div className="w-full bg-background-subtle p-8 col-span-1 md:col-span-4 rounded-[12px] relative overflow-hidden space-y-8">
              <img src="/assets/images/card-icon.svg" alt="" className="w-12 h-12" />

              <h2 className="text-2xl leading-[100%]">
                Beautiful Bitcoin DeFi
              </h2>

              <p className="font-mono text-sm leading-[140%]">
                More flexibility, more composability, more
                security; major upgrades ahead for Bitcoin DeFi on
                the leading Bitcoin L2.
              </p>

              <img src={"/assets/images/circle-shape.svg"} className="absolute bottom-0 left-0 right-0 w-full" />
            </div>

          </div>
        </div>
      </section>

      <section className="py-14 bg-background-muted relative overflow-hidden">
        <img src={"/assets/images/why-choose-us-shape.svg"} className="absolute top-0 left-1/2 -translate-x-1/2 z-0" />

        <div className="container z-10">
          <div className="grid grid-cols-2 w-full">

            <div className="w-full">
              <h2 className="text-4xl leading-[120%]">
                Why Choose <br />
                Mishmash?
              </h2>
            </div>

            <div className="w-full relative pl-12 flex flex-col">
              <img src="/assets/images/why-choose-us-list.svg" alt="" className="absolute top-0 -left-[15.5px]" />

              <div className="flex items-start gap-8 h-[200px]">
                <div className="h-12 aspect-square bg-black rounded-[10px]"></div>

                <div className="flex flex-col gap-5">
                  <h4 className="text-2xl text-foreground-subtle">
                    Secure
                  </h4>

                  <p className="text-foreground-muted text-sm leading-[140%]">
                    Bitcoin is the most battle-tested and decentralized blockchain.
                    With Bitcoin as a base layer, users and developers alike benefit
                    from the properties that make Bitcoin so powerful and secure.
                  </p>

                  <Button className="bg-white hover:bg-white/60 rounded-full text-foreground-subtle w-max">
                    learn more
                    <ArrowRight />
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-8 h-[200px]">
                <div className="h-12 aspect-square bg-black rounded-[10px]"></div>

                <div className="flex flex-col gap-5">
                  <h4 className="text-2xl text-foreground-subtle">
                    Adopted
                  </h4>

                  <p className="text-foreground-muted text-sm leading-[140%]">
                    Bitcoin is the most familiar, adopted crypto asset, giving builders
                    access to an enormous user base and untapped capital.
                  </p>

                  <Button className="bg-white hover:bg-white/60 rounded-full text-foreground-subtle w-max">
                    learn more
                    <ArrowRight />
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-8">
                <div className="h-12 aspect-square bg-black rounded-[10px]"></div>

                <div className="flex flex-col gap-5">
                  <h4 className="text-2xl text-foreground-subtle">
                    Untapped
                  </h4>

                  <p className="text-foreground-muted text-sm leading-[140%]">
                    Over $1 trillion in latent capital is waiting for builders, founders,
                    and creators to activate it.
                  </p>

                  <Button className="bg-white hover:bg-white/60 rounded-full text-foreground-subtle w-max">
                    learn more
                    <ArrowRight />
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      <section className="min-h-[1116px] bg-background-strong relative pt-56">
        <img src={"/assets/images/ms-top-shape.svg"} className="absolute top-0 left-0 z-10" />

        <img src={"/assets/images/ms-bottom-shape.svg"} className="absolute bottom-0 right-0 z-10" />

        <img src={"/assets/images/ms-bg.png"} className="absolute w-[930px] bottom-10 right-[15%] z-0" />

        <div className="container">
          <div className="space-y-12 z-20 w-full relative">

            <p className="text-4xl leading-[120%] text-white max-w-7/10">
              The Association Set Provider (ASP) is a powerful compliance tool designed to enhance the security and legitimacy of private blockchain transactions.
            </p>

            <div className="flex flex-col gap-6 text-[#818688]">
              <div className="flex items-center gap-2">
                <div className="bg-[#818688] h-1.5 w-1.5 rounded-full"></div>
                <p>
                  Bitcoin is the most familiar, adopted crypto asset
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-[#818688] h-1.5 w-1.5 rounded-full"></div>
                <p>
                  Build experiences for a massive, largely untapped audience
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-[#818688] h-1.5 w-1.5 rounded-full"></div>
                <p>
                  A security-first programming language with visibility
                </p>
              </div>
            </div>

            <Button size={"lg"} className="rounded-full">
              get started
            </Button>

          </div>
        </div>
      </section>

      <section className="bg-background-subtle relative overflow-hidden">

        <img src="/assets/images/protocols-shape-1.svg" alt="" className="absolute bottom-0 right-0 z-10" />

        <div className="container">
          <div className="py-14 w-full relative min-h-[624px] flex justify-end">

            <img src={"/assets/images/protocols-bg.png"} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0" />

            <div className="flex flex-col gap-6 relative z-20 mr-10">
              <div className="py-[9px] px-[11px] border border-foreground/12 rounded-full w-max font-mono text-xs tracking-[0.3px]">
                SERVICE SAFETY
              </div>

              <h2 className="text-4xl leading-[120%] -tracking-[1.68px] max-w-[254px]">
                Privacy Protocols & Pools
              </h2>

              <p className="font-mono text-sm leading-[140%] max-w-[440px]">
                Privacy Pools allows users to transact privately whilst still complying with relevant regulations. Other privacy protocols can integrate the ASP to allow for increased compliance in their protocols.
              </p>

              <div className='flex items-start gap-4 flex-col w-full sm:flex-row sm:items-center mt-4'>
                <Button variant={"default"} asChild className='text-xs rounded-full' >
                  <Link href={"/"}>
                    Start Mix
                    <ArrowRight />
                  </Link>
                </Button>

                <Button variant={"default"} asChild className='text-xs bg-muted text-muted-foreground hover:bg-muted/90' >
                  <Link href={"/"}>
                    docs
                    <ArrowRight />
                  </Link>
                </Button>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="pt-30 pb-20">

        <div className="container">
          <div className="flex items-start">
            <div className="w-[240px] h-[120px] bg-background-subtle rounded-bl-[12px] rounded-tl-[12px] relative flex items-center justify-center gap-3">

              <img src="/assets/images/faq-shape-2.svg" alt="" />

              <span className="text-4xl -tracking-[1px]">FAQ</span>

              <img src={"/assets/images/faq-shape.svg"} className="absolute w-[19px] h-[19px] right-0 -bottom-[19px]" />
            </div>

            <div className="bg-background-subtle p-12 w-full flex-1 rounded-r-[12px] rounded-bl-[12px]">
              <Accordion type="single" collapsible defaultValue="item-1">

                {[1, 2, 3, 4, 5, 6].map(i => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-black/10">
                    <AccordionTrigger className="text-base">
                      Bitcoin is the most battle-tested and decentralized blockchain.
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground-muted leading-[140%] max-w-8/10">
                      Bitcoin is the most battle-tested and decentralized blockchain. With Bitcoin as a base layer, users and developers alike benefit from the properties that make Bitcoin so powerful and secure. With Bitcoin as a base layer, users and developers alike benefit from the properties that make Bitcoin so powerful and secure.
                    </AccordionContent>
                  </AccordionItem>
                ))}

              </Accordion>
            </div>
          </div>
        </div>

      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl -tracking-[1px] mb-12">
            Join the community
          </h2>

          <div className="grid grid-cols-3">

            <div className="p-6 flex flex-col gap-6 bg-background-strong rounded-l-[12px] border-r border-white/10">
              <img src="/assets/images/telegram.svg" alt="" className="w-8 h-8 mb-10" />

              <p className="text-sm text-[#818688]">
                News and updates.
              </p>

              <Button className="bg-[#27282B] hover:bg-[#27282B] w-max">
                telegram

                <Globe className="text-white/50 ml-18"/>
              </Button>
            </div>

            <div className="p-6 flex flex-col gap-6 bg-background-strong border-r border-white/10">
              <img src="/assets/images/x.svg" alt="" className="w-8 h-8 mb-10" />

              <p className="text-sm text-[#818688]">
                Follow the conversation.
              </p>

              <Button className="bg-[#27282B] hover:bg-[#27282B] w-max">
                x.com

                <Globe className="text-white/50 ml-18"/>
              </Button>
            </div>

            <div className="p-6 flex flex-col gap-6 bg-background-strong rounded-r-[12px]">
              <img src="/assets/images/discord.svg" alt="" className="w-8 h-8 mb-10" />

              <p className="text-sm text-[#818688]">
                Chat in real time.
              </p>

              <Button className="bg-[#27282B] hover:bg-[#27282B] w-max">
                discord

                <Globe className="text-white/50 ml-18"/>
              </Button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
