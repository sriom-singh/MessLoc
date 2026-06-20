import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionLabel } from "@/components/ui/sectionLabel";
import SectionHeader from "@/components/ui/sectionHeader";
// ── Data ────────────────────────────────────────────────────────────────────

const STATS = [
    { value: "2,400+", label: "Mess listings" },
    { value: "18,000+", label: "Happy subscribers" },
    { value: "12+", label: "Cities covered" },
    { value: "4.7★", label: "Avg. platform rating" },
];

const VALUES = [
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
        ),
        title: "Hyperlocal first",
        desc: "We focus on the neighbourhood mess — the kind that never makes it online but feeds thousands every day.",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        title: "Transparency",
        desc: "Real menus, real prices, real reviews. No hidden costs, no fake ratings. What you see is what you eat.",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
        ),
        title: "Reliability",
        desc: "Consistent meal schedules, verified timings and subscription plans — so you never miss a meal again.",
    },
    {
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        title: "Community",
        desc: "Built for students and professionals who are new to a city and need a reliable meal partner from day one.",
    },
];



// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-6 px-4 bg-accent dark:bg-[#111111] border border-orange-500/10 rounded-2xl">
            <span className="text-[28px] font-bold   leading-none">{value}</span>
            <span className="text-[11px] text-stone-500 mt-2 tracking-wide uppercase text-center">{label}</span>
        </div>
    );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="dark:bg-[#1c1a17] border border-orange-500/15 rounded-2xl p-6 flex flex-col gap-4 hover:border-orange-500/40 transition-colors duration-200">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center ">
                {icon}
            </div>
            <div>
                <h3 className="text-[15px] font-semibold dark:text-stone-50">{title}</h3>
                <p className="text-[13px] text-stone-400 leading-relaxed mt-1.5">{desc}</p>
            </div>
        </div>
    );
}


// ── Main component ───────────────────────────────────────────────────────────

export default function MessLocAbout() {
    return (
        <main className=" md:px-24 px-6 min-h-screen">

            {/* ── Hero banner ── */}
            <section className="relative overflow-hidden py-16 flex flex-col items-center text-center">
                {/* Glow */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="w-[500px] h-[500px] rounded-full bg-orange-500/6 blur-3xl" />
                </div>
                {/* Grid texture */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: "linear-gradient(rgba(249,115,22,1) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

                <SectionHeader label="Our story" title="Built by a student,for every student." description=" MessLoc started when our founder couldn't find a decent, affordable mess near his
                        university in Dehradun. What began as a simple spreadsheet of local messes is now
                        a platform helping thousands discover reliable meal services across India." />
            </section>

            <Separator className="bg-orange-500/10" />

            {/* ── Stats ── */}
            <section className="px-6  py-16 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS.map((s) => <StatCard key={s.label} {...s} />)}
                </div>
            </section>

            <Separator className="bg-orange-500/10" />

            {/* ── Mission ── */}
            <section className="px-6  py-16   gap-12 items-center">
                <div className="flex flex-col items-center text-center">
                    <SectionHeader label="Our mission" title=" No one should go hungry" description=" Moving to a new city for studies or work is already hard enough. Finding a
                        trustworthy, affordable mess that fits your diet, budget, and schedule shouldn't
                        be an added struggle. MessLoc bridges the gap between local mess operators — who rely entirely on
                        word-of-mouth — and students and professionals who need them the most."/>

                    <div className="flex gap-3">
                        <Button className=" text-white h-10 px-6 ">
                            Explore messes
                        </Button>
                        <Button variant="outline" className="border-orange-500/30  hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500 h-10 px-6 text-[14px] rounded-xl bg-transparent">
                            List your mess →
                        </Button>
                    </div>
                </div>

                {/* Visual block */}
                <div className="  rounded-2xl py-8 flex  md:flex-row flex-col  gap-5">
                    <div className="flex-1 flex border-2 rounded-2xl p-4  flex-col gap-3">

                        <div className=" flex flex-row items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center ">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[13px] font-medium dark:text-stone-50">For subscribers</p>
                                <p className="text-[12px] text-stone-500">Find, compare & subscribe</p>
                            </div>
                        </div>
                        <Separator className="bg-orange-500/10" />
                        {["Search by location, budget & diet", "Compare menus, timings & ratings", "Subscribe digitally — no more haggling", "Get notified about deals & changes"].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full dark:bg-orange-500/15 flex items-center justify-center shrink-0">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <p className="text-[13px] text-stone-500 dark:text-stone-300">{item}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 border-2 rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex-1 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center ">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[13px] font-medium dark:text-stone-50">For mess owners</p>
                                <p className="text-[12px] text-stone-500">Grow your customer base</p>
                            </div>
                        </div>
                                            <Separator className="bg-orange-500/10" />

                        {["Get discovered by thousands nearby", "Manage menus & pricing digitally", "Track subscribers & revenue", "Zero commission on subscriptions"].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-orange-500/15 flex items-center justify-center shrink-0">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <p className="text-[13px] text-stone-500 dark:text-stone-300">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Separator className="bg-orange-500/10" />

            {/* ── Values ── */}
            <section className="px-6  py-16">
                <div className="flex flex-col items-center text-center">
                    <SectionHeader label="Our values" title="What we stand for" description="We built MessLoc to solve the real problems of finding food in an unfamiliar city. Here's what makes us different." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {VALUES.map((v) => <ValueCard key={v.title} {...v} />)}
                </div>
            </section>

            <Separator className="bg-orange-500/10 " />

           

            {/* ── CTA ── */}
            <section className="px-6  py-16 flex flex-col items-center text-center">
                <SectionHeader label="Join MessLoc" title="Ready to find your perfect mess?" description="   Join 18,000+ subscribers already eating better, spending smarter, and worrying less
                    about their next meal."/>
                <div className="flex gap-3  flex-wrap justify-center">
                    <Button >
                        Explore messes →
                    </Button>
                    <Button variant="outline">
                        List your mess →
                    </Button>
                </div>
            </section>

        </main>
    );
}
