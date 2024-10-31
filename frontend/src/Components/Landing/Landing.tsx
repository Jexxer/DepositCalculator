import React, { useState } from 'react';

const Landing: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div lang="en" data-theme="light" className="relative min-h-screen bg-base-300">
      <main id="to_export" className="font-inter">
        <header className="bg-base-100">
          <nav className="container flex items-center justify-between px-5 py-4 mx-auto" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5 flex gap-2 md:gap-4 items-center">
                <span className="sr-only">DepositCalc</span>
                <img
                  className="object-cover object-center w-12 h-12 rounded-full"
                  alt="Logo"
                  width="64"
                  height="64"
                  src="https://dummyimage.com/256x256&text=logo"
                />
                <h2 className="font-medium text-lg md:text-xl">DepositCalc</h2>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button type="button" onClick={toggleMenu} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-base-content/90">
                <span className="sr-only">Open main menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div className="hidden lg:flex lg:justify-center">
              <div className="flex gap-12 items-center justify-center">
                <a className="link link-hover" href="#pricing">Pricing</a>
                <a className="link link-hover" href="#faqs">FAQs</a>
              </div>
            </div>
            <div className="hidden lg:flex lg:justify-end lg:flex-1">
              <div className="flex flex-col justify-center items-center gap-4">
                <a className="btn btn-primary" href="https://www.depositcalc.com/register">Get Started</a>
              </div>
            </div>
          </nav>
        </header>

        <section className="bg-base-100">
          <div className="container mx-auto flex px-5 py-24 items-center lg:items-start justify-center flex-col lg:flex-row lg:gap-24">
            <div className="text-center lg:text-left mb-10 lg:mb-0 w-full lg:w-1/2 flex flex-col items-center lg:items-start">
              <h1 className="sm:text-4xl text-3xl mb-6 font-medium text-base-content">Simplify Your Direct Deposits</h1>
              <p className="mb-8 leading-relaxed text-base-content/80">
                DepositCalc helps you manage multiple bank accounts, incomes, and expenses effectively. By calculating exactly where your paycheck needs to go,
                our tool ensures that your direct deposits are set up correctly and distributed according to your unique needs, whether you're sharing expenses with family
                members or roommates. Take control of your finances and avoid the hassle of manual calculations. DepositCalc offers an intuitive platform to organize,
                track, and automate your direct deposit allocations effortlessly.
              </p>
              <div className="flex flex-col justify-center items-center lg:items-start gap-4">
                <a className="btn btn-primary" href="https://www.depositcalc.com/register">Get Started</a>
              </div>
              <div className="pt-10">
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <div className="-space-x-4 avatar-group">
                    <div className="avatar border-2 z-20">
                      <img className="object-cover object-center !w-12 !h-12" alt="User" width="48" height="48" src="https://make-landing.s3.amazonaws.com/static/testimonial/1.png" />
                    </div>
                    <div className="avatar border-2 z-20">
                      <img className="object-cover object-center !w-12 !h-12" alt="User" width="48" height="48" src="https://make-landing.s3.amazonaws.com/static/testimonial/11.png" />
                    </div>
                    <div className="avatar border-2 z-20">
                      <img className="object-cover object-center !w-12 !h-12" alt="User" width="48" height="48" src="https://make-landing.s3.amazonaws.com/static/testimonial/7.png" />
                    </div>
                    <div className="avatar border-2 z-20">
                      <img className="object-cover object-center !w-12 !h-12" alt="User" width="48" height="48" src="https://make-landing.s3.amazonaws.com/static/testimonial/8.png" />
                    </div>
                  </div>
                  <span className="badge badge-ghost">1k happy users</span>
                </div>
              </div>
              <img
                className="object-cover object-center rounded-lg lg:max-w-lg lg:w-full md:w-1/2 w-5/6"
                alt="Hero Image"
                width="512"
                height="512"
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTI0NzB8MHwxfHNlYXJjaHw1fHxjb3VudHxlbnwwfHx8fDE3MzAyOTI2OTZ8MA&ixlib=rb-4.0.3&q=80&w=1080&utm_source=makelanding.ai&utm_medium=referral"
              />
            </div>
          </div>
        </section>

        <section className="text-base-content/80">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
              <img
                className="object-cover object-center rounded-lg h-full w-full"
                alt="Feature Image"
                width="512"
                height="576"
                src="https://images.unsplash.com/photo-1725258080098-727051947997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTI0NzB8MHwxfHNlYXJjaHwyMHx8ZXhwZW5zZXN8ZW58MHx8fHwxNzMwMjkxOTAwfDA&ixlib=rb-4.0.3&q=80&w=1080&utm_source=makelanding.ai&utm_medium=referral"
              />
            </div>
            <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="mb-5">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-base-content text-lg font-medium mb-3">Manage Multiple Accounts</h2>
                  <p className="leading-relaxed text-base">
                    Easily add and manage several bank accounts within DepositCalc. Seamlessly track and organize your expenses, ensuring accurate and efficient management of your direct deposit allocations for all your financial needs.
                  </p>
                  <div className="mt-3">
                    <div className="inline-flex items-center gap-2 md:gap-4">
                      <a className="link link-hover link-primary">Get Started</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="mb-5">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v.756a49.106 49.106 0 019.152 1 .75.75 0 01-.152 1.485h-1.918l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 0118.75 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 01-.262 1.453h-8.37a.75.75 0 01-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 015.25 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84L4.168 6.241H2.25a.75.75 0 01-.152-1.485 49.105 49.105 0 019.152-1V3a.75.75 0 01.75-.75zm4.878 13.543l1.872-7.662 1.872 7.662h-3.744zm-9.756 0L5.25 8.131l-1.872 7.662h3.744z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-base-content text-lg font-medium mb-3">Distribute Incomes Efficiently</h2>
                  <p className="leading-relaxed text-base">
                    Split your various incomes across selected accounts using DepositCalc. Customize distribution by percentage or amount, ensuring that each account gets funded according to preset criteria for maximum flexibility and convenience.
                  </p>
                  <div className="mt-3">
                    <div className="inline-flex items-center gap-2 md:gap-4">
                      <a className="link link-hover link-primary">Get Started</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-10 lg:items-start items-center">
                <div className="mb-5">
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary/20 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v.756a49.106 49.106 0 019.152 1 .75.75 0 01-.152 1.485h-1.918l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 0118.75 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84l2.474-10.124H12.75v13.28c1.293.076 2.534.343 3.697.776a.75.75 0 01-.262 1.453h-8.37a.75.75 0 01-.262-1.453c1.162-.433 2.404-.7 3.697-.775V6.24H6.332l2.474 10.124a.75.75 0 01-.375.84A6.723 6.723 0 015.25 18a6.723 6.723 0 01-3.181-.795.75.75 0 01-.375-.84L4.168 6.241H2.25a.75.75 0 01-.152-1.485 49.105 49.105 0 019.152-1V3a.75.75 0 01.75-.75zm4.878 13.543l1.872-7.662 1.872 7.662h-3.744zm-9.756 0L5.25 8.131l-1.872 7.662h3.744z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-base-content text-lg font-medium mb-3">Simplify Shared Expenses</h2>
                  <p className="leading-relaxed text-base">
                    Ideal for families and roommates, DepositCalc allows users to manage shared expenses effortlessly. Automate the allocation process and avoid disputes by ensuring each person contributes their share directly to the relevant accounts.
                  </p>
                  <div className="mt-3">
                    <div className="inline-flex items-center gap-2 md:gap-4">
                      <a className="link link-hover link-primary">Get Started</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="container py-24 px-5 mx-auto">
          <h3 className="font-medium text-primary text-center">Pricing</h3>
          <div className="flex flex-col text-center w-full mb-20">
            <div className="mb-8 mt-4">
              <h2 className="sm:text-4xl text-3xl font-medium text-base-content">Choose the perfect plan for your needs</h2>
            </div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-base-content/80">
              Find the right balance for managing and allocating deposits efficiently with our flexible and affordable pricing plans
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 mx-auto">
            <div className="mx-auto md:mx-0 max-w-2xl rounded-xl ring-1 ring-base-content/10 lg:flex w-full lg:max-w-sm">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-lg font-medium text-base-content">Free</h3>
                <p className="mt-4 text-sm leading-7 text-base-content/80">Free tier offers everything a single person would need to manage their direct deposits.</p>
                <div className="mt-6 flex items-baseline gap-x-1.5">
                  <div className="text-4xl font-semibold tracking-tight text-base-content">0</div>
                  <div className="text-sm font-medium leading-6 tracking-wide text-base-content/80">/month</div>
                </div>
                <div className="mt-6">
                  <div>
                    <a className="btn btn-primary btn-outline btn-block">Get Started</a>
                  </div>
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-base-content/80">
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>Private Access</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>Join community</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>24/7 support</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>1 Income</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>1 Portfolio</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>1 User</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mx-auto md:mx-0 max-w-2xl rounded-xl ring-1 ring-primary lg:flex w-full lg:max-w-sm">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-primary">Pro</h3>
                  <span className="badge badge-primary">Most popular</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-base-content/80">Everything you need to automate your direct deposits in a multi-income household.</p>
                <div className="mt-6 flex items-baseline gap-x-1.5">
                  <div className="text-4xl font-semibold tracking-tight text-base-content">$2.99</div>
                  <div className="text-sm font-medium leading-6 tracking-wide text-base-content/80">/month</div>
                </div>
                <div className="mt-6">
                  <div>
                    <a className="btn btn-primary btn-block">Get Started</a>
                  </div>
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-base-content/80">
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>Private Access</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>Join community</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>24/7 support</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>Unlimited Incomes</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>Unlimited Portfolios</span>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <svg className="h-6 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"></path>
                    </svg>
                    <span>Unlimited Users</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="faqs" className="bg-base-100">
          <div className="py-24 bg-base-100 container mx-auto max-w-2xl px-5">
            <div className="space-y-4 mb-16">
              <h3 className="font-medium text-primary text-sm md:text-base">FAQ</h3>
              <h2 className="sm:text-3xl text-2xl font-medium text-base-content">Get answers to common questions about DepositCalc software and its features.</h2>
            </div>
            <ul className="w-full">
              <li>
                <button className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
                  <span className="flex-1 text-base-content">
                    <div>How can DepositCalc streamline my deposit management process?</div>
                  </span>
                  <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current text-base-content" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out" />
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center rotate-90 transition duration-200 ease-out" />
                  </svg>
                </button>
                <div className="transition-all duration-300 ease-in-out text-base-content/80 overflow-hidden" style={{ maxHeight: 0, opacity: 0 }}>
                  <div className="pb-5">
                    <div>
                      With today’s automatic payments and subscription models, it’s easy to lose track of expenses. DepositCalc offers a straightforward solution: simply input your income, set up bank account placeholders, and manually add each recurring expense with its amount and the account it’s billed from. Based on this information, DepositCalc calculates how to arrange your direct deposits, ensuring you’ll have the necessary funds in place each month—no more guessing if you’ll cover all expenses. By setting up DepositCalc, you can manage your finances with ease, setting it once and gaining peace of mind.
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
                  <span className="flex-1 text-base-content">
                    <div>Is my financial information secure with DepositCalc?</div>
                  </span>
                  <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current text-base-content" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out" />
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center rotate-90 transition duration-200 ease-out" />
                  </svg>
                </button>
                <div className="transition-all duration-300 ease-in-out text-base-content/80 overflow-hidden" style={{ maxHeight: 0, opacity: 0 }}>
                  <div className="pb-5">
                    <div>
                      DepositCalc is designed with privacy in mind. We don’t link to or store any personal bank information; instead, you create placeholder bank accounts to represent where expenses are managed. Your data remains on your device and secure.
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
                  <span className="flex-1 text-base-content">
                    <div>Can I manage multiple income sources with DepositCalc?</div>
                  </span>
                  <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current text-base-content" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out" />
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center rotate-90 transition duration-200 ease-out" />
                  </svg>
                </button>
                <div className="transition-all duration-300 ease-in-out text-base-content/80 overflow-hidden" style={{ maxHeight: 0, opacity: 0 }}>
                  <div className="pb-5">
                    <div>
                      Absolutely. DepositCalc lets you add and track multiple income sources to ensure all your earnings are considered when setting up direct deposits. You can even designate which income is associated with your insurance provider, giving you complete control over how specific expenses are funded. This flexibility helps you tailor your finances to meet your unique needs effectively.
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left border-t md:text-lg border-base-content/10" aria-expanded="false">
                  <span className="flex-1 text-base-content">
                    <div>How do I get a refund?</div>
                  </span>
                  <svg className="flex-shrink-0 w-4 h-4 ml-auto fill-current text-base-content" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center transition duration-200 ease-out" />
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center rotate-90 transition duration-200 ease-out" />
                  </svg>
                </button>
                <div className="transition-all duration-300 ease-in-out text-base-content/80 overflow-hidden" style={{ maxHeight: 0, opacity: 0 }}>
                  <div className="pb-5">
                    <div>
                      Refund requests must be made within 30 days of the purchase date. Please visit our support page for more information on how to request a refund.
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <footer className="bg-base-100">
          <div className="container mx-auto flex flex-col px-5 py-10 md:flex-row md:justify-between">
            <div className="flex flex-col items-start md:w-1/3">
              <h3 className="text-xl font-medium">DepositCalc</h3>
              <p className="text-base-content/80">
                Helping you take charge of your financial life. Track and manage your expenses, automate your deposits, and simplify your life.
              </p>
            </div>
            <div className="flex flex-col items-start mt-5 md:w-1/3 md:mt-0">
              <h4 className="text-lg font-medium">Links</h4>
              <a href="#pricing" className="link link-hover">Pricing</a>
              <a href="#faqs" className="link link-hover">FAQs</a>
              <a href="https://www.depositcalc.com/register" className="link link-hover">Get Started</a>
            </div>
            <div className="flex flex-col items-start mt-5 md:w-1/3 md:mt-0">
              <h4 className="text-lg font-medium">Contact</h4>
              <a href="mailto:support@depositcalc.com" className="link link-hover">support@depositcalc.com</a>
              <p className="text-base-content/80">© {new Date().getFullYear()} DepositCalc. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
